import {httpClient} from '../http-common.js';

const getAll = (curPage, recordPerPage) => {
    return httpClient.get(`/actors`);
};


const create = (data) => {
    return httpClient.post("/actors", data);
}

const get = (id) => {
    return httpClient.get(`/actors/${id}`);
}

const update = (data) => {
    return httpClient.put('/actors', data);
}

const remove = (id) => {
    return httpClient.delete(`/actors/${id}`);
}

export default {getAll, create, get, update, remove};