import {httpClient} from '../http-common.js';

const getAll = (curPage, recordPerPage) => {
    return httpClient.get(`/directors?pageNo=${curPage}&pageSize=${recordPerPage}`);
};

const getAllList = () => {
    return httpClient.get(`/directors/list`);
};

const create = (data) => {
    return httpClient.post("/directors", data);
}

const get = (id) => {
    return httpClient.get(`/directors/${id}`);
}

const update = (id, data) => {
    return httpClient.put(`/directors/${id}`, data);
}

const remove = (id) => {
    return httpClient.delete(`/directors/${id}`);
}

export default {getAll, getAllList, create, get, update, remove};