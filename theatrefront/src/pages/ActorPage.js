import React from "react";

import Table from 'react-bootstrap/Table';

import { Link } from 'react-router-dom';
import actorService from "../service/ActorService";

export default function ActorPage({
}) {
    const [actors, setActor] = React.useState([]);
    const [currentPage, setCurrentPage] = React.useState(1);
    const [totalPages, setTotalPages] = React.useState(0);
    const [totalElements, setTotalElements] = React.useState(0);

    const recordPerPage = 5;

    React.useEffect(() => {
        init(1);
    }, []);


    const init = (currentPage)  => {
        actorService.getAll(currentPage - 1, recordPerPage)
            .then(response => {
                console.log('Actor data', response.data);
                setActor(response.data.content);
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
        actorService.remove(id)
            .then(response => {
                console.log('Actor deleted', response.data);
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

    //Show Last Page
    const showLastPage = () => {
        if (currentPage < Math.ceil(totalElements / recordPerPage)) {
            init(Math.ceil(totalElements / recordPerPage));
        }
    };

    //Show First page
    const showFirstPage = () => {
        let firstPage = 1;
        if (currentPage > firstPage) {
            init(firstPage);
        }
    };

    //Show previous page
    const showPrevPage = () => {
        let prevPage = 1
        if (currentPage > prevPage) {
            init(currentPage - prevPage);
        }
    };


    return (
        <div>
            <h2>Актёры</h2>
            <div className={"table-container"}>
                <Link to="/achievement/add" style={{ marginLeft: 10, marginTop: 10, color: 'white' }} className="btn btn-dark mb-2">Добавить</Link>
                <Table style={{ width: '100%', marginTop: 20, marginRight: 40, marginLeft: 0 }} striped bordered hover variant="dark">
                    <thead >
                    <tr>
                        <th>ID</th>
                        <th>Работник</th>
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
                                <td style={{ fontSize: "14px" }}>{obj.employee.fio}</td>
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
