import {httpClient} from '../http-common.js';

const getAll = (curPage, recordPerPage) => {
    return httpClient.get(`/achievements?pageNo=${curPage}&pageSize=${recordPerPage}`);
};

const getAllList = () => {
    return httpClient.get(`/achievements/list`);
};

const getAllRankAndCompetition = () => {
    return httpClient.get(`/achievements/unique`);
};

const create = (data) => {
    return httpClient.post("/achievements", data);
}

const get = (id) => {
    return httpClient.get(`/achievements/${id}`);
}

const update = (id, data) => {
    return httpClient.put(`/achievements/${id}`, data);
}

const remove = (id) => {
    return httpClient.delete(`/achievements/${id}`);
}

export default {getAll, getAllList, create, get, update, remove, getAllRankAndCompetition};