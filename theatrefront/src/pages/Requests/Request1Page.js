import React from "react";

import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Col from 'react-bootstrap/Col';
import Select from 'react-select';

import employeeService from "../../service/EmployeeService";
import genderService from "../../service/GenderService";
import employeeTypeService from "../../service/EmployeeTypeService";

export default function Request1Page({

}) {
    const [employees, setEmployee] = React.useState([]);
    const [typeOptions, setTypeOptions] = React.useState([]);
    const [genderOptions, setGenderOptions] = React.useState([]);

    const [typeFilter, setTypeFilter] = React.useState([]);
    const [genderFilter, setGenderFilter] = React.useState([]);

    const [startDate, setStartDate] = React.useState("");
    const [endDate, setEndDate] = React.useState("");
    const [childrenAmountFilter, setChildrenAmountFilter] = React.useState([]);
    const [salaryFilter, setSalaryFilter] = React.useState([]);
    const [yearsFilter, setYearsFilter] = React.useState([]);

    const init = ()  => {
        employeeService.filter({
            types: typeFilter,
            years: yearsFilter,
            genders: genderFilter,
            birth_dates: [startDate, endDate],
            amount_children: childrenAmountFilter,
            salary: salaryFilter
        })
            .then(response => {
                console.log('Actor data', response.data);
                setEmployee(response.data);
            })
            .catch(error => {
                console.error(error)
            })
    }

    React.useEffect(() => {
        employeeTypeService.getAll()
            .then(response => {
                const options = response.data.map(item => ({ value: item.id.toString(), label: item.type }));
                setTypeOptions(options);
                console.log(options);
            })
            .catch(error => {
                console.error(error)
            });
    }, []);

    React.useEffect(() => {
        genderService.getAll()
            .then(response => {
                const options = response.data.map(item => ({ value: item.id.toString(), label: item.type }));
                setGenderOptions(options);
                console.log(options);
            })
            .catch(error => {
                console.error(error)
            });
    }, []);

    const applyFilters = (event) => {
        init();
        event.preventDefault();
    };

    const handleTypeFilterChange = (selectedOptions) => {
        setTypeFilter(selectedOptions.map(option => option.value));
    };

    const handleGenderFilterChange = (selectedOptions) => {
        setGenderFilter(selectedOptions.map(option => option.value));
    };
    const handleChildrenAmountFilterChange = (event) => {
        setChildrenAmountFilter(event.target.value.split(',').map(v => v.trim()));
    };

    const handleSalaryFilterChange = (event) => {
        setSalaryFilter(event.target.value.split(',').map(v => v.trim()));
    };

    const handleYearsFilterChange = (event) => {
        setYearsFilter(event.target.value.split(',').map(v => v.trim()));
    };

    return (
        <div>
            <h2>Фильтрация</h2>
            <Form onSubmit={applyFilters}>
                <Row className="mb-3">
                    <Col>
                        <Form.Label>Тип</Form.Label>
                        <Select
                            isMulti
                            options={typeOptions}
                            onChange={handleTypeFilterChange}
                            placeholder="Выберите типы..."
                        />
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col>
                        <Form.Label>Гендер</Form.Label>
                        <Select
                            isMulti
                            options={genderOptions}
                            onChange={handleGenderFilterChange}
                            placeholder="Выберите гендеры..."
                        />
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col>
                        <Form.Label>Годы рождения от:</Form.Label>
                        <input type="date" className="form-control" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                    </Col>
                    <Col>
                        <Form.Label>до:</Form.Label>
                        <input type="date" className="form-control" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col>
                        <Form.Label>Количество детей</Form.Label>
                        <Form.Control type="text" placeholder="Введите количества детей через запятую" name="amount_children" onChange={handleChildrenAmountFilterChange} />
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col>
                        <Form.Label>Зарплата</Form.Label>
                        <Form.Control type="text" placeholder="Введите зарплаты через запятую" name="salary" onChange={handleSalaryFilterChange} />
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col>
                        <Form.Label>Стаж работы</Form.Label>
                        <Form.Control type="text" placeholder="Введите года через запятую" name="years" onChange={handleYearsFilterChange} />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Button variant="primary" type="submit">
                            Применить фильтры
                        </Button>
                    </Col>
                </Row>
            </Form>

            <div className={"table-container"}>
                <Table style={{ width: '100%', marginTop: 20, marginRight: 40, marginLeft: 0 }} striped bordered hover variant="dark">
                    <thead >
                    <tr>
                        <th>ID</th>
                        <th>Тип</th>
                        <th>ФИО</th>
                        <th>Гендер</th>
                        <th>День рождения</th>
                        <th>Количество детей</th>
                        <th>Зарплата</th>
                        <th>Дата найма</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        employees.map(obj => (
                            <tr key={obj.id}>
                                <td style={{ fontSize: "14px" }}>{obj.id}</td>
                                <td style={{ fontSize: "14px" }}>{obj.type}</td>
                                <td style={{ fontSize: "14px" }}>{obj.fio}</td>
                                <td style={{ fontSize: "14px" }}>{obj.gender}</td>
                                <td style={{ fontSize: "14px" }}>{String(obj.birthDate)}</td>
                                <td style={{ fontSize: "14px" }}>{obj.amountChildren}</td>
                                <td style={{ fontSize: "14px" }}>{obj.salary}</td>
                                <td style={{ fontSize: "14px" }}>{String(obj.hireDate)}</td>
                            </tr>
                        ))
                    }
                    </tbody>
                </Table>
            </div>
        </div>
    )
}