import {httpClient} from '../http-common.js';

const getAll = (curPage, recordPerPage) => {
    return httpClient.get(`/ticket-numbers?pageNo=${curPage}&pageSize=${recordPerPage}`);
};

const getAllList = () => {
    return httpClient.get(`/ticket-numbers/list`);
};


const create = (data) => {
    return httpClient.post("/ticket-numbers", data);
}

const get = (id) => {
    return httpClient.get(`/ticket-numbers/${id}`);
}

const update = (id, data) => {
    return httpClient.put(`/ticket-numbers/${id}`, data);
}

const remove = (id) => {
    return httpClient.delete(`/ticket-numbers/${id}`);
}

export default {getAll, getAllList, create, get, update, remove};