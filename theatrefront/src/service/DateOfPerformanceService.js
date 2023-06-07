import {httpClient} from '../http-common.js';

const getAll = (curPage, recordPerPage) => {
    return httpClient.get(`/date-performances?pageNo=${curPage}&pageSize=${recordPerPage}`);
};

const getAllList = () => {
    return httpClient.get(`/date-performances/list`);
};

const create = (data) => {
    return httpClient.post("/date-performances", data);
}

const get = (id) => {
    return httpClient.get(`/date-performances/${id}`);
}

const update = (data) => {
    return httpClient.put('/date-performances', data);
}

const remove = (id) => {
    return httpClient.delete(`/date-performances/${id}`);
}

export default {getAll, getAllList, create, get, update, remove};