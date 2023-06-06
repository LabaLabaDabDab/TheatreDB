import {httpClient} from '../http-common.js';

const getAll = () => {
    return httpClient.get(`/tickets`);
};

const create = (data) => {
    return httpClient.post("/tickets", data);
}

const get = (id) => {
    return httpClient.get(`/tickets/${id}`);
}

const update = (data) => {
    return httpClient.put('/tickets', data);
}

const remove = (id) => {
    return httpClient.delete(`/tickets/${id}`);
}

export default {getAll, create, get, update, remove};