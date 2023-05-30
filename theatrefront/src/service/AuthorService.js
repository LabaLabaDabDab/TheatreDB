import {httpClient} from '../http-common.js';

const getAll = (curPage, recordPerPage) => {
    return httpClient.get(`/authors?pageNo=${curPage}&pageSize=${recordPerPage}`);
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

export default {getAll, create, get, update, remove};