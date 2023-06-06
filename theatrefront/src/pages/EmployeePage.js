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

    const [filters, setFilters] = React.useState({
        experience: '',
        gender: '',
        birthYear: '',
        age: '',
        hasChildren: '',
        salary: '',
        hireDate: '', // Added hireDate filter
    });


    React.useEffect(() => {
        init();
    }, []);

    const init = () => {
        employeeService
            .getAll()
            .then((response) => {
                console.log('Employee data', response.data);
                setEmployees(response.data);
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
                init();
            })
            .catch((error) => {
                console.log('Something went wrong', error);
            });
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
                <Link to="/achievement/add" style={{ marginLeft: 10, marginTop: 10, color: 'white' }} className="btn btn-dark mb-2">Добавить</Link>
                <Table style={{ width: '100%', marginTop: 20, marginRight: 40, marginLeft: 0 }} striped bordered hover variant="dark">
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
                            <td style={{ fontSize: "14px" }}>{obj.id}</td>
                            <td style={{ fontSize: "14px" }}>{obj.type.id}</td>
                            <td style={{ fontSize: "14px" }}>{obj.fio}</td>
                            <td style={{ fontSize: "14px" }}>{obj.gender.id}</td>
                            <td style={{ fontSize: "14px" }}>{obj.birthDate}</td>
                            <td style={{ fontSize: "14px" }}>{obj.childrenAmount}</td>
                            <td style={{ fontSize: "14px" }}>{obj.salary}</td>
                            <td style={{ fontSize: "14px" }}>{obj.hireDate}</td>
                            <td>
                                <Link style={{ backgroundColor: '#D10000', borderColor: '#D10000' }} to={`/employee/edit/${obj.id}`} className="btn btn-danger">Изменить</Link>
                                <Link style={{ backgroundColor: '#D10000', borderColor: '#D10000', marginLeft: 10}} onClick={(e) => {handleDelete(obj.id);}} className="btn btn-danger">Удалить</Link>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
            </div>
        </div>
    );
}