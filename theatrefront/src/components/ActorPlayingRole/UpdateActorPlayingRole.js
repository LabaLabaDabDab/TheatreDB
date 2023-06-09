import { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import actorService from "../../service/ActorService";
import roleService from "../../service/RoleService";
import actorPlayingRoleService from "../../service/ActorPlayingRoleService";

const UpdateActorPlayingRole = () => {
    const [role, setRole] = useState("");
    const [actor, setActor] = useState("");
    const [mainRole, setMainRole] = useState(false);
    const [date, setDate] = useState();

    const [roles, setRoles] = useState([]);
    const [actors, setActors] = useState([]);

    let { id } = useParams();
    const [actorId, roleId] = id.split('.');

    const history = useHistory();

    const saveActorPlayingRole = (e) => {
        e.preventDefault();

        const ActorPlayingRole  = {
            role: {id: Number(role)},
            actor: {id: Number(actor)},
            mainRole,
            date
        };

        actorPlayingRoleService.update(actorId, roleId, ActorPlayingRole)
            .then(response => {
                console.log('ActorPlayingRole updated', response.data);
                history.push('/actor_playing_role');
            })
            .catch(error => {
                console.log('Something went wrong', error);
            });
    }

    useEffect(() => {
        if (id) {
            const [actorId, roleId] = id.split('.');
            actorPlayingRoleService.get(actorId, roleId)
                .then(response => {
                    const actorPlayingRole = response.data;
                    const tempRole = actorPlayingRole.role.id;
                    const tempActor = actorPlayingRole.actor.id;
                    setMainRole(actorPlayingRole.mainRole);
                    setDate(actorPlayingRole.date);

                    roleService.getAllList()
                        .then(response => {
                            console.log(response.data);
                            setRoles(response.data);
                            setRole(tempRole);
                        })
                        .catch(error => {
                            console.log('Something went wrong', error);
                        });

                    actorService.getAllList()
                        .then(response => {
                            console.log(response.data);
                            setActors(response.data);
                            setActor(tempActor);
                        })
                        .catch(error => {
                            console.log('Something went wrong', error);
                        });
                })
                .catch(error => {
                    console.log('Something went wrong', error);
                });
        } else {
            roleService.getAllList()
                .then(response => {
                    console.log(response.data);
                    setRoles(response.data);
                })
                .catch(error => {
                    console.log('Something went wrong', error);
                });
            actorService.getAllList()
                .then(response => {
                    console.log(response.data);
                    setActors(response.data);
                })
                .catch(error => {
                    console.log('Something went wrong', error);
                });
        }
    }, []);


    return (
        <div className="container">
            <h3 style={{ marginTop: 20, marginBottom: 20, marginLeft: 2 }}>Обновить роли актёров</h3>
            <form>
                <div className="form-group">
                    <label style={{ marginBottom: 10, width: 600 }}>Выберите актёра:</label>
                    <select
                        style={{ marginBottom: 10, width: 600 }}
                        className="form-control col-4"
                        id="actor"
                        value={actor}
                        onChange={(e) => setActor(Number(e.target.value))}>
                        {
                            actors && actors.map((actor) => (
                                <option key={actor.id} value={actor.id.toString()}>
                                    {actor.employee.fio}
                                </option>
                            ))
                        }
                    </select>
                </div>
                <div className="form-group">
                    <label style={{ marginBottom: 10, width: 600 }}>Выберите роль:</label>
                    <select
                        style={{ marginBottom: 10, width: 600 }}
                        className="form-control col-4"
                        id="role"
                        value={role}
                        onChange={(e) => setRole(Number(e.target.value))}>
                        {
                            roles && roles.map((role) => (
                                <option key={role.id} value={role.id.toString()}>
                                    {role.name}
                                </option>
                            ))
                        }
                    </select>
                </div>
                <div className="form-group">
                    <label style={{ marginBottom: 10, width: 600 }}>Выберите дату, когда актёр играет свою роль:</label>
                    <input onChange={e => setDate(e.target.value)}
                           type="date"
                           className="form-control col-4"
                           id="date"
                           value={date}
                           placeholder="Введите дату"
                    />
                </div>
                <div className="form-group">
                    <label style={{ marginBottom: 10, width: 600 }}>Выберите является ли роль главной:</label>
                    <select onChange={e => setMainRole(e)}
                            className="form-control col-4"
                            id="mainRole"
                            value={mainRole}>
                        <option value={true}>True</option>
                        <option value={false}>False</option>
                    </select>
                </div>
                <div>
                    <button style={{ marginTop: 20, color: 'white' }} className="btn btn-dark mb-2"
                            onClick={(e) => saveActorPlayingRole(e)}>
                        Сохранить
                    </button>
                    <Link to="/actor_playing_role" style={{ marginLeft: 40, marginTop: 20, color: 'white' }} className="btn btn-dark mb-2 ">Назад</Link>
                </div>
            </form>

        </div>
    );
}

export default UpdateActorPlayingRole;