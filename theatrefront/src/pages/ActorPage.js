import React from "react";

import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Col from 'react-bootstrap/Col';
import FormControl from 'react-bootstrap/FormControl';
import InputGroup from 'react-bootstrap/InputGroup';
import Spinner from 'react-bootstrap/Spinner';

import { Link } from 'react-router-dom';
import actorService from "../service/ActorService";

export default function ActorPage({

                                   }) {
    const [actors, setActor] = React.useState([]);

    React.useEffect(() => {
        init();
    }, []);


    const init = ()  => {
        actorService.getAll()
            .then(response => {
                console.log('Author data', response.data);
                setActor(response.data);
            })
            .catch(error => {
                console.error(error)
            });
    }

    const handleDelete = id => {
        actorService.remove(id)
            .then(response => {
                console.log('Actor deleted', response.data);
                init();
            })
            .catch(error => {
                console.log('Something went wrong', error);
            })
    }



    return (
        <div>
            <h2>Актёры</h2>
            <div className={"table-container"}>
                <Link to="/achievement/add" style={{ marginLeft: 10, marginTop: 10, color: 'white' }} className="btn btn-dark mb-2">Добавить</Link>
                <Table style={{ width: '100%', marginTop: 20, marginRight: 40, marginLeft: 0 }} striped bordered hover variant="dark">
                    <thead >
                    <tr>
                        <th>ID</th>
                        <th>Работник ID</th>
                        <th>Студент</th>
                        <th>Рост</th>
                        <th>Действия</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        actors.map(obj => (
                            <tr key={obj.id}>
                                <td style={{ fontSize: "14px" }}>{obj.id}</td>
                                <td style={{ fontSize: "14px" }}>{obj.employee.id}</td>
                                <td style={{ fontSize: "14px" }}>{String(obj.student)}</td>
                                <td style={{ fontSize: "14px" }}>{obj.height}</td>
                                <td>
                                    <Link style={{ backgroundColor: "#D10000", borderColor: "#D10000" }} to={`/actors/edit/${obj.id}`} className='btn btn-danger'>Изменить</Link>
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
