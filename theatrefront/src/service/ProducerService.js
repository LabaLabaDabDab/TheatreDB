import {httpClient} from '../http-common.js';

const getAll = (curPage, recordPerPage) => {
    return httpClient.get(`/producers?pageNo=${curPage}&pageSize=${recordPerPage}`);
};

const getAllList = () => {
    return httpClient.get(`/producers/list`);
};

const create = (data) => {
    return httpClient.post("/producers", data);
}

const get = (id) => {
    return httpClient.get(`/producers/${id}`);
}

const update = (data) => {
    return httpClient.put('/producers', data);
}

const remove = (id) => {
    return httpClient.delete(`/producers/${id}`);
}

export default {getAll, getAllList, create, get, update, remove};