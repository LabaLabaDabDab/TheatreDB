import {httpClient} from '../http-common.js';

const getAll = () => {
    return httpClient.get(`/date-performances`);
};

const create = (data) => {
    return httpClient.post("/date-performances", data);
}

const get = (id) => {
    return httpClient.get(`/date-performances/${id}`);
}

const update = (data) => {
    return httpClient.put('/date-performances', data);
}

const remove = (id) => {
    return httpClient.delete(`/date-performances/${id}`);
}

export default {getAll, create, get, update, remove};