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

function Request13Page({ history }) {
    const [freeSeatsDetails, setFreeSeatsDetails] = useState([]);
    const [count, setCount] = React.useState(0);

    const [performanceIdsFilter, setPerformanceIdsFilter] = useState([]);
    const [performanceIdsOptions, setPerformanceIdsOptions] = useState([]);

    const [premiere, setPremiere] = useState(false);

    const init = () => {
        const filterData = {
            performance: performanceIdsFilter,
            premiere
        }
        ticketsService.getFreeSeatsDetails(filterData)
            .then(response => {
                console.log('Free Seats details', response.data);
                setFreeSeatsDetails(response.data);
            })
            .catch(error => {
                console.error(error);
            });
        ticketsService.getFreeSeatsDetailsCount(filterData)
            .then(response => {
                console.log('Free Seats details', response.data);
                setCount(response.data);
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
            <h2>Список свободных мест на представления</h2>
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
                    <Col style={{ marginTop: '37px', margin: 10 }}>
                        <Form.Check type="checkbox" label="Премьера" onChange={(e) => setPremiere(e.target.checked)} />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Button  style={{ margin: 10 }} variant="primary" type="submit">
                            Применить фильтры
                        </Button>
                    </Col>
                </Row>
            </Form>
            <h3>Количество свободных билетов: {count}</h3> {}
            <div className={"table-container"}>
                <Table style={{ width: '100%', marginTop: 20, marginRight: 40, marginLeft: 0 }} striped bordered hover variant="dark">
                    <thead>
                    <tr>
                        <th>Название спектакля</th>
                        <th>Дата представления</th>
                        <th>Номер свободного билета</th>
                    </tr>
                    </thead>
                    <tbody>
                    {freeSeatsDetails.map((freeSeatDetail, index) => (
                        <tr key={index}>
                            <td>{freeSeatDetail.performanceTitle}</td>
                            <td>{new Date(freeSeatDetail.dateOfPerformance).toLocaleDateString()}</td>
                            <td>{freeSeatDetail.ticketNumberId}</td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
            </div>
        </div>
    );
}

export default withRouter(Request13Page);
