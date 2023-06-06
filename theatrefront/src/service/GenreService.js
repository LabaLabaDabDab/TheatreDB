import {httpClient} from '../http-common.js';

const getAll = () => {
    return httpClient.get(`/genres`);
};


const create = (data) => {
    return httpClient.post("/genres", data);
}

const get = (id) => {
    return httpClient.get(`/genres/${id}`);
}

const update = (data) => {
    return httpClient.put('/genres', data);
}

const remove = (id) => {
    return httpClient.delete(`/genres/${id}`);
}

export default {getAll, create, get, update, remove};