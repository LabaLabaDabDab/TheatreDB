import {httpClient} from '../http-common.js';

const getAll = () => {
    return httpClient.get(`/roles`);
};

const create = (data) => {
    return httpClient.post("/roles", data);
}

const get = (id) => {
    return httpClient.get(`/roles/${id}`);
}

const update = (data) => {
    return httpClient.put('/roles', data);
}

const remove = (id) => {
    return httpClient.delete(`/roles/${id}`);
}

export default {getAll, create, get, update, remove};