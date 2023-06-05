import React from "react";

import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Col from 'react-bootstrap/Col';
import FormControl from 'react-bootstrap/FormControl';
import InputGroup from 'react-bootstrap/InputGroup';
import Spinner from 'react-bootstrap/Spinner';

import { Link } from 'react-router-dom';
import employeeService from '../service/EmployeeService';

export default function EmployeePage() {
    const [employees, setEmployees] = React.useState([]);
    const [filteredEmployees, setFilteredEmployees] = React.useState([]);
    const [currentPage, setCurrentPage] = React.useState(1);
    const [totalPages, setTotalPages] = React.useState(0);
    const [totalElements, setTotalElements] = React.useState(0);

    const [filters, setFilters] = React.useState({
        experience: '',
        gender: '',
        birthYear: '',
        age: '',
        hasChildren: '',
        salary: '',
        hireDate: '', // Added hireDate filter
    });

    const recordPerPage = 5;

    React.useEffect(() => {
        init(1);
    }, []);

    const init = (currentPage) => {
        employeeService
            .getAll(currentPage - 1, recordPerPage)
            .then((response) => {
                console.log('Country data', response.data);
                setEmployees(response.data);
                setTotalPages(response.data.totalPages);
                setTotalElements(response.data.totalElements);
                setCurrentPage(response.data.number + 1);
                console.log(totalPages);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const handleDelete = (id) => {
        employeeService
            .remove(id)
            .then((response) => {
                console.log('Employee deleted', response.data);
                init(currentPage);
            })
            .catch((error) => {
                console.log('Something went wrong', error);
            });
    };

    const showNextPage = () => {
        console.log(currentPage);
        console.log(totalElements);
        if (currentPage < Math.ceil(totalElements / recordPerPage)) {
            init(currentPage + 1);
        }
        console.log(totalElements);
    };

    const showLastPage = () => {
        if (currentPage < Math.ceil(totalElements / recordPerPage)) {
            init(Math.ceil(totalElements / recordPerPage));
        }
    };

    const showFirstPage = () => {
        let firstPage = 1;
        if (currentPage > firstPage) {
            init(firstPage);
        }
    };


    const showPrevPage = () => {
        let prevPage = 1;
        if (currentPage > prevPage) {
            init(currentPage - prevPage);
        }
    };

    const handleHireDateChange = (e) => {
        const value = e.target.value;
        setFilters((prevFilters) => ({
            ...prevFilters,
            hireDate: value,
        }));
    };

    const applyFilters = () => {
        const filteredData = employees.filter((employee) => {
            // Check each filter and return true if the data matches the filter
            if (filters.hireDate !== '' && employee.hireDate !== filters.hireDate) {
                return false;
            }
            // Add other conditions for filters if needed
            return true;
        });
        setFilteredEmployees(filteredData);
    };

    React.useEffect(() => {
        applyFilters();
    }, [employees, filters]);


    return (
        <div>
            <h2>Работники театра</h2>
            <div className="table-container">
                <Link
                    to="/employees/add"
                    style={{ marginLeft: 30, marginTop: 30, color: 'white' }}
                    className="btn btn-dark mb-2"
                >
                    Добавить работника
                </Link>
                <Table
                    style={{ marginTop: 0, marginRight: 30, marginLeft: 30 }}
                    variant="dark"
                >
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Тип</th>
                        <th>ФИО</th>
                        <th>Гендер</th>
                        <th>День рождения</th>
                        <th>Количество детей</th>
                        <th>Зарплата</th>
                        <th>Дата найма</th>
                        <th>Действия</th>
                    </tr>
                    </thead>
                    <tbody>
                    {filteredEmployees.map((obj) => (
                        <tr key={obj.id}>
                            <td>{obj.id}</td>
                            <td>{obj.type.id}</td>
                            <td>{obj.fio}</td>
                            <td>{obj.gender.id}</td>
                            <td>{obj.birthDate}</td>
                            <td>{obj.childrenAmount}</td>
                            <td>{obj.salary}</td>
                            <td>{obj.hireDate}</td>
                            <td>
                                <Link
                                    style={{
                                        backgroundColor: '#D10000',
                                        borderColor: '#D10000',
                                    }}
                                    to={`/employee/edit/${obj.id}`}
                                    className="btn btn-danger"
                                >
                                    Изменить
                                </Link>
                                <Link
                                    style={{
                                        backgroundColor: '#D10000',
                                        borderColor: '#D10000',
                                        marginLeft: 10,
                                    }}
                                    onClick={(e) => {
                                        handleDelete(obj.id);
                                    }}
                                    className="btn btn-danger"
                                >
                                    Удалить
                                </Link>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
            <Table className="table" bordered="false">
                <div style={{ float: 'left', marginLeft: 40, color: '#D10000' }}>
                    Страница {currentPage} из {totalPages}
                </div>
                <div style={{ float: 'right', marginRight: 35 }}>
                    <nav>
                        <ul className="pagination">
                            <li className="page-item"><a type="button" className="page-link" disabled={currentPage === 1} onClick={showPrevPage}>Previous</a></li>
                            <li className="page-item"><a type="button" className="page-link" disabled={currentPage === 1} onClick={showFirstPage}>First</a></li>
                            <li className="page-item"><a type="button" className="page-link" disabled={currentPage === totalPages} onClick={showNextPage}>Next</a></li>
                            <li className="page-item"><a type="button" className="page-link" disabled={currentPage === totalPages} onClick={showLastPage}>Last</a></li>
                        </ul>
                    </nav>
                </div>
            </Table>
            </div>
        </div>
    );
}