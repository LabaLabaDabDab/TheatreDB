import {httpClient} from '../http-common.js';

const getAll = () => {
    return httpClient.get(`/employees`);
};


const create = (data) => {
    return httpClient.post("/employees", data);
}

const get = (id) => {
    return httpClient.get(`/employees/${id}`);
}

const update = (data) => {
    return httpClient.put('/employees', data);
}

const remove = (id) => {
    return httpClient.delete(`/employees/${id}`);
}

const filter = (data) =>{
    return httpClient.post('/employees/filter', data);
}

const filterCount = (data) =>{
    return httpClient.post('/employees/filter/count', data);
}

export default {getAll, create, get, update, remove, filter, filterCount};

