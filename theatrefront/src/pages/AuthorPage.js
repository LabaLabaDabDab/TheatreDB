import React, { useState, useEffect, useCallback } from "react";
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';
import authorService from '../service/AuthorService';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function AuthorPage() {
    const [authors, setAuthors] = useState([]);
    const [filteredAuthors, setFilteredAuthors] = useState([]);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [filter, setFilter] = useState({
        century: [],
        date_performance: [],
        country: [],
        genre: []
    });

    const init = useCallback(() => {
        authorService.getAll()
            .then(response => {
                console.log('Country data', response.data);
                setAuthors(response.data)
            })
            .catch(error => {
                console.error(error)
            });
    }, [setAuthors]);


    useEffect(() => {
        init();
    }, []);


    const handleDelete = id => {
        authorService.remove(id)
            .then(response => {
                console.log('Author deleted', response.data);
                init();
            })
            .catch(error => {
                console.log('Something went wrong', error);
            })
    };

    const handleFilterChange = e => {
        const { name, value } = e.target;
        setFilter(prevFilter => ({
            ...prevFilter,
            [name]: value
        }));
    };

    const handleStartDateChange = date => {
        setStartDate(date);
    };

    const handleEndDateChange = date => {
        setEndDate(date);
    };

    const handleSubmitFilter = e => {
        e.preventDefault();
        init();
    };

    const filterAuthors = useCallback(() => {
        const filtered = authors.filter(obj => {
            const matchCentury = filter.century.length === 0 || filter.century.includes(obj.century);
            const matchCountry = filter.country.length === 0 || filter.country.includes(obj.country);
            const matchGenre = filter.genre.length === 0 || filter.genre.includes(obj.genre);

            // Проверяем, что дата рождения и дата смерти лежат в диапазоне между startDate и endDate
            const matchBirthDate = !startDate || !endDate || (Date.parse(obj.birthDate) >= Date.parse(startDate) && Date.parse(obj.birthDate) <= Date.parse(endDate));
            const matchDeathDate = !startDate || !endDate || (Date.parse(obj.deathDate) >= Date.parse(startDate) && Date.parse(obj.deathDate) <= Date.parse(endDate));

            return matchCentury && matchCountry && matchGenre && matchBirthDate && matchDeathDate;
        });
        setFilteredAuthors(filtered);
    }, [authors, filter, startDate, endDate]);



    return (
        <div>
            <h2>Авторы</h2>
            <div className="table-container">
                <Link to="/actors/add" style={{ marginLeft: 10, marginTop: 10, color: 'white' }} className="btn btn-dark mb-2">Добавить автора</Link>
                <Table style={{ width: '100%', marginTop: 20, marginRight: 40, marginLeft: 0 }} striped bordered hover variant="dark">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Имя</th>
                        <th>Страна</th>
                        <th>Жанр</th>
                        <th>Дата рождения</th>
                        <th>Дата смерти</th>
                        <th>Название произведения</th>
                        <th>Действия</th>
                    </tr>
                    </thead>
                    <tbody>
                    {authors.map(obj => (
                        <tr key={obj.id}>
                            <td style={{ fontSize: "20px" }}>{obj.id}</td>
                            <td style={{ fontSize: "20px" }}>{obj.name}</td>
                            <td style={{ fontSize: "20px" }}>{obj.country.id}</td>
                            <td style={{ fontSize: "20px" }}>{obj.genre.id}</td>
                            <td style={{ fontSize: "20px" }}>{obj.birthDate}</td>
                            <td style={{ fontSize: "20px" }}>{obj.deathDate}</td>
                            <td style={{ fontSize: "20px" }}>{obj.title}</td>
                            <td>
                                <Link style={{ backgroundColor: "#D10000", borderColor: "#D10000" }} to={`/country/edit/${obj.id}`} className='btn btn-danger'>Изменить</Link>
                                <Link style={{ backgroundColor: "#D10000", borderColor: "#D10000", marginLeft: 10 }} onClick={() => handleDelete(obj.id)} className='btn btn-danger'>Удалить</Link>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
                <Form style={{ marginTop: 10, marginRight: 10, marginLeft: 10 }} onSubmit={handleSubmitFilter}>
                    <Form.Group as={Row} controlId="formCentury">
                        <Form.Label column sm={2}>Век</Form.Label>
                        <Col sm={10}>
                            <Form.Control type="text" name="century" value={filter.century} onChange={handleFilterChange} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="formStartDate">
                        <Form.Label column sm={2}>Дата начала</Form.Label>
                        <Col sm={10}>
                            <DatePicker
                                selected={startDate}
                                onChange={handleStartDateChange}
                                dateFormat="yyyy.MM.dd"
                                className="form-control"
                            />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="formEndDate">
                        <Form.Label column sm={2}>Дата окончания</Form.Label>
                        <Col sm={10}>
                            <DatePicker
                                selected={endDate}
                                onChange={handleEndDateChange}
                                dateFormat="yyyy.MM.dd"
                                className="form-control"
                            />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="formCountry">
                        <Form.Label column sm={2}>Страна</Form.Label>
                        <Col sm={10}>
                            <Form.Control type="text" name="country" value={filter.country} onChange={handleFilterChange} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="formGenre">
                        <Form.Label column sm={2}>Жанр</Form.Label>
                        <Col sm={10}>
                            <Form.Control type="text" name="genre" value={filter.genre} onChange={handleFilterChange} />
                        </Col>
                    </Form.Group>
                    <Button type="submit">Фильтровать</Button>
                </Form>
                <h2>Отфильтрованные значения</h2>
                <div className="table-container">
                    <Table style={{ width: '100%', marginTop: 20, marginRight: 40, marginLeft: 0 }} striped bordered hover variant="dark">
                        <thead>
                        <tr>
                            <th>Имя</th>
                            <th>Название произведения</th>
                            <th>Страна</th>
                            <th>Жанр</th>
                            <th>Дата рождения</th>
                            <th>Дата смерти</th>
                            <th>Дата выступления</th>
                        </tr>
                        </thead>
                        <tbody>
                        {filteredAuthors.map(obj => (
                            <tr key={obj.id}>
                                <td>{obj.name}</td>
                                <td>{obj.title}</td>
                                <td>{obj.country}</td>
                                <td>{obj.genre}</td>
                                <td>{obj.birthDate}</td>
                                <td>{obj.deathDate}</td>
                                <td>{obj.date_perf}</td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                </div>
            </div>
        </div>
    );
}
