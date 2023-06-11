import React from "react";

import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Col from 'react-bootstrap/Col';
import Select from 'react-select';

import dateOfPerformanceService from "../../service/DateOfPerformanceService";
import genreService from "../../service/GenreService";
import {withRouter} from "react-router-dom";

function Request23Page({ history }) {
    const [dateOfPerformances, setDateOfPerformance] = React.useState([]);
    const [count, setCount] = React.useState(0);

    const seasonOptions = [
        { value: '1', label: 'Зима' },
        { value: '2', label: 'Весна' },
        { value: '3', label: 'Лето' },
        { value: '4', label: 'Осень' }
    ];

    const [genreOptions, setGenreOptions] = React.useState([]);

    const [seasonFilter, setSeasonFilter] = React.useState([]);
    const [genreFilter, setGenreFilter] = React.useState([]);

    const [startDate, setStartDate] = React.useState("");
    const [endDate, setEndDate] = React.useState("");

    const init = ()  => {
        const filterData = {
            seasons: seasonFilter,
            date_performance: [startDate, endDate],
            genres: genreFilter
        };
        dateOfPerformanceService.filter(filterData)
            .then(response => {
                console.log('dateOfPerformance data', response.data);
                setDateOfPerformance(response.data);
            })
            .catch(error => {
                console.error(error)
            })
        dateOfPerformanceService.filterCount(filterData)
            .then(response => {
                console.log('Count', response.data);
                setCount(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }

    React.useEffect(() => {
        genreService.getAllList()
            .then(response => {
                const options = response.data.map(item => ({ value: item.id.toString(), label: item.name }));
                setGenreOptions(options);
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

    const handleSeasonFilterChange = (selectedOptions) => {
        setSeasonFilter(selectedOptions.map(option => option.value));
    };

    const handleGenreFilterChange = (selectedOptions) => {
        setGenreFilter(selectedOptions.map(option => option.value));
    };

    const goBack = () => history.push("/request");

    return (
        <div>
            <h2>Фильтрация спектаклей</h2>
            <Button  style={{ margin: 10 }} variant="secondary" onClick={goBack}>
                Назад
            </Button>
            <Form onSubmit={applyFilters}>
                <Row className="mb-3">
                    <Col>
                        <Form.Label>Сезоны</Form.Label>
                        <Select
                            isMulti
                            options={seasonOptions}
                            onChange={handleSeasonFilterChange}
                            placeholder="Выберите сезоны..."
                        />
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col>
                        <Form.Label>Жанры</Form.Label>
                        <Select
                            isMulti
                            options={genreOptions}
                            onChange={handleGenreFilterChange}
                            placeholder="Выберите жанры..."
                        />
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col>
                        <Form.Label>Дата начала спектакля:</Form.Label>
                        <input type="date" className="form-control" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                    </Col>
                    <Col>
                        <Form.Label>Дата конца спектакля:</Form.Label>
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

            <div className={"table-container"}>
                <h3>Количество результатов: {count}</h3>
                <Table style={{ width: '100%', marginTop: 20, marginRight: 40, marginLeft: 0 }} striped bordered hover variant="dark">
                    <thead >
                    <tr>
                        <th>Название</th>
                        <th>Жанр</th>
                        <th>Сезон</th>
                        <th>Дата спектакля</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        dateOfPerformances.map(obj => (
                            <tr key={obj.id}>
                                <td style={{ fontSize: "14px" }}>{obj.title}</td>
                                <td style={{ fontSize: "14px" }}>{obj.genre}</td>
                                <td style={{ fontSize: "14px" }}>{obj.season}</td>
                                <td style={{ fontSize: "14px" }}>{String(obj.date_perf)}</td>
                            </tr>
                        ))
                    }
                    </tbody>
                </Table>
            </div>
        </div>
    )
}

export default withRouter(Request23Page);