import {httpClient} from '../http-common.js';

const getAll = (curPage, recordPerPage) => {
    return httpClient.get(`/achievements?pageNo=${curPage}&pageSize=${recordPerPage}`);
};

const create = (data) => {
    return httpClient.post("/achievements", data);
}

const get = (id) => {
    return httpClient.get(`/achievements/${id}`);
}

const update = (id, data) => {
    return httpClient.put(`/achievements/${id}`, data);
}

const remove = (id) => {
    return httpClient.delete(`/achievements/${id}`);
}

export default {getAll, create, get, update, remove};