import {httpClient} from '../http-common.js';

const getAll = () => {
    return httpClient.get(`/genders`);
};


const create = (data) => {
    return httpClient.post("/genders", data);
}

const get = (id) => {
    return httpClient.get(`/genders/${id}`);
}

const update = (data) => {
    return httpClient.put('/genders', data);
}

const remove = (id) => {
    return httpClient.delete(`/genders/${id}`);
}

export default {getAll, create, get, update, remove};