import {httpClient} from '../http-common.js';

const getAll = () => {
    return httpClient.get(`/performances`);
};

const create = (data) => {
    return httpClient.post("/performances", data);
}

const get = (id) => {
    return httpClient.get(`/performances/${id}`);
}

const update = (data) => {
    return httpClient.put('/performances', data);
}

const remove = (id) => {
    return httpClient.delete(`/performances/${id}`);
}

export default {getAll, create, get, update, remove};