import {httpClient} from '../http-common.js';

const getAll = (curPage, recordPerPage) => {
    return httpClient.get(`/actor-playing-roles?pageNo=${curPage}&pageSize=${recordPerPage}`);
};

const getAllList = () => {
    return httpClient.get(`/actor-playing-roles/list`);
};

const create = (data) => {
    return httpClient.post("/actor-playing-roles", data);
}

const get = (actorId, roleId) => {
    return httpClient.get(`/actor-playing-roles/${actorId}/${roleId}`);
}

const update = (actorId, roleId, data) => {
    return httpClient.put(`/actor-playing-roles/${actorId}/${roleId}`, data);
}

const remove = (actorId, roleId) => {
    return httpClient.delete(`/actor-playing-roles/${actorId}/${roleId}`);
}

export default {getAll, getAllList, create, get, update, remove};