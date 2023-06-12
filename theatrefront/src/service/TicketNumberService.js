import {httpClient} from '../http-common.js';

const getAll = (curPage, recordPerPage) => {
    return httpClient.get(`/ticket-numbers?pageNo=${curPage}&pageSize=${recordPerPage}`);
};

const getAllList = () => {
    return httpClient.get(`/ticket-numbers/list`);
};


const create = (data) => {
    return httpClient.post("/ticket-numbers", data);
}

const get = (ticketId, number_ticketId) => {
    return httpClient.get(`/ticket-numbers/${ticketId}/${number_ticketId}`);
}

const update = (ticketId, number_ticketId, data) => {
    return httpClient.put(`/ticket-numbers/${ticketId}/${number_ticketId}`, data);
}

const remove = (ticketId, number_ticketId) => {
    return httpClient.delete(`/ticket-numbers/${ticketId}/${number_ticketId}`);
}

export default {getAll, getAllList, create, get, update, remove};