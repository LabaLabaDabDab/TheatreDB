import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import actorService from '../../service/ActorService';
import achievementService from "../../service/AchievementService";
import genderService from "../../service/GenderService";

import Select from 'react-select';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";

function Request7Page({ history }) {
    const [actorAchievements, setActorAchievements] = useState([]);
    const [count, setCount] = React.useState(0);

    const [startDate, setStartDate] = React.useState("");
    const [endDate, setEndDate] = React.useState("");

    const [competitionOptions, setCompetitionOptions] = React.useState([]);
    const [competitionFilter, setCompetitionFilter] = React.useState([]);

    const [rankOptions, setRankOptions] = React.useState([]);
    const [rankFilter, setRankFilter] = React.useState([]);

    const [genderOptions, setGenderOptions] = React.useState([]);
    const [genderFilter, setGenderFilter] = React.useState([]);

    const [startBirthDate, setStartBirthDate] = React.useState("");
    const [endBirthDate, setEndBirthDate] = React.useState("");

    const init = ()  => {
        const filterData = {
            dateCompetition: [startDate, endDate],
            competition: competitionFilter,
            rank: rankFilter,
            gender: genderFilter,
            birthDate: [startBirthDate, endBirthDate]
        };
        actorService.filter(filterData)
            .then(response => {
                console.log('Actor data', response.data);
                setActorAchievements(response.data);
            })
            .catch(error => {
                console.error(error)
            })
        actorService.filterCount(filterData)
            .then(response => {
                console.log('Count', response.data);
                setCount(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }

    React.useEffect(() => {
        genderService.getAllList()
            .then(response => {
                const options = response.data.map(item => ({ value: item.id.toString(), label: item.type }));
                setGenderOptions(options);
                console.log(options);
            })
            .catch(error => {
                console.error(error)
            });
    }, []);

    React.useEffect(() => {
        achievementService.getAllRankAndCompetition()
            .then(response => {
                const competitionOptions = response.data.competitions.map(item => ({ value: item, label: item }));
                const rankOptions = response.data.ranks.map(item => ({ value: item, label: item }));

                setCompetitionOptions(competitionOptions);
                setRankOptions(rankOptions);
            })
            .catch(error => {
                console.error(error)
            });
    }, []);

    const applyFilters = (event) => {
        init();
        event.preventDefault();
    };

    const handleCompetitionFilterChange = (selectedOptions) => {
        setCompetitionFilter(selectedOptions.map(option => option.value));
    };

    const handleRankFilterChange = (selectedOptions) => {
        setRankFilter(selectedOptions.map(option => option.value));
    };

    const handleGenderFilterChange = (selectedOptions) => {
        setGenderFilter(selectedOptions.map(option => option.value));
    };

    const goBack = () => history.push("/request");

    return (
        <div>
            <h2>Список достижений актёров</h2>
            <Button  style={{ margin: 10 }} variant="secondary" onClick={goBack}>
                Назад
            </Button>
            <div>
                <Form onSubmit={applyFilters}>
                    <Row className="mb-3">
                        <Col>
                            <Form.Label>Соревнование</Form.Label>
                            <Select
                                isMulti
                                options={competitionOptions}
                                onChange={handleCompetitionFilterChange}
                                placeholder="Выберите соревнования..."
                            />
                        </Col>
                    </Row>
                    <Row className="mb-3">
                        <Col>
                            <Form.Label>Ранг</Form.Label>
                            <Select
                                isMulti
                                options={rankOptions}
                                onChange={handleRankFilterChange}
                                placeholder="Выберите ранги..."
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
                            <Form.Label>Даты соревнований от:</Form.Label>
                            <input type="date" className="form-control" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                        </Col>
                        <Col>
                            <Form.Label>до:</Form.Label>
                            <input type="date" className="form-control" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                        </Col>
                    </Row>
                    <Row className="mb-3">
                        <Col>
                            <Form.Label>Даты рождения актёра от:</Form.Label>
                            <input type="date" className="form-control" value={startBirthDate} onChange={(e) => setStartBirthDate(e.target.value)} />
                        </Col>
                        <Col>
                            <Form.Label>до:</Form.Label>
                            <input type="date" className="form-control" value={endBirthDate} onChange={(e) => setEndBirthDate(e.target.value)} />
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
            <h3>Количество результатов: {count}</h3> {}
            <Table style={{ width: '100%', marginTop: 20, marginRight: 40, marginLeft: 0 }} striped bordered hover variant="dark">
                <thead>
                <tr>
                    <th>ФИО</th>
                    <th>Пол</th>
                    <th>Соревнование</th>
                    <th>Дата соревнования</th>
                    <th>Ранг</th>
                    <th>Дата рождения</th>
                </tr>
                </thead>
                <tbody>
                {actorAchievements.map((actorAchievement, index) => (
                    <tr key={index}>
                        <td>{actorAchievement.fio}</td>
                        <td>{actorAchievement.gender}</td>
                        <td>{actorAchievement.competition}</td>
                        <td>{new Date(actorAchievement.dateCompetition).toLocaleDateString()}</td>
                        <td>{actorAchievement.rank}</td>
                        <td>{new Date(actorAchievement.birthDate).toLocaleDateString()}</td>
                    </tr>
                ))}
                </tbody>
            </Table>
        </div>
    );
}

export default withRouter(Request7Page);
