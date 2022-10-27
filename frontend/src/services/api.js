import axios from "axios";
const url =
  process.env.NODE_ENV === "production"
    ? "playlistfy-api.up.railway.app↗/"
    : "http://localhost:3333/";
const auth = axios.create({
  baseURL: url,
});

export default auth;
