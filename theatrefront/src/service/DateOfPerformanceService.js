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

const get = (dateId, performanceId) => {
    return httpClient.get(`/date-performances/${dateId}/${performanceId}`);
}

const update = (dateId, performanceId, data) => {
    return httpClient.put(`/date-performances/${dateId}/${performanceId}`, data);
}

const remove = (dateId, performanceId) => {
    return httpClient.delete(`/date-performances/${dateId}/${performanceId}`);
}

const filter = (data) =>{
    return httpClient.post('/date-performances/filter/perf', data);
}

const filterCount = (data) =>{
    return httpClient.post('/date-performances/filter/count', data);
}

export default {getAll, getAllList, create, get, update, remove, filter, filterCount};