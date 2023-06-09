import { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import achievementService from "../../service/AchievementService";
import actorService from "../../service/ActorService";

const UpdateAchievement = () => {

    const [dateCompetition, setDateOfCompetition] = useState("");
    const [competition, setCompetition] = useState("");
    const [actorId, setActorId] = useState("");
    const [actors, setActors] = useState([]);
    const [rank, setRank] = useState("");

    const [currentPage, setCurrentPage] = useState(1);
    const [recordPerPage, setRecordPerPage] = useState(1000);

    const history = useHistory();

    let { id } = useParams();

    const saveAchievement = (e) => {
        e.preventDefault();

        const achievement =
            {dateCompetition, competition, actorId: { id: Number(actorId) }, rank};

        achievementService.update(id, achievement)
            .then(response => {
                console.log('Achievement updated', response.data);
                history.push('/achievements');
            })
            .catch(error => {
                console.log('Something went wrong', error);
            });

    }

    useEffect(() => {
        if (id) {
            achievementService.get(id)
                .then(achievement => {
                    setDateOfCompetition(achievement.data.dateCompetition);
                    setCompetition(achievement.data.competition);
                    setRank(achievement.data.rank);
                    const tempActorId = achievement.data.actorId.id;
                    actorService.getAll(currentPage - 1, recordPerPage)
                        .then(response => {
                            setActors(response.data.content);
                            setActorId(tempActorId);
                        })
                        .catch(error => {
                            console.log('Something went wrong', error);
                        });
                })
                .catch(error => {
                    console.log('Something went wrong', error);
                })
        } else {
            actorService.getAll(currentPage - 1, recordPerPage)
                .then(response => {
                    console.log(response.data);
                    setActors(response.data.content);
                })
                .catch(error => {
                    console.log('Something went wrong', error);
                });
        }

    }, [id, currentPage, recordPerPage])


    return (
        <div className="container">
            <h3 style={{ marginTop: 20, marginBottom: 20, marginLeft: 2 }}>Обновить звания актёров</h3>
            <form>
                <div className="form-group">
                    <input style={{ marginBottom: 10, width: 600 }}
                           type="date"
                           className="form-control col-4"
                           id="dateCompetition"
                           value={dateCompetition}
                           onChange={(e) => setDateOfCompetition(e.target.value)}
                           placeholder="Введите дату соревнования"
                    />
                </div>
                <div className="form-group">
                    <input style={{ marginBottom: 10, width: 600 }}
                           type="text"
                           className="form-control col-4"
                           id="competition"
                           value={competition}
                           onChange={(e) => setCompetition(e.target.value)}
                           placeholder="Введите название соревнования"
                    />
                </div>
                <div className="form-group">
                    <select
                        style={{ marginBottom: 10, width: 600 }}
                        className="form-control col-4"
                        id="actor"
                        value={actorId}
                        onChange={(e) => setActorId(Number(e.target.value))}
                    >
                        {actors && actors.map((actor) => (
                            <option key={actor.id} value={actor.id.toString()}>
                                {actor.employee.fio}
                            </option>
                        ))}

                    </select>
                </div>
                <div className="form-group">
                    <input style={{ marginBottom: 10, width: 600 }}
                           type="text"
                           className="form-control col-4"
                           id="rank"
                           value={rank}
                           onChange={(e) => setRank(e.target.value)}
                           placeholder="Введите звание актёра"
                    />
                </div>
                <div>
                    <button style={{ marginTop: 20, color: 'white' }} className="btn btn-dark mb-2"
                            onClick={(e) => saveAchievement(e)}>
                        Сохранить
                    </button>
                    <Link to="/achievements" style={{ marginLeft: 40, marginTop: 20, color: 'white' }} className="btn btn-dark mb-2 ">Назад</Link>
                </div>
            </form>

        </div>
    );
}

export default UpdateAchievement;