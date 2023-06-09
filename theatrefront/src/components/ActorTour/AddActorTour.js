import {Link, useHistory, useParams} from "react-router-dom";
import { useState, useEffect } from "react";
import actorService from "../../service/ActorService";
import dateOfTourService from "../../service/DateOfTourService";
import actorTourService from "../../service/ActorTourService";

const AddActorTour = () => {
    const [date, setDate] = useState("");
    const [actor, setActor] = useState("");

    const [dates, setDates] = useState([]);
    const [actors, setActors] = useState([]);

    const [dateDirty, setDateDirty] = useState(false);
    const [actorDirty, setActorDirty] = useState(false);

    const [dateError, setDateError] = useState('Поле не может быть пустым');
    const [actorError, setActorError] = useState('Поле не может быть пустым');

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
        dateOfTourService.getAllList()
            .then(response => {
                console.log(response.data);
                setDates(response.data);
            })
            .catch(error => {
                console.log('Something went wrong', error);
            })
    }

    useEffect(() => {
        if (actorError || dateError) {
            setFormValid(false)
        } else {
            setFormValid(true)
        }
    }, [actorError, dateError])


    const blurHandler = (e) => {
        switch (e.target.name) {
            case 'actor':
                setActorDirty(true)
                break
            case 'date':
                setDateDirty(true)
                break
        }
    }

    const dateHandler = (value) => {
        setDate(value)
        if (!value)
            setDateError('Поле не может быть пустым')
        else setDateError('')
    }

    const actorHandler = (value) => {
        setActor(value)
        if (!value)
            setActorError('Поле не может быть пустым')
        else setActorError('')
    }


    const saveActorTour = (e) => {
        e.preventDefault();
        const ActorTour  = {
            date: {id: Number(date)},
            actor: {id: Number(actor)},
            id: {dateID: Number(date), actorID: Number(actor)}
        };

        console.log(ActorTour);
        actorTourService.create(ActorTour)
            .then(response => {
                console.log('ActorTour created', response.data);
                history.push('/actor_tour');
            })
            .catch(error => {
                console.log('Something went wrong', error);
            });
    };

    return (
        <div className="container">
            <h3 style={{ marginTop: 20, marginBottom: 20, marginLeft: 2 }}>Добавить тур, в котором участвует Актёр</h3>
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
                        onChange={e => dateHandler(Number(e.target.value))}
                        style={{ marginBottom: 10, width:600 }}
                        className='form-select'
                        id="date">
                        <option>Выберите тур:</option>
                        {
                            dates && dates.map((dateOfTour) => (
                                <option key={dateOfTour.id.toString()} value={dateOfTour.id.toString()}>
                                    {`${dateOfTour.dateStart} - ${dateOfTour.dateEnd}`}
                                </option>
                            ))
                        }
                    </select>
                </div>
                <div>
                    <button disabled={!formValid} style={{ marginTop: 20, color: 'white' }} className="btn btn-dark mb-2"
                            onClick={(e) => saveActorTour(e)}>
                        Сохранить
                    </button>
                    <Link to="/actor_tour" style={{ marginLeft: 40, marginTop: 20, color: 'white' }} className="btn btn-dark mb-2 ">Назад</Link>
                </div>
            </form>
        </div>
    );
}

export default AddActorTour;