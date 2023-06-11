import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import actorService from '../../service/ActorService';

function ActorRolePage({ history }) {
    const [actorRoles, setActorRoles] = useState([]);

    useEffect(() => {
        fetchActorRoles();
    }, []);

    const fetchActorRoles = () => {
        actorService.getAllActorRoles()
            .then(response => {
                setActorRoles(response.data);
            })
            .catch(error => console.error(error));
    };

    const goBack = () => history.push("/request");

    return (
        <div>
            <h2>Список актёров, подходящих на роль</h2>
            <Button  style={{ margin: 10 }} variant="secondary" onClick={goBack}>
                Назад
            </Button>
            <Table striped bordered hover variant="dark">
                <thead>
                <tr>
                    <th>Имя актёра</th>
                    <th>Имя роли</th>
                </tr>
                </thead>
                <tbody>
                {actorRoles.map((actorRole, index) => (
                    <tr key={index}>
                        <td>{actorRole.actorName}</td>
                        <td>{actorRole.roleName}</td>
                    </tr>
                ))}
                </tbody>
            </Table>
        </div>
    );
}

export default withRouter(ActorRolePage);
