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

const update = (id, data) => {
    return httpClient.put(`/performances/${id}`, data);
}

const remove = (id) => {
    return httpClient.delete(`/performances/${id}`);
}

const filter = (data) =>{
    return httpClient.post('/performances/filter', data);
}

const getPerformanceDetails = (data) => {
    return httpClient.post('/performances/details', data);
}


export default {getAll, getAllList, create, get, update, remove, filter, getPerformanceDetails};