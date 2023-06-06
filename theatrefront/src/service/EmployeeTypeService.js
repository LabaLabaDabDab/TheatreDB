import {httpClient} from '../http-common.js';

const getAll = () => {
    return httpClient.get(`/employeeTypes`);
};


const create = (data) => {
    return httpClient.post("/employeeTypes", data);
}

const get = (id) => {
    return httpClient.get(`/employeeTypes/${id}`);
}

const update = (data) => {
    return httpClient.put('/employeeTypes', data);
}

const remove = (id) => {
    return httpClient.delete(`/employeeTypes/${id}`);
}

export default {getAll, create, get, update, remove};