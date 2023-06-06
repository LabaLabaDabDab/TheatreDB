import {httpClient} from '../http-common.js';

const getAll = () => {
    return httpClient.get(`/ticket-numbers`);
};

const create = (data) => {
    return httpClient.post("/ticket-numbers", data);
}

const get = (id) => {
    return httpClient.get(`/ticket-numbers/${id}`);
}

const update = (data) => {
    return httpClient.put('/ticket-numbers', data);
}

const remove = (id) => {
    return httpClient.delete(`/ticket-numbers/${id}`);
}

export default {getAll, create, get, update, remove};