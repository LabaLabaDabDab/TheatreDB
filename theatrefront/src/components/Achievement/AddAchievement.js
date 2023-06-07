import {Link, useHistory, useParams} from "react-router-dom";
import { useState, useEffect } from "react";
import achievementService from "../../service/AchievementService";
import actorService from "../../service/ActorService";


const AddAchievement = () => {
    const [dateCompetition, setDateCompetition] = useState();
    const [competition, setCompetition] = useState('');
    const [actorId, setActorId] = useState("");
    const [actors, setActors] = useState([])

    const [rank, setRank] = useState('');

    const [dateCompetitionDirty, setDateCompetitionDirty] = useState(false);
    const [competitionDirty, setCompetitionDirty] = useState(false);
    const [actorIdDirty, setActorIdDirty] = useState(false);
    const [rankDirty, setRankDirty] = useState(false);

    const [dateCompetitionError, setDateCompetitionError] = useState('Поле не может быть пустым');
    const [competitionError, setCompetitionError] = useState('Поле не может быть пустым');
    const [actorIdError, setActorIdError] = useState('Поле не может быть пустым');
    const [rankError, setRankError] = useState('Поле не может быть пустым');

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
    }

    useEffect(() => {
        if (dateCompetitionError || competitionError || actorIdError || rankError) {
            setFormValid(false)
        } else {
            setFormValid(true)
        }
    }, [dateCompetitionError, competitionError, actorIdError, rankError])

    const blurHandler = (e) => {
        switch (e.target.name) {
            case 'dateCompetition':
                setDateCompetitionDirty(true)
                break
            case 'competition':
                setCompetitionDirty(true)
                break
            case 'actorId':
                setActorIdDirty(true)
                break
            case 'rank':
                setRankDirty(true)
                break
        }
    }

    const DateCompetitionHandler = (e) => {
        setDateCompetition(e.target.value)
        if (!e.target.value || e.target.value === '')
            setDateCompetitionError('Поле не может быть пустым')
        else setDateCompetitionError('')
    }

    const competitionHandler = (e) => {
        setCompetition(e.target.value)
        if (e.target.value.length < 3 || e.target.value.length > 50)
            setCompetitionError('Некорректная длина')
        else if (!e.target.value)
            setCompetitionError('Поле не может быть пустым')
        else setCompetitionError('')
    }

    const actorIdHandler = (value) => {
        setActorId(value)
        if (!value)
            setActorIdError('Поле не может быть пустым')
        else setActorIdError('')
    }

    const rankHandler = (e) => {
        setRank(e.target.value)
        if (e.target.value.length < 3 || e.target.value.length > 50)
            setRankError('Некорректная длина')
        else if (!e.target.value)
            setRankError('Поле не может быть пустым')
        else setRankError('')
    }

    const saveAchievement = (e) => {
        e.preventDefault();
        const achievement = {
            dateCompetition,
            competition,
            actorId: {id: Number(actorId)},
            rank,
            id
        };

        console.log(achievement);
        achievementService.create(achievement)
            .then(response => {
                console.log('Achievement created', response.data);
                history.push('/achievements');
            })
            .catch(error => {
                console.log('Something went wrong', error);
            });
    };


    return (
        <div className="container">
            <h3 style={{ marginTop: 20, marginBottom: 20, marginLeft: 2 }}>Добавить новое звание</h3>
            <form>
                <div className="form-group">
                    {(dateCompetitionError && dateCompetitionDirty) && <div style={{ color: "#D10000", marginLeft: 2, marginBottom: 5 }}>{dateCompetitionError}</div>}
                    <input onChange={e => DateCompetitionHandler(e)} onBlur={e => blurHandler(e)} name='DateCompetition' style={{ marginBottom: 10, width: 600 }}
                           type="date"
                           className="form-control col-4"
                           id="DateCompetition"
                           value={dateCompetition}
                           placeholder="Введите дату"
                    />
                </div>
                <div className="form-group">
                    {(competitionError && competitionDirty) && <div style={{ color: "#D10000", marginLeft: 2, marginBottom: 5 }}>{competitionError}</div>}
                    <input onChange={e => competitionHandler(e)} onBlur={e => blurHandler(e)} name='competition' style={{ marginBottom: 10, width: 600 }}
                           type="text"
                           className="form-control col-4"
                           id="competition"
                           value={competition}
                           placeholder="Введите соревнование"
                    />
                </div>
                <div>
                    <select
                        onChange={e => actorIdHandler(Number(e.target.value))}
                        style={{ marginBottom: 10, width:600 }}
                        className='form-select'
                        id="actorId">
                        <option>Выберите актёра</option>
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
                    {(rankError && rankDirty) && <div style={{ color: "#D10000", marginLeft: 2, marginBottom: 5 }}>{rankError}</div>}
                    <input onChange={e => rankHandler(e)} onBlur={e => blurHandler(e)} name='competition' style={{ marginBottom: 10, width: 600 }}
                           type="text"
                           className="form-control col-4"
                           id="rank"
                           value={rank}
                           placeholder="Введите звание"
                    />
                </div>
                <div>
                    <button disabled={!formValid} style={{ marginTop: 20, color: 'white' }} className="btn btn-dark mb-2"
                            onClick={(e) => saveAchievement(e)}>
                        Сохранить
                    </button>
                    <Link to="/achievements" style={{ marginLeft: 40, marginTop: 20, color: 'white' }} className="btn btn-dark mb-2 ">Назад</Link>
                </div>
            </form>
        </div>
    );
}

export default AddAchievement;