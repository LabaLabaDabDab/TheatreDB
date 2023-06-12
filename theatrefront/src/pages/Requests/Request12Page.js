import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import performanceService from '../../service/PerformanceService';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Select from "react-select";
import ticketsService from "../../service/TicketsService";

function TotalRevenuePage({ history }) {
    const [revenueDetails, setRevenueDetails] = useState([]);

    const [performanceIdsFilter, setPerformanceIdsFilter] = useState([]);
    const [performanceIdsOptions, setPerformanceIdsOptions] = useState([]);

    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const init = () => {
        const filterData = {
            performance: performanceIdsFilter,
            date_performance: [startDate, endDate]
        }
        ticketsService.getTotalRevenueByPerformanceAndDate(filterData)
            .then(response => {
                console.log('Revenue details', response.data);
                setRevenueDetails(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    };

    React.useEffect(() => {
        performanceService.getAllList()
            .then(response => {
                const options = response.data.map(item => ({ value: item.id.toString(), label: item.author.title }));
                setPerformanceIdsOptions(options);
            })
            .catch(error => console.error(error));

    }, []);

    const handleInputChange = selectedOptions => {
        setPerformanceIdsFilter(selectedOptions.map(option => option.value));
    };

    const applyFilters = (event) => {
        init();
        event.preventDefault();
    };

    const goBack = () => history.push("/request");

    return (
        <div>
            <h2>Выручка от проданных билетов на представления</h2>
            <Button style={{ margin: 10 }} variant="secondary" onClick={goBack}>
                Назад
            </Button>
            <Form onSubmit={applyFilters}>
                <Row className="mb-3">
                    <Col>
                        <Form.Label>Представления</Form.Label>
                        <Select
                            isMulti
                            options={performanceIdsOptions}
                            onChange={handleInputChange}
                            placeholder="Выберите представления..."
                        />
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col>
                        <Form.Label>Дата начала</Form.Label>
                        <Form.Control type="date" onChange={(e) => setStartDate(e.target.value)} />
                    </Col>
                    <Col>
                        <Form.Label>Дата окончания</Form.Label>
                        <Form.Control type="date" onChange={(e) => setEndDate(e.target.value)} />
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
            <Table style={{ width: '100%', marginTop: 20, marginRight: 40, marginLeft: 0 }} striped bordered hover variant="dark">
                <thead>
                <tr>
                    <th>Название спектакля</th>
                    <th>Дата представления</th>
                    <th>Общая выручка</th>
                </tr>
                </thead>
                <tbody>
                {revenueDetails.map((revenueDetail, index) => (
                    <tr key={index}>
                        <td>{revenueDetail.performanceTitle}</td>
                        <td>{new Date(revenueDetail.dateOfPerformance).toLocaleDateString()}</td>
                        <td>{revenueDetail.totalRevenue}</td>
                    </tr>
                ))}
                </tbody>
            </Table>
        </div>
    );
}

export default withRouter(TotalRevenuePage);
