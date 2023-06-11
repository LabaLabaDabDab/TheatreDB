import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import dateOfTourService from "../../service/DateOfTourService";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

function EmployeeTourDatesPage({ history }) {
    const [employeeTours, setEmployeeTours] = useState([]);

    const [startDate, setStartDate] = React.useState("");
    const [endDate, setEndDate] = React.useState("");

    const fetchTourData = ()  => {
        const filterData = {
            dateOfTour: [startDate, endDate]
        };
        dateOfTourService.filter(filterData)
            .then(response => {
                console.log('Employee data', response.data);
                setEmployeeTours(response.data);
            })
            .catch(error => {
                console.error(error)
            });
    }

    const applyFilters = (event) => {
        fetchTourData();
        event.preventDefault();
    };

    const goBack = () => history.push("/request");

    return (
        <div>
            <h2>Информация о работниках, которые участвуют в турах</h2>
            <Button  style={{ margin: 10 }} variant="secondary" onClick={goBack}>
                Назад
            </Button>
            <div>
                <Form onSubmit={applyFilters}>
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
                    <Row>
                        <Col>
                            <Button  style={{ margin: 10 }}variant="primary" type="submit">
                                Применить фильтры
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </div>
            <Table style={{ width: '100%', marginTop: 20, marginRight: 40, marginLeft: 0 }} striped bordered hover variant="dark">
                <thead>
                <tr>
                    <th>ФИО</th>
                    <th>Профессия</th>
                    <th>Начало тура</th>
                    <th>Конец тура</th>
                </tr>
                </thead>
                <tbody>
                {
                    employeeTours.map(obj => (
                    <tr key={obj.id}>
                        <td>{obj.personName}</td>
                        <td>{obj.role}</td>
                        <td>{new Date(obj.tourStart).toLocaleDateString()}</td>
                        <td>{new Date(obj.tourEnd).toLocaleDateString()}</td>
                    </tr>
                ))
                }
                </tbody>
            </Table>
        </div>
    );
}

export default withRouter(EmployeeTourDatesPage);
