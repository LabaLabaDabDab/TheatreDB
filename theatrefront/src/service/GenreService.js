import {httpClient} from '../http-common.js';

const getAll = (curPage, recordPerPage) => {
    return httpClient.get(`/genres?pageNo=${curPage}&pageSize=${recordPerPage}`);
};

const getAllList = () => {
    return httpClient.get(`/genres/list`);
};


const create = (data) => {
    return httpClient.post("/genres", data);
}

const get = (id) => {
    return httpClient.get(`/genres/${id}`);
}

const update = (data) => {
    return httpClient.put('/genres', data);
}

const remove = (id) => {
    return httpClient.delete(`/genres/${id}`);
}

export default {getAll, getAllList, create, get, update, remove};