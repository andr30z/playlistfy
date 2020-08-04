import axios from 'axios';

const auth = axios.create({
    baseURL: "http://localhost:3333/",
});

export default auth;