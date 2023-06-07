import {httpClient} from '../http-common.js';

const getAll = (curPage, recordPerPage) => {
    return httpClient.get(`/date-of-playing?pageNo=${curPage}&pageSize=${recordPerPage}`);
};

const getAllList = () => {
    return httpClient.get(`/date-of-playing/list`);
};

const create = (data) => {
    return httpClient.post("/date-of-playing", data);
}

const get = (id) => {
    return httpClient.get(`/date-of-playing/${id}`);
}

const update = (data) => {
    return httpClient.put('/date-of-playing', data);
}

const remove = (id) => {
    return httpClient.delete(`/date-of-playing/${id}`);
}

export default {getAll, getAllList, create, get, update, remove};