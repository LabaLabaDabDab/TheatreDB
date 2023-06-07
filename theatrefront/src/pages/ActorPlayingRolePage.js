import React from "react";

import Table from 'react-bootstrap/Table';

import { Link } from 'react-router-dom';
import actorPlayingRoleService from '../service/ActorPlayingRoleService';


export default function ActorPlayingRolePage({
}) {
    const [actorPlayingRole, setActorPlayingRole] = React.useState([]);
    const [currentPage, setCurrentPage] = React.useState(1);
    const [totalPages, setTotalPages] = React.useState(0);
    const [totalElements, setTotalElements] = React.useState(0);

    const recordPerPage = 5;

    React.useEffect(() => {
        init(1);
    }, []);


    const init = (currentPage)  => {
        actorPlayingRoleService.getAll(currentPage - 1, recordPerPage)
            .then(response => {
                console.log('ActorPlayingRole data', response.data);
                setActorPlayingRole(response.data.content);
                setTotalPages(response.data.totalPages);
                setTotalElements(response.data.totalElements);
                setCurrentPage(response.data.number + 1);
                console.log(totalPages);
            })
            .catch(error => {
                console.error(error)
            });
    }

    const handleDelete = id => {
        actorPlayingRoleService.remove(id)
            .then(response => {
                console.log('ActorPlayingRole deleted', response.data);
                init(currentPage);
            })
            .catch(error => {
                console.log('Something went wrong', error);
            })
    }

    const showNextPage = () => {
        console.log(currentPage);
        console.log(totalElements);
        if (currentPage < Math.ceil(totalElements / recordPerPage)) {
            init(currentPage + 1);
        }
        console.log(totalElements);
    };

    const showLastPage = () => {
        if (currentPage < Math.ceil(totalElements / recordPerPage)) {
            init(Math.ceil(totalElements / recordPerPage));
        }
    };

    const showFirstPage = () => {
        let firstPage = 1;
        if (currentPage > firstPage) {
            init(firstPage);
        }
    };

    const showPrevPage = () => {
        let prevPage = 1
        if (currentPage > prevPage) {
            init(currentPage - prevPage);
        }
    };

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
                                <td style={{ fontSize: "14px" }}>{obj.id?.roleId}-{obj.id?.actorId}</td>
                                <td style={{ fontSize: "14px" }}>{obj.role.name}</td>
                                <td style={{ fontSize: "14px" }}>{obj.actor.employee.fio}</td>
                                <td style={{ fontSize: "14px" }}>{String(obj.mainRole)}</td>
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
                <Table className="table" bordered="false">
                    <div style={{ float: 'left', marginLeft: 40, color: '#D10000' }}>
                        Страница {currentPage} из {totalPages}
                    </div>
                    <div style={{ float: 'right', marginRight: 35 }}>
                        <nav>
                            <ul className="pagination">
                                <li className="page-item"><a type="button" className="page-link" disabled={currentPage === totalPages ? true : false} onClick={showNextPage}>Next</a></li>
                                <li className="page-item"><a type="button" className="page-link" disabled={currentPage === 1 ? true : false} onClick={showPrevPage}>Previous</a></li>
                                <li className="page-item"><a type="button" className="page-link" disabled={currentPage === 1 ? true : false} onClick={showFirstPage}>First</a></li>
                                <li className="page-item"><a type="button" className="page-link" disabled={currentPage === totalPages ? true : false} onClick={showLastPage}>Last</a></li>
                            </ul>
                        </nav>
                    </div>
                </Table>
                <Link to="/" style={{ marginLeft: 10, marginTop: 0, color: 'white' }} className="btn btn-dark mb-2">Назад</Link>
            </div>
        </div>
    )
}