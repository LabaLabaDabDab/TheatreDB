import React from 'react';
import { withRouter } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Col from 'react-bootstrap/Col';
import Select from 'react-select';

import performanceService from '../../service/PerformanceService';
import authorService from '../../service/AuthorService';
import countryService from '../../service/CountryService';
import genreService from '../../service/GenreService';

function Request5Page({ history }) {
    const [performances, setPerformances] = React.useState([]);

    const [centuryFilter, setCenturyFilter] = React.useState([]);
    const [startDate, setStartDate] = React.useState("");
    const [endDate, setEndDate] = React.useState("");

    const [authorOptions, setAuthorOptions] = React.useState([]);
    const [authorFilter, setAuthorFilter] = React.useState([]);

    const [countryOptions, setCountryOptions] = React.useState([]);
    const [countryFilter, setCountryFilter] = React.useState([]);

    const [genreOptions, setGenreOptions] = React.useState([]);
    const [genreFilter, setGenreFilter] = React.useState([]);

    const init = () => {
        const filterData = {
            genre: genreFilter,
            author: authorFilter,
            country: countryFilter,
            century: centuryFilter,
            datePerformance: [startDate, endDate]
        };

        performanceService.filter(filterData)
            .then(response => {
                setPerformances(response.data);
            })
            .catch(error => console.error(error));
    };

    React.useEffect(() => {
        authorService.getAllList()
            .then(response => {
                const options = response.data.map(item => ({ value: item.id.toString(), label: item.name }));
                setAuthorOptions(options);
            })
            .catch(error => console.error(error));

        countryService.getAllList()
            .then(response => {
                const options = response.data.map(item => ({ value: item.id.toString(), label: item.name }));
                setCountryOptions(options);
            })
            .catch(error => console.error(error));

        genreService.getAllList()
            .then(response => {
                const options = response.data.map(item => ({ value: item.id.toString(), label: item.name }));
                setGenreOptions(options);
            })
            .catch(error => console.error(error));
    }, []);

    const applyFilters = event => {
        event.preventDefault();
        init();
    };

    const handleAuthorFilterChange = selectedOptions => {
        setAuthorFilter(selectedOptions.map(option => option.value));
    }
    const handleCountryFilterChange = selectedOptions => {
        setCountryFilter(selectedOptions.map(option => option.value));
    }
    const handleGenreFilterChange = selectedOptions => {
        setGenreFilter(selectedOptions.map(option => option.value));
    }

    const handleCenturyFilterChange = (event) => {
        setCenturyFilter(event.target.value.split(',').map(v => v.trim()));
    };

    const goBack = () => history.push("/request");

    return (
        <div>
            <h2>Фильтрация спектаклей по автору</h2>
            <Button  style={{ margin: 10 }} variant="secondary" onClick={goBack}>
                Назад
            </Button>
            <Form onSubmit={applyFilters}>
                <Row className="mb-3">
                    <Col>
                        <Form.Label>Авторы</Form.Label>
                        <Select
                            isMulti
                            options={authorOptions}
                            onChange={handleAuthorFilterChange}
                            placeholder="Выберите авторов..."
                        />
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col>
                        <Form.Label>Страны</Form.Label>
                        <Select
                            isMulti
                            options={countryOptions}
                            onChange={handleCountryFilterChange}
                            placeholder="Выберите страны..."
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
                <Row className="mb-3">
                    <Col>
                        <Form.Label>Век, в котором жил автор:</Form.Label>
                        <Form.Control type="text" placeholder="Введите века через запятую" name="century" onChange={handleCenturyFilterChange} />
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
            <Table striped bordered hover variant="dark">
                <thead>
                <tr>
                    <th>Название</th>
                    <th>Имя автора</th>
                    <th>Жанр</th>
                    <th>Страна</th>
                    <th>Дата рождения автора</th>
                    <th>Дата смерти автора</th>
                    <th>Дата первого исполнения</th>
                </tr>
                </thead>
                <tbody>
                {performances.map((perf, index) => (
                    <tr key={index}>
                        <td>{perf.title}</td>
                        <td>{perf.authorName}</td>
                        <td>{perf.genre}</td>
                        <td>{perf.country}</td>
                        <td>{perf.authorBirth}</td>
                        <td>{perf.authorDeath}</td>
                        <td>{perf.firstPerformanceDate}</td>
                    </tr>
                ))}
                </tbody>
            </Table>
        </div>
    );
}

export default withRouter(Request5Page);
