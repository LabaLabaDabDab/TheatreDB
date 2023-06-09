import {Link, useHistory, useParams} from "react-router-dom";
import { useState, useEffect } from "react";
import actorService from "../../service/ActorService";
import roleService from "../../service/RoleService";
import actorPlayingRoleService from "../../service/ActorPlayingRoleService";

const AddActorTour = () => {
    const [role, setRole] = useState("");
    const [actor, setActor] = useState("");
    const [mainRole, setMainRole] = useState(false);
    const [date, setDate] = useState();

    const [roles, setRoles] = useState([]);
    const [actors, setActors] = useState([]);

    const [roleDirty, setRoleDirty] = useState(false);
    const [actorDirty, setActorDirty] = useState(false);
    const [mainRoleDirty, setMainRoleDirty] = useState(false);
    const [dateDirty, setDateDirty] = useState(false);

    const [roleError, setRoleError] = useState('Поле не может быть пустым');
    const [actorError, setActorError] = useState('Поле не может быть пустым');
    const [mainRoleError, setMainRoleError] = useState('Поле не может быть пустым');
    const [dateError, setDateError] = useState('Поле не может быть пустым');

    const [formValid, setFormValid] = useState(false);

    const history = useHistory();

    let { id } = useParams();

    useEffect(() => {
        init();
    }, []);

    const init = () => {
        actorService.getAllList()
            .then(response => {
                console.log(response.data);
                setActors(response.data);
            })
            .catch(error => {
                console.log('Something went wrong', error);
            })
        roleService.getAllList()
            .then(response => {
                console.log(response.data);
                setRoles(response.data);
            })
            .catch(error => {
                console.log('Something went wrong', error);
            })
    }

    useEffect(() => {
        if (roleError || actorError || mainRoleError || dateError) {
            setFormValid(false)
        } else {
            setFormValid(true)
        }
    }, [roleError, actorError, mainRoleError, dateError])


    const blurHandler = (e) => {
        switch (e.target.name) {
            case 'role':
                setRoleDirty(true)
                break
            case 'actor':
                setActorDirty(true)
                break
            case 'mainRole':
                setMainRoleDirty(true)
                break
            case 'date':
                setDateDirty(true)
                break
        }
    }

    const DateHandler = (e) => {
        setDate(e.target.value)
        if (!e.target.value || e.target.value === '')
            setDateError('Поле не может быть пустым')
        else setDateError('')
    }

    const actorHandler = (value) => {
        setActor(value)
        if (!value)
            setActorError('Поле не может быть пустым')
        else setActorError('')
    }

    const roleHandler = (value) => {
        setRole(value)
        if (!value)
            setRoleError('Поле не может быть пустым')
        else setRoleError('')
    }

    const mainRoleHandler = (e) => {
        setMainRole(JSON.parse(e.target.value))
        setMainRoleError('')
    }

    const saveActorPlayingRole = (e) => {
        e.preventDefault();
        const ActorPlayingRole  = {
            role: {id: Number(role)},
            actor: {id: Number(actor)},
            mainRole,
            date,
            id: { actorId: Number(actor), roleId: Number(role) }
        };

        console.log(ActorPlayingRole);
        actorPlayingRoleService.create(ActorPlayingRole)
            .then(response => {
                console.log('ActorPlayingRole created', response.data);
                history.push('/actor_playing_role');
            })
            .catch(error => {
                console.log('Something went wrong', error);
            });
    };

    return (
        <div className="container">
            <h3 style={{ marginTop: 20, marginBottom: 20, marginLeft: 2 }}>Добавить роль актёру</h3>
            <form>
                <div>
                    <select
                        onChange={e => actorHandler(Number(e.target.value))}
                        style={{ marginBottom: 10, width:600 }}
                        className='form-select'
                        id="actor">
                        <option>Выберите актёра:</option>
                        {
                            actors && actors.map((actor) => (
                                <option key={actor.id} value={actor.id.toString()}>
                                    {actor.employee.fio}
                                </option>
                            ))
                        }
                    </select>
                </div>
                <div>
                    <select
                        onChange={e => roleHandler(Number(e.target.value))}
                        style={{ marginBottom: 10, width:600 }}
                        className='form-select'
                        id="role">
                        <option>Выберите роль:</option>
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
                    {(dateError && dateDirty) && <div style={{ color: "#D10000", marginLeft: 2, marginBottom: 5 }}>{dateError}</div>}
                    <label style={{ marginBottom: 10, width: 600 }}>Выберите дату, когда актёр играет свою роль:</label>
                    <input onChange={e => DateHandler(e)} onBlur={e => blurHandler(e)} name='Date' style={{ marginBottom: 10, width: 600 }}
                           type="date"
                           className="form-control col-4"
                           id="date"
                           value={date}
                           placeholder="Введите дату"
                    />
                </div>
                <div className="form-group">
                    {(mainRoleError && mainRoleDirty) && <div style={{ color: "#D10000", marginLeft: 2, marginBottom: 5 }}>{mainRoleError}</div>}
                    <label style={{ marginBottom: 10, width: 600 }}>Выберите является ли роль главной:</label>
                    <select onChange={e => mainRoleHandler(e)} onBlur={e => blurHandler(e)} name='isStudent' style={{ marginBottom: 10, width: 600 }}
                            className="form-control col-4"
                            id="mainRole"
                            value={mainRole}>
                        <option value={true}>True</option>
                        <option value={false}>False</option>
                    </select>
                </div>
                <div>
                    <button disabled={!formValid} style={{ marginTop: 20, color: 'white' }} className="btn btn-dark mb-2"
                            onClick={(e) => saveActorPlayingRole(e)}>
                        Сохранить
                    </button>
                    <Link to="/actor_playing_role" style={{ marginLeft: 40, marginTop: 20, color: 'white' }} className="btn btn-dark mb-2 ">Назад</Link>
                </div>
            </form>
        </div>
    );
}

export default AddActorTour;