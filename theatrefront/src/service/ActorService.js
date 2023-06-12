import {httpClient} from '../http-common.js';

const getAll = (curPage, recordPerPage) => {
    return httpClient.get(`/actors?pageNo=${curPage}&pageSize=${recordPerPage}`);
};

const getAllList = () => {
    return httpClient.get(`/actors/list`);
};

const create = (data) => {
    return httpClient.post("/actors", data);
}

const get = (id) => {
    return httpClient.get(`/actors/${id}`);
}

const update = (id, data) => {
    return httpClient.put(`/actors/${id}`, data);
}

const remove = (id) => {
    return httpClient.delete(`/actors/${id}`);
}

const getAllActorRoles = () => {
    return httpClient.get(`/actors/matching-roles`);
};

const filter = (data) =>{
    return httpClient.post('/actors/filteredByAchievement', data);
}

const filterCount = (data) =>{
    return httpClient.post('/actors/filteredByAchievement/count', data);
}

const filterRoles = (data) =>{
    return httpClient.post('/actors/search-roles', data);
}

const filterRolesCount = (data) =>{
    return httpClient.post('/actors/search-roles/count', data);
}

export default {getAll, getAllList, create, get, update, remove, getAllActorRoles, filter, filterCount, filterRoles, filterRolesCount};