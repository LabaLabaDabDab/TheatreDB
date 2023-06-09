import {httpClient} from '../http-common.js';

const getAll = (curPage, recordPerPage) => {
    return httpClient.get(`/date-of-tours?pageNo=${curPage}&pageSize=${recordPerPage}`);
};

const getAllList = () => {
    return httpClient.get(`/date-of-tours/list`);
};

const create = (data) => {
    return httpClient.post("/date-of-tours", data);
}

const get = (id) => {
    return httpClient.get(`/date-of-tours/${id}`);
}

const update = (id, data) => {
    return httpClient.put(`/date-of-tours/${id}`, data);
}

const remove = (id) => {
    return httpClient.delete(`/date-of-tours/${id}`);
}

export default {getAll, getAllList, create, get, update, remove};