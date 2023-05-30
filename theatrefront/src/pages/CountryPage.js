import React from "react";

import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Col from 'react-bootstrap/Col';
import FormControl from 'react-bootstrap/FormControl';
import InputGroup from 'react-bootstrap/InputGroup';

import { Link } from 'react-router-dom';
import countryService from '../service/CountrySerivce';

export default function CountryPage({

}) {
    const [countries, setCountry] = React.useState([]);
    const [currentPage, setCurrentPage] = React.useState(1);
    const [totalPages, setTotalPages] = React.useState(0);
    const [totalElements, setTotalElements] = React.useState(0);

    const [sort, setSort] = React.useState(false);

    const recordPerPage = 5;

    React.useEffect(() => {
        init(1);
    }, []);


    const init = (currentPAage)  => {
        countryService.getAll(currentPAage - 1, recordPerPage)
        .then(response => {
            console.log('Country data', response.data);
            setCountry(response.data)
            setTotalPages(response.data.totalPages);
            setTotalElements(response.data.totalElements);
            setCurrentPage(response.data.number + 1);
            console.log(totalPages);
        })
        .catch(error => {
            console.error(error)
        });
    }

    const handleDelete = id => {
        countryService.remove(id)
            .then(response => {
                console.log('Country deleted', response.data);
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

    return (
        <div>
            <h2>Страны</h2>
            <div className={"table-container"}>
                <Link to="/actors/add" style={{ marginLeft: 40, marginTop: 40, color: 'white' }} className="btn btn-dark mb-2">Добавить страну</Link>
                <Table style={{ marginTop: 20, marginRight: 40, marginLeft: 40 }} striped bordered hover variant="dark">
                    <thead >
                    <tr>
                        <th>ID</th>
                        <th>Название</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        countries.map(obj => (
                            <tr key={obj.id}>
                                <td>{obj.id}</td>
                                <td>{obj.name}</td>
                                <td>
                                    <Link style={{ backgroundColor: "#D10000", borderColor: "#D10000" }} to={`/country/edit/${obj.id}`} className='btn btn-danger'>Изменить</Link>
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
        </div>
    )
}

