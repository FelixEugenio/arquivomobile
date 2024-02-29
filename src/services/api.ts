import axios from "axios";

const api = axios.create({
    baseURL:'https://arquivo-pt-api-challenge.onrender.com'
})

export {api};