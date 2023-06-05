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
import dateOfPerformanceService from "../service/DateOfPerformanceService";

export default function DateOfPlayingPage({

                                          }) {
    const [dateOfPerformance, setDateOfPerformance] = React.useState([]);

    React.useEffect(() => {
        init();
    }, []);


    const init = ()  => {
        dateOfPerformanceService.getAll()
            .then(response => {
                console.log('Author data', response.data);
                setDateOfPerformance(response.data);
            })
            .catch(error => {
                console.error(error)
            });
    }

    const handleDelete = id => {
        dateOfPerformanceService.remove(id)
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
            <h2>Даты проведения</h2>
            <div className={"table-container"}>
                <Link to="/achievement/add" style={{ marginLeft: 10, marginTop: 10, color: 'white' }} className="btn btn-dark mb-2">Добавить</Link>
                <Table style={{ width: '100%', marginTop: 20, marginRight: 40, marginLeft: 0 }} striped bordered hover variant="dark">
                    <thead >
                    <tr>
                        <th>ID даты</th>
                        <th>ID представления</th>
                        <th>Действия</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        dateOfPerformance.map(obj => (
                            <tr key={`${obj.id?.dateId}.${obj.id?.performanceId}`}>
                                <td style={{ fontSize: "14px" }}>{obj.date.id}</td>
                                <td style={{ fontSize: "14px" }}>{obj.performance.id}</td>

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
