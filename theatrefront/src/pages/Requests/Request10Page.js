import React from "react";
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Col from 'react-bootstrap/Col';
import Select from 'react-select';
import { withRouter } from "react-router-dom";

import actorService from "../../service/ActorService";
import producerService from "../../service/ProducerService";
import genreService from "../../service/GenreService";

function ActorPlayedRoleFilterPage({ history }) {
    const [roles, setRoles] = React.useState([]);
    const [count, setCount] = React.useState(0);

    const [actorFilter, setActorFilter] = React.useState([]);
    const [actorOptions, setActorOptions] = React.useState([]);

    const [genreFilter, setGenreFilter] = React.useState([]);
    const [genreOptions, setGenreOptions] = React.useState([]);

    const [producerFilter, setProducerFilter] = React.useState([]);
    const [producerOptions, setProducerOptions] = React.useState([]);

    const [ageLimitFilter, setAgeLimitFilter] = React.useState([]);

    const [startDate, setStartDate] = React.useState("");
    const [endDate, setEndDate] = React.useState("");

    const init = ()  => {
        const filterData = {
            actor: actorFilter,
            dateOfPlaying: [startDate, endDate],
            genre: genreFilter,
            producer: producerFilter,
            ageLimit: ageLimitFilter
        };
        setRoles([]);
        actorService.filterRoles(filterData)
            .then(response => {
                setRoles(response.data);
            })
            .catch(error => {
                console.error(error)
            });

        actorService.filterRolesCount(filterData)
            .then(response => {
                setCount(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    };

    React.useEffect(() => {
        genreService.getAllList()
            .then(response => {
                const options = response.data.map(item => ({ value: item.id.toString(), label: item.name }));
                setGenreOptions(options);
            })
            .catch(error => console.error(error));

        actorService.getAllList()
            .then(response => {
                const options = response.data.map(item => ({ value: item.id.toString(), label: item.employee.fio }));
                setActorOptions(options);
            })
            .catch(error => console.error(error));

        producerService.getAllList()
            .then(response => {
                const options = response.data.map(item => ({ value: item.id.toString(), label: item.employee.fio }));
                setProducerOptions(options);
            })
            .catch(error => console.error(error));
    }, []);


    const handleActorFilterChange = selectedOptions => {
        setActorFilter(selectedOptions.map(option => option.value));
    }
    const handleProducerFilterChange = selectedOptions => {
        setProducerFilter(selectedOptions.map(option => option.value));
    }
    const handleGenreFilterChange = selectedOptions => {
        setGenreFilter(selectedOptions.map(option => option.value));
    }

    const goBack = () => history.push("/request");

    const applyFilters = event => {
        event.preventDefault();
        init();
    };

    return (
        <div>
            <h2>Фильтрация</h2>
            <Button style={{ margin: 10 }} variant="secondary" onClick={goBack}>
                Назад
            </Button>
            <Form onSubmit={applyFilters}>
                <Row>
                    <Col>
                        <label>Актеры:</label>
                        <Select
                            isMulti
                            name="actors"
                            options={actorOptions}
                            onChange={handleActorFilterChange}
                        />
                    </Col>
                    <Col>
                        <label>Продюсеры:</label>
                        <Select
                            isMulti
                            name="producers"
                            options={producerOptions}
                            onChange={handleProducerFilterChange}
                        />
                    </Col>
                    <Col>
                        <label>Жанры:</label>
                        <Select
                            isMulti
                            name="genres"
                            options={genreOptions}
                            onChange={handleGenreFilterChange}
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
                        <label>Возрастное ограничение:</label>
                        <Form.Control type="number" value={ageLimitFilter} onChange={(e) => setAgeLimitFilter(e.target.value)} />
                    </Col>
                </Row>
                <Button style={{ margin: 10 }} variant="primary" type="submit">
                    Применить фильтры
                </Button>
            </Form>
            <div className={"table-container"}>
                <h3>Количество сыгранных ролей актёром: {count}</h3>
                <Table style={{ width: '100%', marginTop: 20, marginRight: 40, marginLeft: 0 }} striped bordered hover variant="dark">
                    <thead>
                    <tr>
                        <th>Имя актера</th>
                        <th>Имя роли</th>
                        <th>Название представления</th>
                        <th>Жанр</th>
                        <th>Ограничение по возрасту</th>
                        <th>Дата представления</th>
                        <th>Продюсер</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        roles.map(obj => (
                            <tr key={obj.roleName}>
                                <td>{obj.actorName}</td>
                                <td>{obj.roleName}</td>
                                <td>{obj.performanceTitle}</td>
                                <td>{obj.genre}</td>
                                <td>{obj.ageLimit}</td>
                                <td>{String(obj.dateOfPerformance)}</td>
                                <td>{obj.producerName}</td>
                            </tr>
                        ))
                    }
                    </tbody>
                </Table>
            </div>
        </div>
    )
}

export default withRouter(ActorPlayedRoleFilterPage);
