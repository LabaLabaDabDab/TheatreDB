import {httpClient} from '../http-common.js';

const getAll = (curPage, recordPerPage) => {
    return httpClient.get(`/employeeTypes?pageNo=${curPage}&pageSize=${recordPerPage}`);
};

const getAllList = () => {
    return httpClient.get(`/employeeTypes/list`);
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

export default {getAll, getAllList, create, get, update, remove};