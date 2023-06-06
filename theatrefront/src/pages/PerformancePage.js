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
import performanceService from "../service/PerformanceService";

export default function MusicianPage({

                                     }) {
    const [performance, setPerformance] = React.useState([]);

    React.useEffect(() => {
        init();
    }, []);


    const init = ()  => {
        performanceService.getAll()
            .then(response => {
                console.log('Director data', response.data);
                setPerformance(response.data);
            })
            .catch(error => {
                console.error(error)
            });
    }

    const handleDelete = id => {
        performanceService.remove(id)
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
            <h2>Представления</h2>
            <div className={"table-container"}>
                <Link to="/performance/add" style={{ marginLeft: 10, marginTop: 10, color: 'white' }} className="btn btn-dark mb-2">Добавить</Link>
                <Table style={{ width: '100%', marginTop: 20, marginRight: 40, marginLeft: 0 }} striped bordered hover variant="dark">
                    <thead >
                    <tr>
                        <th>ID</th>
                        <th>Возрастной рейтинг</th>
                        <th>Дата премьеры</th>
                        <th>Автор</th>
                        <th>Продолжительность</th>
                        <th>Директор</th>
                        <th>Музыкант</th>
                        <th>Продюсер</th>
                        <th>Действия</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        performance.map(obj => (
                            <tr key={obj.id}>
                                <td style={{ fontSize: "14px" }}>{obj.id}</td>
                                <td style={{ fontSize: "14px" }}>{obj.ageLimit}</td>
                                <td style={{ fontSize: "14px" }}>{obj.premiereDate}</td>
                                <td style={{ fontSize: "14px" }}>{obj.author.id}</td>
                                <td style={{ fontSize: "14px" }}>{obj.timeDuration}</td>
                                <td style={{ fontSize: "14px" }}>{obj.director.id}</td>
                                <td style={{ fontSize: "14px" }}>{obj.musician.id}</td>
                                <td style={{ fontSize: "14px" }}>{obj.producer.id}</td>
                                <td>
                                    <Link style={{ backgroundColor: "#D10000", borderColor: "#D10000" }} to={`/performance/edit/${obj.id}`} className='btn btn-danger'>Изменить</Link>
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
