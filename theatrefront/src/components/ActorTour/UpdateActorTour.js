import { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import actorService from "../../service/ActorService";
import dateOfTourService from "../../service/DateOfTourService";
import actorTourService from "../../service/ActorTourService";

const UpdateActorTour = () => {
    const [date, setDate] = useState("");
    const [actor, setActor] = useState("");

    const [dates, setDates] = useState([]);
    const [actors, setActors] = useState([]);

    let { id } = useParams();
    const [dateID, actorID] = id.split('.');

    const history = useHistory();

    const saveActorTour = (e) => {
        e.preventDefault();

        const ActorTour  = {
            date: {id: Number(date)},
            actor: {id: Number(actor)}
        };

        actorTourService.update(dateID, actorID, ActorTour)
            .then(response => {
                console.log('ActorTour updated', response.data);
                history.push('/actor_tour');
            })
            .catch(error => {
                console.log('Something went wrong', error);
            });
    }

    useEffect(() => {
        if (id) {
            const [dateID, actorID] = id.split('.');
            actorTourService.get(dateID, actorID)
                .then(response => {
                    const actorTour = response.data;
                    const tempDate = actorTour.date.id;
                    const tempActor = actorTour.actor.id;

                    dateOfTourService.getAllList()
                        .then(response => {
                            console.log(response.data);
                            setDates(response.data);
                            setDate(tempDate);
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
            dateOfTourService.getAllList()
                .then(response => {
                    console.log(response.data);
                    setDates(response.data);
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
            <h3 style={{ marginTop: 20, marginBottom: 20, marginLeft: 2 }}>Обновить тур актёра</h3>
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
                    <label style={{ marginBottom: 10, width: 600 }}>Выберите тур:</label>
                    <select
                        style={{ marginBottom: 10, width: 600 }}
                        className="form-control col-4"
                        id="date"
                        value={date}
                        onChange={(e) => setDate(Number(e.target.value))}>
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
                    <button style={{ marginTop: 20, color: 'white' }} className="btn btn-dark mb-2"
                            onClick={(e) => saveActorTour(e)}>
                        Сохранить
                    </button>
                    <Link to="/actor_tour" style={{ marginLeft: 40, marginTop: 20, color: 'white' }} className="btn btn-dark mb-2 ">Назад</Link>
                </div>
            </form>

        </div>
    );
}

export default UpdateActorTour;