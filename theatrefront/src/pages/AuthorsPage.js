import React, { Component } from 'react';
import Pagination from "react-js-pagination"

import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Col from 'react-bootstrap/Col';
import FormControl from 'react-bootstrap/FormControl';
import InputGroup from 'react-bootstrap/InputGroup';

import { Link } from 'react-router-dom';
import authorsService from '../services/authors.service';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faSearch } from "@fortawesome/free-solid-svg-icons";


export default function Authors({


                                }) {
    const [authors, setAuthors] = React.useState([]);
    const [currentPage, setCurrentPage] = React.useState(1);
    const [totalPages, setTotalPages] = React.useState(0);
    const [totalElements, setTotalElements] = React.useState(0);

    const [sort, setSort] = React.useState(false);

    const [searchName, setSearchName] = React.useState("");
    const [searchCountry, setSearchCountry] = React.useState("");
    const [searchGender, setSearchGender] = React.useState("");

    const recordPerPage = 5;

    React.useEffect(() => {
        init(1);
    }, []);

    const init = (currentPage) => {
        authorsService.getAll(currentPage - 1, recordPerPage)
            .then(response => {
                console.log('Authors data', response.data);
                setAuthors(response.data.content);
                setTotalPages(response.data.totalPages);
                setTotalElements(response.data.totalElements);
                setCurrentPage(response.data.number + 1);
                console.log(totalPages);
            })
            .catch(error => {
                console.log('Something went wrong', error);
            })
    }

    const handleDelete = id => {
        authorsService.remove(id)
            .then(response => {
                console.log('Author deleted', response.data);
                init(currentPage);
            })
            .catch(error => {
                console.log('Something went wrong', error);
            })
    }

    const showNextPage = () => {
        console.log(currentPage);
        console.log(totalElements);
        if (currentPage < Math.ceil(totalElements / recordPerPage)) {
            init(currentPage + 1);
        }
        console.log(totalElements);
    };
    //Show Last Page
    const showLastPage = () => {
        if (currentPage < Math.ceil(totalElements / recordPerPage)) {
            init(Math.ceil(totalElements / recordPerPage));
        }
    };
    //Show First page
    const showFirstPage = () => {
        let firstPage = 1;
        if (currentPage > firstPage) {
            init(firstPage);
        }
    };
    //Show previous page
    const showPrevPage = () => {
        let prevPage = 1
        if (currentPage > prevPage) {
            init(currentPage - prevPage);
        }
    };

    const handleChange = (e) => {
        setSort(true);
        console.log(e.target.value);
        authorsService.getAllSorted(currentPage - 1, recordPerPage, e.target.value)
            .then(response => {
                console.log('Authors data', response.data);
                setAuthors(response.data.content);
                setTotalPages(response.data.totalPages);
                setTotalElements(response.data.totalElements);
                setCurrentPage(response.data.number + 1);
                console.log(totalPages);
            })
            .catch(error => {
                console.log('Something went wrong', error);
            });
    };

    const handleReset = () => {
        setSort(false);
        init(1);
    };

    const searchChangeName = (e) => {
        // console.log(e.target.value)
        setSearchName(e.target.value)
    };

    const searchChangeCountry = (e) => {
        // console.log(e.target.value)
        setSearchCountry(e.target.value)
    };

    const searchChangeGender = (e) => {
        // console.log(e.target.value)
        setSearchGender(e.target.value)
    };

    const cancelSearch = (e) => {
        setSearchName('');
        setSearchCountry('');
        setSearchGender('');
        e.target.value = '';
        init(1);
    }

    const searchData = () => {
        authorsService.getAllFiltered(currentPage - 1, recordPerPage, searchName, searchCountry, searchGender)
            .then(response => {
                console.log('Authors data', response.data);
                setAuthors(response.data.content);
                setTotalPages(response.data.totalPages);
                setTotalElements(response.data.totalElements);
                setCurrentPage(response.data.number + 1);
                console.log(totalPages);
            })
            .catch(error => {
                console.log('Something went wrong', error);
            });
    }

    return (
        <div className="content p-40">
            <div className="align-left justify-between">
                <h1 className="text-uppercase">авторы</h1>
                <Form style={{ marginLeft: 40, marginRight: 40 }}>

                    <Row>
                        <InputGroup style={{ marginBottom: 10 }}>
                            <FormControl style={{marginRight:10, width:100}} onChange={searchChangeName} placeholder='Введите имя автора' name="search" value={searchName} />
                            <FormControl style={{marginRight:10, width:100}} onChange={searchChangeCountry} placeholder='Введите страну' name="search" value={searchCountry} />
                            <FormControl style={{marginRight:10, width:100}} onChange={searchChangeGender} placeholder='Введите пол атвора' name="search" value={searchGender} />

                            <Button onClick={searchData} style={{ marginLeft: 0, background: "#D10000", borderColor: "#D10000" }}>
                                <FontAwesomeIcon icon={faSearch} />
                            </Button>
                            <Button onClick={cancelSearch} style={{ background: "#D10000", borderColor: "#D10000" }}>
                                <FontAwesomeIcon icon={faTimes} />
                            </Button>

                        </InputGroup>

                        <label style={{ marginRight: 10, marginBottom: 10 }}>Сортировать по:</label>
                        <select style={{ width: 300, marginLeft: 10 }} className='form-select' name="colValue" onChange={handleChange}>
                            <option>Выберите</option>
                            <option value="name">Имя</option>
                            <option value="country">Страна</option>
                            <option value="gender">Пол</option>
                        </select>
                        <Button className="btn-search" onClick={handleReset} style={{ background: "#D10000", borderColor: "#D10000", marginLeft: 10, width: 100 }} variant="primary">
                            Сбросить
                        </Button>
                    </Row>
                </Form>
            </div>

            <div className="newsPanel d-flex flex-wrap">

                <Link to="/authors/add" style={{ marginLeft: 40, marginTop: 40, color: 'white' }} className="btn btn-dark mb-2">Добавить автора</Link>
                <Table style={{ marginTop: 20, marginRight: 40, marginLeft: 40 }} striped bordered hover variant="dark">
                    <thead >
                    <tr>
                        <th>Имя</th>
                        <th>Страна</th>
                        <th>Пол</th>
                        <th>Действия</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        authors.map(obj => (
                            <tr key={obj.id}>
                                <td>{obj.name}</td>
                                <td>{obj.country}</td>
                                <td>{obj.gender}</td>
                                <td>
                                    <Link style={{ backgroundColor: "#D10000", borderColor: "#D10000" }} to={`/authors/edit/${obj.id}`} className='btn btn-danger'>Изменить</Link>
                                    <Link style={{ backgroundColor: "#D10000", borderColor: "#D10000", marginLeft: 10 }} onClick={(e) => { handleDelete(obj.id) }} className='btn btn-danger'>Удалить</Link>
                                </td>
                            </tr>
                        ))
                    }

                    </tbody>
                </Table>
                <Table className="table" bordered="false">
                    <div style={{ float: 'left', marginLeft: 40, color: '#D10000' }}>
                        Страница {currentPage} из {totalPages}
                    </div>
                    <div style={{ float: 'right', marginRight: 35 }}>
                        <nav>
                            <ul class="pagination">
                                <li class="page-item"><a type="button" class="page-link" disabled={currentPage === 1 ? true : false} onClick={showPrevPage}>Previous</a></li>
                                <li class="page-item"><a type="button" class="page-link" disabled={currentPage === 1 ? true : false} onClick={showFirstPage}>First</a></li>
                                <li class="page-item"><a type="button" class="page-link" disabled={currentPage === totalPages ? true : false} onClick={showNextPage}>Next</a></li>
                                <li class="page-item"><a type="button" class="page-link" disabled={currentPage === totalPages ? true : false} onClick={showLastPage}>Last</a></li>
                            </ul>
                        </nav>
                    </div>
                </Table>

            </div>

        </div >
    );
}