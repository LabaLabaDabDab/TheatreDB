import axios from "axios";

export const httpClient = axios.create({
    baseURL: 'http://localhost:8081',
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin':'http://localhost:3000'
    }
});