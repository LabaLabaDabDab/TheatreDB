import { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import performanceService from "../../service/PerformanceService";
import authorService from "../../service/AuthorService";
import directorService from "../../service/DirectorService";
import musicianService from "../../service/MusicianService";

const AddPerformance = () => {
    const [ageLimit, setAgeLimit] = useState(Number);
    const [premiereDate, setPremiereDate] = useState("");
    const [author, setAuthor] = useState("");
    const [timeDuration, setTimeDuration] = useState(Number);
    const [director, setDirector] = useState("");
    const [musician, setMusician] = useState("");

    const [authors, setAuthors] = useState([]);
    const [directors, setDirectors] = useState([]);
    const [musicians, setMusicians] = useState([]);

    const [authorDirty, setAuthorDirty] = useState(false);
    const [premiereDateDirty, setPremiereDateDirty] = useState(false);
    const [timeDurationDirty, setTimeDurationDirty] = useState(false);
    const [ageLimitDirty, setAgeLimitDirty] = useState(false);
    const [directorDirty, setDirectorDirty] = useState(false);
    const [musicianDirty, setMusicianDirty] = useState(false);

    const [authorError, setAuthorError] = useState('Поле не может быть пустым');
    const [premiereDateError, setPremiereDateError] = useState('Поле не может быть пустым');
    const [timeDurationError, setTimeDurationError] = useState('Поле не может быть пустым');
    const [ageLimitError, setAgeLimitError] = useState('Поле не может быть пустым');
    const [directorError, setDirectorError] = useState('Поле не может быть пустым');
    const [musicianError, setMusicianError] = useState('Поле не может быть пустым');

    const [formValid, setFormValid] = useState(false);

    const history = useHistory();

    useEffect(() => {
        authorService.getAllList()
            .then(response => {
                console.log(response.data);
                setAuthors(response.data);
            })
            .catch(error => {
                console.log('Something went wrong', error);
            });

        directorService.getAllList()
            .then(response => {
                console.log(response.data);
                setDirectors(response.data);
            })
            .catch(error => {
                console.log('Something went wrong', error);
            });

        musicianService.getAllList()
            .then(response => {
                console.log(response.data);
                setMusicians(response.data);
            })
            .catch(error => {
                console.log('Something went wrong', error);
            });
    }, []);

    useEffect(() => {
        if (authorError || premiereDateError || timeDurationError || ageLimitError || directorError || musicianError) {
            setFormValid(false);
        } else {
            setFormValid(true);
        }
    }, [authorError, premiereDateError, timeDurationError, ageLimitError, directorError, musicianError]);

    const blurHandler = (e) => {
        switch (e.target.name) {
            case 'ageLimit':
                setAgeLimitDirty(true)
                break
            case 'premiereDate':
                setPremiereDateDirty(true)
                break
            case 'author':
                setAuthorDirty(true)
                break
            case 'timeDuration':
                setTimeDurationDirty(true)
                break
            case 'director':
                setDirectorDirty(true)
                break
            case 'musician':
                setMusicianDirty(true)
                break
        }
    }

    const AuthorHandler = (value) => {
        setAuthor(value)
        if (!value)
            setAuthorError('Поле не может быть пустым')
        else setAuthorError('')
    }

    const DirectorHandler = (value) => {
        setDirector(value)
        if (!value)
            setDirectorError('Поле не может быть пустым')
        else setDirectorError('')
    }

    const MusicianHandler = (value) => {
        setMusician(value)
        if (!value)
            setMusicianError('Поле не может быть пустым')
        else setMusicianError('')
    }

    const PremiereDateHandler = (e) => {
        setPremiereDate(e.target.value)
        if (!e.target.value || e.target.value === '')
            setPremiereDateError('Поле не может быть пустым')
        else setPremiereDateError('')
    }

    const AgeLimitHandler = (e) => {
        let value = e.target.value
        setAgeLimit(value)
        if (!value || value === '')
            setAgeLimitError('Поле не может быть пустым')
        else if (value <= 0)
            setAgeLimitError('Возрастной рейтинг должен быть больше 0')
        else
            setAgeLimitError('')
    }

    const TimeDurationHandler = (e) => {
        let value = e.target.value
        setTimeDuration(value)
        if (!value || value === '')
            setTimeDurationError('Поле не может быть пустым')
        else if (value <= 0)
            setTimeDurationError('Продолжительность представления должна быть больше 0')
        else
            setTimeDurationError('')
    }

    const savePerformance = (e) => {
        e.preventDefault();
        let Performance = {
            ageLimit,
            premiereDate,
            author: { id: Number(author)},
            timeDuration,
            director: { id: Number(director)},
            musician: { id: Number(musician)}
        }
        performanceService.create(Performance)
            .then(response => {
                console.log(response.data);
                history.push("/performances");
            })
            .catch(error => {
                console.log('Something went wrong', error);
            });
    }

    return (
        <div className="container">
            <h3 style={{ marginTop: 20, marginBottom: 20, marginLeft: 2 }}>Добавить представление</h3>
            <form>
                <div className="form-group">
                    {(ageLimitError && ageLimitDirty) && <div style={{ color: "#D10000", marginLeft: 2, marginBottom: 5 }}>{ageLimitError}</div>}
                    <label style={{ marginBottom: 10, width: 600 }}>Введите возрастной рейтинг:</label>
                    <input onChange={e => AgeLimitHandler(e)} onBlur={e => blurHandler(e)} name='ageLimit' style={{ marginBottom: 10, width: 600 }}
                           type="number"
                           className="form-control col-4"
                           id="ageLimit"
                           value={ageLimit}
                           placeholder="Введите кол-во билетов"
                    />
                </div>
                <div className="form-group">
                    {(premiereDateError && premiereDateDirty) && <div style={{ color: "#D10000", marginLeft: 2, marginBottom: 5 }}>{premiereDateError}</div>}
                    <label style={{ marginBottom: 10, width: 600 }}>Выберите дату премьеры:</label>
                    <input onChange={e => PremiereDateHandler(e)} onBlur={e => blurHandler(e)} name='premiereDate'
                           type="date"
                           style={{ marginBottom: 10, width: 600 }}
                           className="form-control col-4"
                           id="premiereDate"
                           value={premiereDate}
                           placeholder="Введите дату"
                    />
                </div>
                <div className="form-group">
                    {(timeDurationError && timeDurationDirty) && <div style={{ color: "#D10000", marginLeft: 2, marginBottom: 5 }}>{timeDurationError}</div>}
                    <label style={{ marginBottom: 10, width: 600 }}>Введите длительность представления:</label>
                    <input onChange={e => TimeDurationHandler(e)} onBlur={e => blurHandler(e)} name='ageLimit' style={{ marginBottom: 10, width: 600 }}
                           type="number"
                           className="form-control col-4"
                           id="timeDuration"
                           value={timeDuration}
                           placeholder="Введите длительность представления"
                    />
                </div>
                <div>
                    <label style={{ marginBottom: 10, width: 600 }}>Выберите автора произведения:</label>
                    <select
                        onChange={e => AuthorHandler(Number(e.target.value))}
                        style={{ marginBottom: 10, width:600 }}
                        className='form-select'
                        id="author">
                        <option>Выберите автора:</option>
                        {
                            authors && authors.map((author) => (
                                <option key={author.id} value={author.id.toString()}>
                                    {author.name}
                                    {"--"}
                                    {author.title}
                                </option>
                            ))
                        }
                    </select>
                </div>
                <div>
                    <label style={{ marginBottom: 10, width: 600 }}>Выберите директора:</label>
                    <select
                        onChange={e => DirectorHandler(Number(e.target.value))}
                        style={{ marginBottom: 10, width:600 }}
                        className='form-select'
                        id="director">
                        <option>Выберите директора:</option>
                        {
                            directors && directors.map((director) => (
                                <option key={director.id} value={director.id.toString()}>
                                    {director.employee.fio}
                                </option>
                            ))
                        }
                    </select>
                </div>
                <div>
                    <label style={{ marginBottom: 10, width: 600 }}>Выберите музыканта:</label>
                    <select
                        onChange={e => MusicianHandler(Number(e.target.value))}
                        style={{ marginBottom: 10, width:600 }}
                        className='form-select'
                        id="musician">
                        <option>Выберите музыканта:</option>
                        {
                            musicians && musicians.map((musician) => (
                                <option key={musician.id} value={musician.id.toString()}>
                                    {musician.employee.fio}
                                </option>
                            ))
                        }
                    </select>
                </div>
                <div>
                    <button disabled={!formValid} style={{ marginTop: 20, color: 'white' }} className="btn btn-dark mb-2"
                            onClick={(e) => savePerformance(e)}>
                        Сохранить
                    </button>
                    <Link to="/authors" style={{ marginLeft: 40, marginTop: 20, color: 'white' }} className="btn btn-dark mb-2 ">Назад</Link>
                </div>
            </form>
        </div>
    );
};

export default AddPerformance;
