import {httpClient} from '../http-common.js';

const getAll = () => {
    return httpClient.get(`/achievements`);
};

const create = (data) => {
    return httpClient.post("/achievements", data);
}

const get = (id) => {
    return httpClient.get(`/achievements/${id}`);
}

const update = (data) => {
    return httpClient.put('/achievements', data);
}

const remove = (id) => {
    return httpClient.delete(`/achievements/${id}`);
}

export default {getAll, create, get, update, remove};