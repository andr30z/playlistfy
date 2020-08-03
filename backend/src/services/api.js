const axios = require('axios');


const auth = axios.default.create({
    baseURL: "https://accounts.spotify.com/api",
});

module.exports = auth;