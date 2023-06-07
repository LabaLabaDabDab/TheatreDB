import {httpClient} from '../http-common.js';

const getAll = (curPage, recordPerPage) => {
    return httpClient.get(`/actor-tours?pageNo=${curPage}&pageSize=${recordPerPage}`);
};

const getAllList = () => {
    return httpClient.get(`/actor-tours/list`);
};

const create = (data) => {
    return httpClient.post("/actor-tours", data);
}

const get = (id) => {
    return httpClient.get(`/actor-tours/${id}`);
}

const update = (data) => {
    return httpClient.put('/actor-tours', data);
}

const remove = (id) => {
    return httpClient.delete(`/actor-tours/${id}`);
}

export default {getAll, getAllList, create, get, update, remove};