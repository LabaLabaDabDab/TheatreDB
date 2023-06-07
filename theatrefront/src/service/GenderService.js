import {httpClient} from '../http-common.js';

const getAll = (curPage, recordPerPage) => {
    return httpClient.get(`/genders?pageNo=${curPage}&pageSize=${recordPerPage}`);
};

const getAllList = () => {
    return httpClient.get(`/genders/list`);
};


const create = (data) => {
    return httpClient.post("/genders", data);
}

const get = (id) => {
    return httpClient.get(`/genders/${id}`);
}

const update = (data) => {
    return httpClient.put('/genders', data);
}

const remove = (id) => {
    return httpClient.delete(`/genders/${id}`);
}

export default {getAll, getAllList, create, get, update, remove};