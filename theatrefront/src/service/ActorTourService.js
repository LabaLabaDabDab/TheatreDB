import {httpClient} from '../http-common.js';

const getAll = () => {
    return httpClient.get(`/actor-tours`);
};


const create = (data) => {
    return httpClient.post("/actor-tours", data);
}

const get = (id) => {
    return httpClient.get(`/actor-tours/${id}`);
}

const update = (data) => {
    return httpClient.put('/actor-tours', data);
}

const remove = (id) => {
    return httpClient.delete(`/actor-tours/${id}`);
}

export default {getAll, create, get, update, remove};