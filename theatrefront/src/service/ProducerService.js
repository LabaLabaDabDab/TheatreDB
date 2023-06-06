import {httpClient} from '../http-common.js';

const getAll = () => {
    return httpClient.get(`/producers`);
};

const create = (data) => {
    return httpClient.post("/producers", data);
}

const get = (id) => {
    return httpClient.get(`/producers/${id}`);
}

const update = (data) => {
    return httpClient.put('/producers', data);
}

const remove = (id) => {
    return httpClient.delete(`/producers/${id}`);
}

export default {getAll, create, get, update, remove};