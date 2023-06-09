import {httpClient} from '../http-common.js';

const getAll = (curPage, recordPerPage) => {
    return httpClient.get(`/roles?pageNo=${curPage}&pageSize=${recordPerPage}`);
};

const getAllList = () => {
    return httpClient.get(`/roles/list`);
};

const create = (data) => {
    return httpClient.post("/roles", data);
}

const get = (id) => {
    return httpClient.get(`/roles/${id}`);
}

const update = (id, data) => {
    return httpClient.put(`/roles/${id}`, data);
}

const remove = (id) => {
    return httpClient.delete(`/roles/${id}`);
}

export default {getAll, getAllList, create, get, update, remove};