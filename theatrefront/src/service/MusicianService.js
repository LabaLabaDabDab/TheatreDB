import {httpClient} from '../http-common.js';

const getAll = (curPage, recordPerPage) => {
    return httpClient.get(`/musicians?pageNo=${curPage}&pageSize=${recordPerPage}`);
};

const getAllList = () => {
    return httpClient.get(`/musicians/list`);
};


const create = (data) => {
    return httpClient.post("/musicians", data);
}

const get = (id) => {
    return httpClient.get(`/musicians/${id}`);
}

const update = (data) => {
    return httpClient.put('/musicians', data);
}

const remove = (id) => {
    return httpClient.delete(`/musicians/${id}`);
}

export default {getAll, getAllList, create, get, update, remove};