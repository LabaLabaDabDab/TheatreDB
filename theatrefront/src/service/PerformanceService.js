import {httpClient} from '../http-common.js';

const getAll = (curPage, recordPerPage) => {
    return httpClient.get(`/performances?pageNo=${curPage}&pageSize=${recordPerPage}`);
};

const getAllList = () => {
    return httpClient.get(`/performances/list`);
};


const create = (data) => {
    return httpClient.post("/performances", data);
}

const get = (id) => {
    return httpClient.get(`/performances/${id}`);
}

const update = (data) => {
    return httpClient.put('/performances', data);
}

const remove = (id) => {
    return httpClient.delete(`/performances/${id}`);
}

export default {getAll, getAllList, create, get, update, remove};