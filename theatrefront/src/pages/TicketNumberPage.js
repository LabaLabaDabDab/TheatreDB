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
import ticketNumberService from "../service/TicketNumberService";

export default function TicketNumberPage({

                                    }) {
    const [ticketNumber, setTicketNumber] = React.useState([]);

    React.useEffect(() => {
        init();
    }, []);


    const init = ()  => {
        ticketNumberService.getAll()
            .then(response => {
                console.log('Role data', response.data);
                setTicketNumber(response.data);
            })
            .catch(error => {
                console.error(error)
            });
    }

    const handleDelete = id => {
        ticketNumberService.remove(id)
            .then(response => {
                console.log('Role deleted', response.data);
                init();
            })
            .catch(error => {
                console.log('Something went wrong', error);
            })
    }

    return (
        <div>
            <h2>Номера билетов</h2>
            <div className={"table-container"}>
                <Link to="/ticket_number/add" style={{ marginLeft: 10, marginTop: 10, color: 'white' }} className="btn btn-dark mb-2">Добавить</Link>
                <Table style={{ width: '100%', marginTop: 20, marginRight: 40, marginLeft: 0 }} striped bordered hover variant="dark">
                    <thead >
                    <tr>
                        <th>ID билетов</th>
                        <th>Номер билета</th>
                        <th>Продан</th>
                        <th>Действия</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        ticketNumber.map(obj => (
                            <tr key={`${obj.id?.ticketId}.${obj.id?.number_ticketId}`}>
                                <td style={{ fontSize: "14px" }}>{obj.id?.ticketId}</td>
                                <td style={{ fontSize: "14px" }}>{obj.id?.number_ticketId}</td>
                                <td style={{ fontSize: "14px" }}>{String(obj.isSold)}</td>
                                <td>
                                    <Link style={{ backgroundColor: "#D10000", borderColor: "#D10000" }} to={`/ticket_number/edit/${obj.id}`} className='btn btn-danger'>Изменить</Link>
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
