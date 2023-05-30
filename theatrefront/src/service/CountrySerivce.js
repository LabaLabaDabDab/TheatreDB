import {httpClient} from '../http-common.js';

const getAll = (curPage, recordPerPage) => {
    return httpClient.get(`/countries?pageNo=${curPage}&pageSize=${recordPerPage}`);
};


const create = (data) => {
    return httpClient.post("/countries", data);
}

const get = (id) => {
    return httpClient.get(`/countries/${id}`);
}

const update = (data) => {
    return httpClient.put('/countries', data);
}

const remove = (id) => {
    return httpClient.delete(`/countries/${id}`);
}

export default {getAll, create, get, update, remove};