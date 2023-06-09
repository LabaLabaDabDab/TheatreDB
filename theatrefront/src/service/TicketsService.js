import {httpClient} from '../http-common.js';

const getAll = (curPage, recordPerPage) => {
    return httpClient.get(`/tickets?pageNo=${curPage}&pageSize=${recordPerPage}`);
};

const getAllList = () => {
    return httpClient.get(`/tickets/list`);
};


const create = (data) => {
    return httpClient.post("/tickets", data);
}

const get = (id) => {
    return httpClient.get(`/tickets/${id}`);
}

const update = (id, data) => {
    return httpClient.put(`/tickets/${id}`, data);
}

const remove = (id) => {
    return httpClient.delete(`/tickets/${id}`);
}

export default {getAll, getAllList, create, get, update, remove};