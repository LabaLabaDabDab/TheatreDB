import React from 'react';
import { withRouter } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Col from 'react-bootstrap/Col';
import Select from 'react-select';

import authorService from '../../service/AuthorService';
import countryService from '../../service/CountryService';
import genreService from '../../service/GenreService';

function Request4Page({ history }) {
    const [authors, setAuthors] = React.useState([]);

    const [centuryFilter, setCenturyFilter] = React.useState([]);

    const [startDate, setStartDate] = React.useState("");
    const [endDate, setEndDate] = React.useState("");

    const [countryOptions, setCountryOptions] = React.useState([]);
    const [countryFilter, setCountryFilter] = React.useState([]);

    const [genreOptions, setGenreOptions] = React.useState([]);
    const [genreFilter, setGenreFilter] = React.useState([]);

    const init = () => {
        const filterData = {
            century: centuryFilter,
            date_performance: [startDate, endDate],
            country: countryFilter,
            genre: genreFilter
        };

        authorService.filter(filterData)
            .then(response => {
                setAuthors(response.data);
            })
            .catch(error => console.error(error));
    };

    React.useEffect(() => {
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
            <h2>Фильтрация авторов</h2>
            <Button  style={{ margin: 10 }} variant="secondary" onClick={goBack}>
                Назад
            </Button>
            <Form onSubmit={applyFilters}>
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
                    <th>Имя</th>
                    <th>Название</th>
                    <th>Страна</th>
                    <th>Жанр</th>
                    <th>Дата рождения</th>
                    <th>Дата смерти</th>
                    <th>Дата постановки</th>
                </tr>
                </thead>
                <tbody>
                {authors.map((author, index) => (
                    <tr key={index}>
                        <td>{author.name}</td>
                        <td>{author.title}</td>
                        <td>{author.country}</td>
                        <td>{author.genre}</td>
                        <td>{author.birthDate}</td>
                        <td>{author.deathDate}</td>
                        <td>{author.date_perf}</td>
                    </tr>
                ))}
                </tbody>
            </Table>
        </div>
    );
}

export default withRouter(Request4Page);
