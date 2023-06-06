import React from "react";

import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Col from 'react-bootstrap/Col';
import FormControl from 'react-bootstrap/FormControl';
import InputGroup from 'react-bootstrap/InputGroup';

import { Link } from 'react-router-dom';
import achievementService from '../service/AchievementSerivce';


export default function AchievementPage({

                                    }) {
    const [achievements, setAchievement] = React.useState([]);

    React.useEffect(() => {
        init();
    }, []);


    const init = ()  => {
        achievementService.getAll()
            .then(response => {
                console.log('Achievement data', response.data);
                setAchievement(response.data)
            })
            .catch(error => {
                console.error(error)
            });
    }

    const handleDelete = id => {
        achievementService.remove(id)
            .then(response => {
                console.log('Achievement deleted', response.data);
                init();
            })
            .catch(error => {
                console.log('Something went wrong', error);
            })
    }

    return (
        <div>
            <h2>Звания актёров</h2>
            <div className={"table-container"}>
                <Link to="/achievements/add" style={{ marginLeft: 10, marginTop: 10, color: 'white' }} className="btn btn-dark mb-2">Добавить</Link>
                <Table style={{ width: '100%', marginTop: 20, marginRight: 40, marginLeft: 0 }} striped bordered hover variant="dark">
                    <thead >
                    <tr>
                        <th>ID</th>
                        <th>Дата соревнования</th>
                        <th>Название соревнования</th>
                        <th>Актёр ID</th>
                        <th>Ранг</th>
                        <th>Действия</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        achievements.map(obj => (
                            <tr key={obj.id}>
                                <td style={{ fontSize: "14px" }}>{obj.id}</td>
                                <td style={{ fontSize: "14px" }}>{obj.dateCompetition}</td>
                                <td style={{ fontSize: "14px" }}>{obj.competition}</td>
                                <td style={{ fontSize: "14px" }}>{obj.actorId.id}</td>
                                <td style={{ fontSize: "14px" }}>{obj.rank}</td>
                                <td>
                                    <Link style={{ backgroundColor: "#D10000", borderColor: "#D10000" }} to={`/achievements/edit/${obj.id}`} className='btn btn-danger'>Изменить</Link>
                                    <Link style={{ backgroundColor: "#D10000", borderColor: "#D10000", marginLeft: 10 }} onClick={(e) => { handleDelete(obj.id) }} className='btn btn-danger'>Удалить</Link>
                                </td>
                            </tr>
                        ))
                    }
                    </tbody>
                </Table>
            </div>
        </div>
    )
}