import { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import countryService from "../../service/CountryService";
import genreService from "../../service/GenreService";
import authorService from "../../service/AuthorService";

const UpdateAuthor = () => {
    const [name, setName] = useState("");
    const [country, setCountry] = useState("");
    const [genre, setGenre] = useState("");
    const [birthDate, setBirthDate] = useState();
    const [deathDate, setDeathDate] = useState();
    const [title, setTitle] = useState("");

    const [countries, setCountries] = useState([]);
    const [genres, setGenres] = useState([]);

    let { id } = useParams();

    const history = useHistory();

    const saveAuthor = (e) => {
        e.preventDefault();

        const Author  = {
            name,
            country: {id: Number(country)},
            genre: {id: Number(genre)},
            birthDate,
            deathDate,
            title
        };

        authorService.update(id, Author)
            .then(response => {
                console.log('Author updated', response.data);
                history.push('/authors');
            })
            .catch(error => {
                console.log('Something went wrong', error);
            });
    }

    useEffect(() => {
        if (id) {
            authorService.get(id)
                .then(author => {
                    setName(author.data.name);
                    const tempCountry = author.data.country.id;
                    const tempGenre = author.data.genre.id;
                    setBirthDate(author.data.birthDate);
                    setDeathDate(author.data.deathDate);
                    setTitle(author.data.title);

                    countryService.getAllList()
                        .then(response => {
                            console.log(response.data);
                            setCountries(response.data);
                            setCountry(tempCountry);
                        })
                        .catch(error => {
                            console.log('Something went wrong', error);
                        });

                    genreService.getAllList()
                        .then(response => {
                            console.log(response.data);
                            setGenres(response.data);
                            setGenre(tempGenre);
                        })
                        .catch(error => {
                            console.log('Something went wrong', error);
                        });
                })
                .catch(error => {
                    console.log('Something went wrong', error);
                });
        } else {
            countryService.getAllList()
                .then(response => {
                    console.log(response.data);
                    setCountries(response.data);
                })
                .catch(error => {
                    console.log('Something went wrong', error);
                });

            genreService.getAllList()
                .then(response => {
                    console.log(response.data);
                    setGenres(response.data);
                })
                .catch(error => {
                    console.log('Something went wrong', error);
                });
        }
    }, [])

    const handleDeathDateChange = (e) => {
        const newDeathDate = e.target.value;

        const birth = new Date(birthDate);
        const death = new Date(newDeathDate);

        if (birth > death) {
            alert('Дата смерти не может быть раньше даты рождения');
            return;  // не обновляем состояние, если дата некорректна
        }

        setDeathDate(newDeathDate);
    }

    return (
        <div className="container">
            <h3 style={{ marginTop: 20, marginBottom: 20, marginLeft: 2 }}>Обновить автора</h3>
            <form>
                <div className="form-group">
                    <label style={{ marginBottom: 10, width: 600 }}>Введите имя автора:</label>
                    <input onChange={e => setName(e.target.value)}
                           style={{ marginBottom: 10, width: 600 }}
                           type="text"
                           className="form-control col-4"
                           id="name"
                           value={name}
                           placeholder="Введите имя"
                    />
                </div>
                <div className="form-group">
                    <label style={{ marginBottom: 10, width: 600 }}>Выберите страну, в которой родился автор:</label>
                    <select
                        style={{ marginBottom: 10, width: 600 }}
                        className="form-control col-4"
                        id="country"
                        value={country}
                        onChange={(e) => setCountry(Number(e.target.value))}>
                        {
                            countries && countries.map((country) => (
                                <option key={country.id} value={country.id.toString()}>
                                    {country.name}
                                </option>
                            ))
                        }
                    </select>
                </div>
                <div className="form-group">
                    <label style={{ marginBottom: 10, width: 600 }}>Выберите жанр произведения:</label>
                    <select
                        style={{ marginBottom: 10, width: 600 }}
                        className="form-control col-4"
                        id="genre"
                        value={genre}
                        onChange={(e) => setGenre(Number(e.target.value))}>
                        {
                            genres && genres.map((genre) => (
                                <option key={genre.id} value={genre.id.toString()}>
                                    {genre.name}
                                </option>
                            ))
                        }
                    </select>
                </div>
                <div className="form-group">
                    <label style={{ marginBottom: 10, width: 600 }}>Выберите дату, когда родился автор:</label>
                    <input onChange={e => setBirthDate(e.target.value)}
                           style={{ marginBottom: 10, width: 600 }}
                           type="date"
                           className="form-control col-4"
                           id="birthDate"
                           value={birthDate}
                           placeholder="Введите дату"
                    />
                </div>
                <div className="form-group">
                    <label style={{ marginBottom: 10, width: 600 }}>Выберите дату, когда умер автор:</label>
                    <input onChange={handleDeathDateChange}
                           style={{ marginBottom: 10, width: 600 }}
                           type="date"
                           className="form-control col-4"
                           id="deathDate"
                           value={deathDate}
                           placeholder="Введите дату"
                    />
                </div>
                <div className="form-group">
                    <label style={{ marginBottom: 10, width: 600 }}>Введите название произведения:</label>
                    <input onChange={e => setTitle(e.target.value)}
                           style={{ marginBottom: 10, width: 600 }}
                           type="text"
                           className="form-control col-4"
                           id="title"
                           value={title}
                           placeholder="Введите название произведение"
                    />
                </div>
                <div>
                    <button style={{ marginTop: 20, color: 'white' }} className="btn btn-dark mb-2"
                            onClick={(e) => saveAuthor(e)}>
                        Сохранить
                    </button>
                    <Link to="/authors" style={{ marginLeft: 40, marginTop: 20, color: 'white' }} className="btn btn-dark mb-2 ">Назад</Link>
                </div>
            </form>

        </div>
    );
}

export default UpdateAuthor;