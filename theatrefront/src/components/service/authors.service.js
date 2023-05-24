import httpClient from '../../http-common.js';

const getAll = (curPage, recordPerPage) => {
    return httpClient.get(`/authors?pageNo=${curPage}&pageSize=${recordPerPage}&sortBy=id&name=&country=&gender=`);
}

const getAllSorted = (curPage, recordPerPage, sortBy) => {
    return httpClient.get(`/authors?pageNo=${curPage}&pageSize=${recordPerPage}&sortBy=${sortBy}&name=&country=&gender=`);
}

const getAllFiltered = (curPage, recordPerPage, name, country, gender) => {
    return httpClient.get(`/authors?pageNo=${curPage}&pageSize=${recordPerPage}&sortBy=id&name=${name}&country=${country}&gender=${gender}`);
}

const create = (data) => {
    return httpClient.post("/authors", data);
}

const get = (id) => {
    return httpClient.get(`/authors/${id}`);
}

const update = (data) => {
    return httpClient.put('/authors', data);
}

const remove = (id) => {
    return httpClient.delete(`/authors/${id}`);
}

export default {getAll, getAllSorted, getAllFiltered, create, get, update, remove};