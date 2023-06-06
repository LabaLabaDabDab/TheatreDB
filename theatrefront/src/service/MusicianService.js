import {httpClient} from '../http-common.js';

const getAll = () => {
    return httpClient.get(`/musicians`);
};


const create = (data) => {
    return httpClient.post("/musicians", data);
}

const get = (id) => {
    return httpClient.get(`/musicians/${id}`);
}

const update = (data) => {
    return httpClient.put('/musicians', data);
}

const remove = (id) => {
    return httpClient.delete(`/musicians/${id}`);
}

export default {getAll, create, get, update, remove};