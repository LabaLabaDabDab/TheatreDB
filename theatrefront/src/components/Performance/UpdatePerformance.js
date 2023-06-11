import { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import performanceService from "../../service/PerformanceService";
import authorService from "../../service/AuthorService";
import directorService from "../../service/DirectorService";
import musicianService from "../../service/MusicianService";

const UpdatePerformance = () => {
    const [ageLimit, setAgeLimit] = useState("");
    const [premiereDate, setPremiereDate] = useState("");
    const [author, setAuthor] = useState("");
    const [timeDuration, setTimeDuration] = useState("");
    const [director, setDirector] = useState("");
    const [musician, setMusician] = useState("");

    const [authors, setAuthors] = useState([]);
    const [directors, setDirectors] = useState([]);
    const [musicians, setMusicians] = useState([]);

    let { id } = useParams();

    const history = useHistory();

    const savePerformance = (e) => {
        e.preventDefault();

        const performance = {
            ageLimit,
            premiereDate,
            author: {id: Number(author)},
            timeDuration,
            director: {id: Number(director)},
            musician: {id: Number(musician)},
        };

        performanceService.update(id, performance)
            .then(response => {
                console.log('Performance updated', response.data);
                history.push('/performances');
            })
            .catch(error => {
                console.log('Something went wrong', error);
            });
    }

    useEffect(() => {
        if (id) {
            performanceService.get(id)
                .then(performance => {
                    setAgeLimit(performance.data.ageLimit);
                    setPremiereDate(performance.data.premiereDate);
                    setTimeDuration(performance.data.timeDuration);
                    const tempAuthor = performance.data.author.id;
                    const tempDirector = performance.data.director.id;
                    const tempMusician = performance.data.musician.id;

                    authorService.getAllList()
                        .then(response => {
                            setAuthors(response.data);
                            setAuthor(tempAuthor);
                        })
                        .catch(error => {
                            console.log('Something went wrong', error);
                        });

                    directorService.getAllList()
                        .then(response => {
                            setDirectors(response.data);
                            setDirector(tempDirector);
                        })
                        .catch(error => {
                            console.log('Something went wrong', error);
                        });

                    musicianService.getAllList()
                        .then(response => {
                            setMusicians(response.data);
                            setMusician(tempMusician);
                        })
                        .catch(error => {
                            console.log('Something went wrong', error);
                        });
                })
                .catch(error => {
                    console.log('Something went wrong', error);
                });
        } else {
            authorService.getAllList()
                .then(response => {
                    setAuthors(response.data);
                })
                .catch(error => {
                    console.log('Something went wrong', error);
                });

            directorService.getAllList()
                .then(response => {
                    setDirectors(response.data);
                })
                .catch(error => {
                    console.log('Something went wrong', error);
                });

            musicianService.getAllList()
                .then(response => {
                    setMusicians(response.data);
                })
                .catch(error => {
                    console.log('Something went wrong', error);
                });
        }
    }, [])

    return (
        <div className="container">
            <h3 style={{ marginTop: 20, marginBottom: 20, marginLeft: 2 }}>Обновить спектакль</h3>
            <form>
                {/* Age Limit */}
                <div className="form-group">
                    <label style={{ marginBottom: 10, width: 600 }}>Введите возрастное ограничение:</label>
                    <input onChange={e => setAgeLimit(e.target.value)}
                           style={{ marginBottom: 10, width: 600 }}
                           type="text"
                           className="form-control col-4"
                           id="ageLimit"
                           value={ageLimit}
                           placeholder="Введите возрастное ограничение"
                    />
                </div>

                {/* Premiere Date */}
                <div className="form-group">
                    <label style={{ marginBottom: 10, width: 600 }}>Выберите дату премьеры:</label>
                    <input onChange={e => setPremiereDate(e.target.value)}
                           style={{ marginBottom: 10, width: 600 }}
                           type="date"
                           className="form-control col-4"
                           id="premiereDate"
                           value={premiereDate}
                           placeholder="Введите дату премьеры"
                    />
                </div>

                <div className="form-group">
                    <label style={{ marginBottom: 10, width: 600 }}>Выберите автора произведения:</label>
                    <select
                        style={{ marginBottom: 10, width: 600 }}
                        className="form-control col-4"
                        id="author"
                        value={author}
                        onChange={(e) => setAuthor(Number(e.target.value))}>
                        {
                            authors && authors.map((author) => (
                                <option key={author.id} value={author.id.toString()}>
                                    {author.name}
                                </option>
                            ))
                        }
                    </select>
                </div>

                {/* Time Duration */}
                <div className="form-group">
                    <label style={{ marginBottom: 10, width: 600 }}>Введите продолжительность спектакля:</label>
                    <input onChange={e => setTimeDuration(e.target.value)}
                           style={{ marginBottom: 10, width: 600 }}
                           type="text"
                           className="form-control col-4"
                           id="timeDuration"
                           value={timeDuration}
                           placeholder="Введите продолжительность"
                    />
                </div>

                {/* Directors */}
                <div className="form-group">
                    <label style={{ marginBottom: 10, width: 600 }}>Выберите режиссера:</label>
                    <select
                        style={{ marginBottom: 10, width: 600 }}
                        className="form-control col-4"
                        id="director"
                        value={director}
                        onChange={(e) => setDirector(Number(e.target.value))}>
                        {
                            directors && directors.map((director) => (
                                <option key={director.id} value={director.id.toString()}>
                                    {director.employee.fio}
                                </option>
                            ))
                        }
                    </select>
                </div>

                {/* Musicians */}
                <div className="form-group">
                    <label style={{ marginBottom: 10, width: 600 }}>Выберите музыканта:</label>
                    <select
                        style={{ marginBottom: 10, width: 600 }}
                        className="form-control col-4"
                        id="musician"
                        value={musician}
                        onChange={(e) => setMusician(Number(e.target.value))}>
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
                    <button style={{ marginTop: 20, color: 'white' }} className="btn btn-dark mb-2"
                            onClick={(e) => savePerformance(e)}>
                        Сохранить
                    </button>
                    <Link to="/performances" style={{ marginLeft: 40, marginTop: 20, color: 'white' }} className="btn btn-dark mb-2">Назад</Link>
                </div>
            </form>
        </div>
    );

}

export default UpdatePerformance;
