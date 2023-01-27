const express = require("express");
const auth = require("./services/api");
const { default: Axios } = require("axios");

const crypto = require("crypto-js");

const routes = express.Router();
const FRONTEND_URL =
  process.env.NODE_ENV === "production"
    ? "https://playlistfy-app.netlify.app"
    : "http://localhost:3001";

routes.get("/oauth", (_req, res) => {
  const CLIENT_ID = process.env.CLIENT_ID;
  res.redirect(
    `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=code&redirect_uri=${FRONTEND_URL}/log&scope=user-read-private%20user-read-email%20user-top-read%20playlist-modify-public`
  );
});

routes.get("/auth", (req, res) => {
  const { code } = req.query;
  const { refresh } = req.headers;

  const data = new URLSearchParams();
  if (refresh) {
    const refresh_token = decKey(null, refresh).toString(crypto.enc.Utf8);
    data.append("refresh_token", refresh_token);
  } else {
    data.append("redirect_uri", `${FRONTEND_URL}/log`);
    data.append("code", code);
  }

  data.append("grant_type", refresh ? "refresh_token" : "authorization_code");

  auth
    .post("/token", data, {
      headers: {
        Authorization:
          "Basic " +
          new Buffer.from(
            process.env.CLIENT_ID + ":" + process.env.CLIENT_SECRET
          ).toString("base64"),
        "Content-Type": "application/x-www-form-urlencoded",
      },
    })
    .then((resp) => {
      const encryptTo = crypto.AES.encrypt(
        resp.data.access_token,
        process.env.CRP
      ).toString();
      const encryptRe = crypto.AES.encrypt(
        refresh ? data.get("refresh_token") : resp.data.refresh_token,
        process.env.CRR
      ).toString();
      const returnData = {
        ...resp.data,
        access_token: encryptTo,
        refresh_token: encryptRe,
      };
      res.send(returnData);
    })
    .catch((error) => {
      if (error.response.status === 401) {
        // console.warn("error aslkdjaskldjilajsdkljaksldjaskdjklasjdklajsdkl ", error)
        return res.status(401).send(error);
      }
      res
        .status(400)
        .send({ error, errorMessage: "Não foi possivel obter o token" });
    });
});

routes.get("/user", (req, res) => {
  const { Authorization } = req.query;
  const dec = decKey(Authorization, null);

  Axios.get("https://api.spotify.com/v1/me", {
    headers: {
      Authorization: "Bearer " + dec.toString(crypto.enc.Utf8),
    },
  })
    .then((resp) => res.send(resp.data))
    .catch((error) => {
      if (error.response.status === 401) {
        return res.status(401).send(error);
      }
      res.status(400).send(error);
    });
});

routes.get("/user/data-personalization", (req, res) => {
  const { Authorization } = req.query;
  const dec = decKey(Authorization, null).toString(crypto.enc.Utf8);
  const headers = {
    Authorization: "Bearer " + dec,
  };

  // return res.status(401).send('erro')
  // https://api.spotify.com/v1/me/top/{type}
  Axios.all([
    Axios.get("https://api.spotify.com/v1/me/top/artists", {
      headers: headers,
    }),
    Axios.get("https://api.spotify.com/v1/me/top/tracks", {
      headers: headers,
    }),
  ])
    .then(
      Axios.spread((artists, tracks) => {
        if (artists && tracks) {
          res.send({ art: artists.data.items, tracks: tracks.data.items });
        }
      })
    )
    .catch((error) => {
      if (error.response.status === 401) {
        return res.status(401).send(error);
      }
      res.status(400).send(error);
    });
});

routes.get("/search", (req, res) => {
  const { to, q } = req.headers; //olhar aqui vem do headers trocar no api.js
  const decToAccess = decKey(to, null);
  Axios.get("https://api.spotify.com/v1/search", {
    headers: {
      Authorization: "Bearer " + decToAccess.toString(crypto.enc.Utf8),
    },
    params: {
      q: q,
      type: (type = "artist,track"),
    },
  })
    .then((resp) => {
      res.send({ ...resp.data });
    })
    .catch((error) => {
      if (error.response.status === 401) {
        return res.status(401).send(error);
      }
      res.status(400).send(error);
    });
});

