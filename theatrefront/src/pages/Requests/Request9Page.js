import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import performanceService from '../../service/PerformanceService';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Select from "react-select";

function Request9Page({ history }) {
    const [performanceDetails, setPerformanceDetails] = useState([]);

    const [performanceIdsFilter, setPerformanceIdsFilter] = useState([]);
    const [performanceIdsOptions, setPerformanceIdsOptions] = useState([]);


    const init = () => {
        const filterData = {
            performance: performanceIdsFilter
        }
        performanceService.getPerformanceDetails(filterData)
            .then(response => {
                console.log('Performance details', response.data);
                setPerformanceDetails(response.data);
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
            <h2>Подробности о представлении</h2>
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
                    <th>Имя актера</th>
                    <th>Имя продюсера</th>
                    <th>Имя музыканта</th>
                    <th>Имя режиссера</th>
                    <th>Имя автора</th>
                    <th>Дата премьеры</th>
                </tr>
                </thead>
                <tbody>
                {performanceDetails.map((performanceDetail, index) => (
                    <tr key={index}>
                        <td>{performanceDetail.actorName}</td>
                        <td>{performanceDetail.producerName}</td>
                        <td>{performanceDetail.musicianName}</td>
                        <td>{performanceDetail.directorName}</td>
                        <td>{performanceDetail.authorName}</td>
                        <td>{new Date(performanceDetail.premiereDate).toLocaleDateString()}</td>
                    </tr>
                ))}
                </tbody>
            </Table>
        </div>
    );
}

export default withRouter(Request9Page);
