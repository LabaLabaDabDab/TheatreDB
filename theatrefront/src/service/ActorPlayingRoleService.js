import {httpClient} from '../http-common.js';

const getAll = () => {
    return httpClient.get(`/actor-playing-roles`);
};

const create = (data) => {
    return httpClient.post("/actor-playing-roles", data);
}

const get = (id) => {
    return httpClient.get(`/actor-playing-roles/${id}`);
}

const update = (data) => {
    return httpClient.put('/actor-playing-roles', data);
}

const remove = (id) => {
    return httpClient.delete(`/actor-playing-roles/${id}`);
}

export default {getAll, create, get, update, remove};