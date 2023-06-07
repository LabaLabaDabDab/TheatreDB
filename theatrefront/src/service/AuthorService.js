import {httpClient} from '../http-common.js';

const getAll = (curPage, recordPerPage) => {
    return httpClient.get(`/authors?pageNo=${curPage}&pageSize=${recordPerPage}`);
};

const getAllList = () => {
    return httpClient.get(`/authors/list`);
};

const create = (data) => {
    return httpClient.post("/authors", data);
}

const get = (id) => {
    return httpClient.get(`/authors/${id}`);
}

const update = (data) => {
    return httpClient.put('/authors', data);
}

const remove = (id) => {
    return httpClient.delete(`/authors/${id}`);
}

export default {getAll, getAllList, create, get, update, remove};