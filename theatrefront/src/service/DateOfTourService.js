import {httpClient} from '../http-common.js';

const getAll = () => {
    return httpClient.get(`/date-of-tours`);
};


const create = (data) => {
    return httpClient.post("/date-of-tours", data);
}

const get = (id) => {
    return httpClient.get(`/date-of-tours/${id}`);
}

const update = (data) => {
    return httpClient.put('/date-of-tours', data);
}

const remove = (id) => {
    return httpClient.delete(`/date-of-tours/${id}`);
}

export default {getAll, create, get, update, remove};