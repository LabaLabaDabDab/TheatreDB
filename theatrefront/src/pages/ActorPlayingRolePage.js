import React from "react";

import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Col from 'react-bootstrap/Col';
import FormControl from 'react-bootstrap/FormControl';
import InputGroup from 'react-bootstrap/InputGroup';

import { Link } from 'react-router-dom';
import actorPlayingRoleService from '../service/ActorPlayingRoleService';


export default function ActorPlayingRolePage({

                                        }) {
    const [actorPlayingRole, setActorPlayingRole] = React.useState([]);

    React.useEffect(() => {
        init();
    }, []);


    const init = ()  => {
        actorPlayingRoleService.getAll()
            .then(response => {
                console.log('ActorPlayingRole data', response.data);
                setActorPlayingRole(response.data)
            })
            .catch(error => {
                console.error(error)
            });
    }

    const handleDelete = id => {
        actorPlayingRoleService.remove(id)
            .then(response => {
                console.log('ActorPlayingRole deleted', response.data);
                init();
            })
            .catch(error => {
                console.log('Something went wrong', error);
            })
    }

    return (
        <div>
            <h2>Актёры и их роли</h2>
            <div className={"table-container"}>
                <Link to="/achievement/add" style={{ marginLeft: 10, marginTop: 10, color: 'white' }} className="btn btn-dark mb-2">Добавить</Link>
                <Table style={{ width: '100%', marginTop: 20, marginRight: 40, marginLeft: 0 }} striped bordered hover variant="dark">
                    <thead >
                    <tr>
                        <th>ID</th>
                        <th>Роль</th>
                        <th>Актёр</th>
                        <th>Главная роль</th>
                        <th>Дата игры</th>
                        <th>Действия</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        actorPlayingRole.map(obj => (
                            <tr key={`${obj.id?.actorId}.${obj.id?.roleId}`}>
                                <td style={{ fontSize: "14px" }}>{obj.id?.actorId}-{obj.id?.roleId}</td>
                                <td style={{ fontSize: "14px" }}>{obj.role.id}</td>
                                <td style={{ fontSize: "14px" }}>{obj.actor.id}</td>
                                <td style={{ fontSize: "14px" }}>{String(obj.main)}</td>
                                <td style={{ fontSize: "14px" }}>{obj.date}</td>
                                <td>
                                    <Link style={{ backgroundColor: "#D10000", borderColor: "#D10000" }} to={`/country/edit/${obj.id}`} className='btn btn-danger'>Изменить</Link>
                                    <Link style={{ backgroundColor: "#D10000", borderColor: "#D10000", marginLeft: 10 }} onClick={(e) => { handleDelete(obj.id.actorId, obj.id.roleId) }} className='btn btn-danger'>Удалить</Link>
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