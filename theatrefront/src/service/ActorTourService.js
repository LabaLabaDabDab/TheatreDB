import {httpClient} from '../http-common.js';

const getAll = (curPage, recordPerPage) => {
    return httpClient.get(`/actor-tours?pageNo=${curPage}&pageSize=${recordPerPage}`);
};

const getAllList = () => {
    return httpClient.get(`/actor-tours/list`);
};

const create = (data) => {
    return httpClient.post("/actor-tours", data);
}

const get = (dateID, actorID) => {
    return httpClient.get(`/actor-tours/${dateID}/${actorID}`);
}

const update = (dateID, actorID, data) => {
    return httpClient.put(`/actor-tours/${dateID}/${actorID}`, data);
}

const remove = (dateID, actorID) => {
    return httpClient.delete(`/actor-tours/${dateID}/${actorID}`);
}

export default {getAll, getAllList, create, get, update, remove};