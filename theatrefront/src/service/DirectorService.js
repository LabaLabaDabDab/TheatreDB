import {httpClient} from '../http-common.js';

const getAll = () => {
    return httpClient.get(`/directors`);
};


const create = (data) => {
    return httpClient.post("/directors", data);
}

const get = (id) => {
    return httpClient.get(`/directors/${id}`);
}

const update = (data) => {
    return httpClient.put('/directors', data);
}

const remove = (id) => {
    return httpClient.delete(`/directors/${id}`);
}

export default {getAll, create, get, update, remove};