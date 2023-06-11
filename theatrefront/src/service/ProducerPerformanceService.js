import {httpClient} from '../http-common.js';

const getAll = (curPage, recordPerPage) => {
    return httpClient.get(`/producer-performances?pageNo=${curPage}&pageSize=${recordPerPage}`);
};

const getAllList = () => {
    return httpClient.get(`/producer-performances/list`);
};

const create = (data) => {
    return httpClient.post("/producer-performances", data);
}

const get = (producerId, performanceId) => {
    return httpClient.get(`/producer-performances/${producerId}/${performanceId}`);
}

const update = (producerId, performanceId, data) => {
    return httpClient.put(`/producer-performances/${producerId}/${performanceId}`, data);
}

const remove = (producerId, performanceId) => {
    return httpClient.delete(`/producer-performances/${producerId}/${performanceId}`);
}

export default {getAll, getAllList, create, get, update, remove};