routes.get("/generate-playlist", async (req, res) => {
  const { params } = req.query;
  const { genres, href, artistUrl } = JSON.parse(params[0]);
  const { id } = JSON.parse(params[1]);
  const { to } = JSON.parse(params[2]);

  const decTo = decKey(to, null).toString(crypto.enc.Utf8);

  if (!genres) {
    const genres_id = await getArtist(decTo, artistUrl, undefined)
      .then((resp) => ({ id: resp.data.id, genres: resp.data.genres }))
      .catch((error) => ({
        error,
        status: error.response.status,
        errorMessage: "ERROR",
      }));
    if (genres_id.errorMessage) {
      return genres_id.status === 401
        ? res.status(401).send(genres_id.error)
        : res
            .status(404)
            .send(
              "Não foi possível gerar uma playlist com base neste artista :("
            );
    }

    const seedGenres = filterGenres(genres_id.genres);

    const recommendedPlaylist = await recommendationPlaylist(
      genres_id.id,
      seedGenres,
      id,
      decTo
    );
    if (recommendedPlaylist.status === 401) {
      return res.status(401).send(recommendedPlaylist.error);
    }
    return recommendedPlaylist.tracks.length === 0
      ? res
          .status(404)
          .send("Não foi possível gerar uma playlist com base neste artista :(")
      : res.send(recommendedPlaylist);
  }

  if (genres.length === 0) {
    return res
      .status(404)
      .send("Não foi possível gerar uma playlist com base neste artista :(");
  }

  const seedGenres = filterGenres(genres);
  const artistTopTracks = await getArtist(decTo, artistUrl, {
    id,
    country: "US",
  })
    .then((resp) => resp.data)
    .catch((error) => ({
      error,
      status: error.response.status,
      errorMessage: "Algum erro ocorreu!",
      // res.status(400).send('Parece que algum valor foi informado fora dos padrões aceitaveis, verifique o nome da playlist e tente novamente')
    }));

  if (artistTopTracks.status === 401) {
    return res.status(401).send(artistTopTracks.error);
  }

  if (artistTopTracks.tracks.length === 0 || artistTopTracks.error) {
    return res
      .status(404)
      .send("Não foi possível gerar uma playlist com base neste artista :(");
  }
  // um pouquinho de randomizidade não faz mal a ninguem :D
  const randomIndex =
    Math.floor(Math.random() * artistTopTracks.tracks.length - 1) + 1;
  const trackId = artistTopTracks.tracks[randomIndex].id;

  const recommendedPlaylist = await recommendationPlaylist(
    id,
    seedGenres,
    trackId,
    decTo
  );
  if (recommendedPlaylist.error) {
    return recommendedPlaylist.status === 401
      ? res.status(401).send(recommendedPlaylist.error)
      : res.status(404).send(recommendedPlaylist.error);
  }
  res.send(recommendedPlaylist);
});

routes.post("/create-playlist", async (req, res) => {
  const { playlist, name, userId, source } = req.body;
  const { to } = req.headers;
  const decTo = decKey(to, null).toString(crypto.enc.Utf8);
  const description =
    "Playlist feita utilizando o app Playlistfy (www.playlistfy.herokuapp.com). Artista/musica utilizada como base: " +
    source;
  const data = {
    name: name,
    description: description,
  };
  const postRes = await postPlaylist(
    decTo,
    data,
    `https://api.spotify.com/v1/users/${userId}/playlists`
  )
    .then((resp) => ({
      status: resp.status,
      playlist_id: resp.data.id,
    }))
    .catch((error) => ({
      error,
      status: error.response.status,
    }));
  if (postRes.status === 201 || postRes.status === 200) {
    const url = `https://api.spotify.com/v1/playlists/${postRes.playlist_id}/tracks`;
    const postItems = await postPlaylist(decTo, playlist, url)
      .then((res) => ({ snap_id: res.data }))
      .catch((error) => ({
        error,
        status: error.response.status,
      }));
    return postItems.status === 401
      ? res.status(401).send(postItems)
      : res.send(postItems);
  }
});

function postPlaylist(decTo, data, url) {
  return Axios.post(url, data, {
    headers: {
      Authorization: "Bearer " + decTo,
      "Content-Type": "application/json",
    },
  });
}

function filterGenres(genreArray) {
  return genreArray
    .map((genre, index) => {
      if (index < 3) {
        return genre.replace(/ /g, "-");
      }
      return undefined;
    })
    .filter((element) => element)
    .join(",");
}

function getArtist(decTo, artistUrl, param) {
  return Axios.get(artistUrl, {
    headers: {
      Authorization: "Bearer " + decTo,
    },
    params: param,
  });
}

async function recommendationPlaylist(art, genres, tracks, to) {
  return await Axios.get("https://api.spotify.com/v1/recommendations", {
    headers: {
      Authorization: "Bearer " + to,
    },
    params: {
      seed_artists: art,
      seed_genres: genres,
      seed_tracks: tracks,
    },
  }).then((res) => res.data);
}

function decKey(key, ref) {
  return ref
    ? crypto.AES.decrypt(ref, process.env.CRR)
    : crypto.AES.decrypt(key, process.env.CRP);
}

module.exports = routes;
