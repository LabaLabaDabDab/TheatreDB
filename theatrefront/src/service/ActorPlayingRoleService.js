import {httpClient} from '../http-common.js';

const getAll = (curPage, recordPerPage) => {
    return httpClient.get(`/actor-playing-roles?pageNo=${curPage}&pageSize=${recordPerPage}`);
};

const getAllList = () => {
    return httpClient.get(`/actor-playing-roles/list`);
};

const create = (data) => {
    return httpClient.post("/actor-playing-roles", data);
}

const get = (id) => {
    return httpClient.get(`/actor-playing-roles/${id}`);
}

const update = (data) => {
    return httpClient.put('/actor-playing-roles', data);
}

const remove = (id) => {
    return httpClient.delete(`/actor-playing-roles/${id}`);
}

export default {getAll, getAllList, create, get, update, remove};