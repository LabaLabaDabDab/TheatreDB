import {Link, useHistory, useParams} from "react-router-dom";
import { useState, useEffect } from "react";
import countryService from "../../service/CountryService";
import genreService from "../../service/GenreService";
import authorService from "../../service/AuthorService";

const AddAuthor = () => {
    const [name, setName] = useState("");
    const [country, setCountry] = useState("");
    const [genre, setGenre] = useState("");
    const [birthDate, setBirthDate] = useState();
    const [deathDate, setDeathDate] = useState();
    const [title, setTitle] = useState("");

    const [countries, setCountries] = useState([]);
    const [genres, setGenres] = useState([]);

    const [nameDirty, setNameDirty] = useState(false);
    const [countryDirty, setCountryDirty] = useState(false);
    const [genreDirty, setGenreDirty] = useState(false);
    const [birthDateDirty, setBirthDateDirty] = useState(false);
    const [deathDateDirty, setDeathDateDirty] = useState(false);
    const [titleDirty, setTitleDirty] = useState(false);

    const [nameError, setNameError] = useState('Поле не может быть пустым');
    const [countryError, setCountryError] = useState('Поле не может быть пустым');
    const [genreError, setGenreError] = useState('Поле не может быть пустым');
    const [birthDateError, setBirthDateError] = useState('Поле не может быть пустым');
    const [deathDateError, setDeathDateError] = useState('Поле не может быть пустым');
    const [titleError, setTitleError] = useState('Поле не может быть пустым');

    const [formValid, setFormValid] = useState(false);

    const history = useHistory();

    let { id } = useParams();

    useEffect(() => {
        init();
    }, []);

    const init = () => {
        countryService.getAllList()
            .then(response => {
                console.log(response.data);
                setCountries(response.data);
            })
            .catch(error => {
                console.log('Something went wrong', error);
            })
        genreService.getAllList()
            .then(response => {
                console.log(response.data);
                setGenres(response.data);
            })
            .catch(error => {
                console.log('Something went wrong', error);
            })
    }

    useEffect(() => {
        if (nameError || countryError || genreError || birthDateError || (deathDateError && deathDate) || titleError) {
            setFormValid(false);
        } else {
            setFormValid(true);
        }
    }, [nameError, countryError, genreError, birthDateError, deathDateError, titleError, deathDate])

    const blurHandler = (e) => {
        switch (e.target.name) {
            case 'name':
                setNameDirty(true)
                break
            case 'country':
                setCountryDirty(true)
                break
            case 'genre':
                setGenreDirty(true)
                break
            case 'birthDate':
                setBirthDateDirty(true)
                break
            case 'deathDate':
                setDeathDateDirty(true)
                break
            case 'title':
                setTitleDirty(true)
                break
        }
    }

    const NameHandler = (e) => {
        setName(e.target.value)
        if (e.target.value.length < 2 || e.target.value.length > 50)
            setNameError('Некорректная длина')
        else if (!e.target.value)
            setNameError('Поле не может быть пустым')
        else setNameError('')
    }

    const CountryHandler = (value) => {
        setCountry(value)
        if (!value)
            setCountryError('Поле не может быть пустым')
        else setCountryError('')
    }

    const GenreHandler = (value) => {
        setGenre(value)
        if (!value)
            setGenreError('Поле не может быть пустым')
        else setGenreError('')
    }

    const BirthDateHandler = (e) => {
        setBirthDate(e.target.value)
        if (!e.target.value || e.target.value === '')
            setBirthDateError('Поле не может быть пустым')
        else setBirthDateError('')
    }

    const DeathDateHandler = (e) => {
        setDeathDate(e.target.value);
        if(e.target.value) {
            if(new Date(e.target.value) < new Date(birthDate)) {
                setDeathDateError('Дата смерти не может быть раньше даты рождения');
            } else {
                setDeathDateError('');
            }
        } else {
            setDeathDateError('');
        }
    }

    const TitleHandler = (e) => {
        setTitle(e.target.value)
        if (e.target.value.length < 2 || e.target.value.length > 50)
            setTitleError('Некорректная длина')
        else if (!e.target.value)
            setTitleError('Поле не может быть пустым')
        else setTitleError('')
    }

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

        console.log(Author);
        authorService.create(Author)
            .then(response => {
                console.log('Author created', response.data);
                history.push('/authors');
            })
            .catch(error => {
                console.log('Something went wrong', error);
            });
    };

    return (
        <div className="container">
            <h3 style={{ marginTop: 20, marginBottom: 20, marginLeft: 2 }}>Добавить автора</h3>
            <form>
                <div className="form-group">
                    {(nameError && nameDirty) && <div style={{ color: "#D10000", marginLeft: 2, marginBottom: 5 }}>{nameError}</div>}
                    <label style={{ marginBottom: 10, width: 600 }}>Введите имя автора:</label>
                    <input onChange={e => NameHandler(e)} onBlur={e => blurHandler(e)} name='name' style={{ marginBottom: 10, width: 600 }}
                           type="text"
                           className="form-control col-4"
                           id="name"
                           value={name}
                           placeholder="Введите имя"
                    />
                </div>
                <div>
                    <label style={{ marginBottom: 10, width: 600 }}>Выберите страну, в которой родился автор:</label>
                    <select
                        onChange={e => CountryHandler(Number(e.target.value))}
                        style={{ marginBottom: 10, width:600 }}
                        className='form-select'
                        id="country">
                        <option>Выберите страну:</option>
                        {
                            countries && countries.map((country) => (
                                <option key={country.id} value={country.id.toString()}>
                                    {country.name}
                                </option>
                            ))
                        }
                    </select>
                </div>
                <div>
                    <label style={{ marginBottom: 10, width: 600 }}>Выберите жанр произведения:</label>
                    <select
                        onChange={e => GenreHandler(Number(e.target.value))}
                        style={{ marginBottom: 10, width:600 }}
                        className='form-select'
                        id="genre">
                        <option>Выберите жанр:</option>
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
                    {(birthDateError && birthDateDirty) && <div style={{ color: "#D10000", marginLeft: 2, marginBottom: 5 }}>{birthDateError}</div>}
                    <label style={{ marginBottom: 10, width: 600 }}>Выберите дату, когда родился автор:</label>
                    <input onChange={e => BirthDateHandler(e)} onBlur={e => blurHandler(e)} name='birthDate' style={{ marginBottom: 10, width: 600 }}
                           type="date"
                           className="form-control col-4"
                           id="birthDate"
                           value={birthDate}
                           placeholder="Введите дату"
                    />
                </div>
                <div className="form-group">
                    {(deathDateError && deathDateDirty) && <div style={{ color: "#D10000", marginLeft: 2, marginBottom: 5 }}>{deathDateError}</div>}
                    <label style={{ marginBottom: 10, width: 600 }}>Выберите дату, когда умер автор:</label>
                    <input onChange={e => DeathDateHandler(e)} onBlur={e => blurHandler(e)} name='deathDate' style={{ marginBottom: 10, width: 600 }}
                           type="date"
                           className="form-control col-4"
                           id="deathDate"
                           value={deathDate}
                           placeholder="Введите дату"
                    />
                </div>
                <div className="form-group">
                    {(titleError && titleDirty) && <div style={{ color: "#D10000", marginLeft: 2, marginBottom: 5 }}>{titleError}</div>}
                    <label style={{ marginBottom: 10, width: 600 }}>Введите название произведения:</label>
                    <input onChange={e => TitleHandler(e)} onBlur={e => blurHandler(e)} name='title' style={{ marginBottom: 10, width: 600 }}
                           type="text"
                           className="form-control col-4"
                           id="title"
                           value={title}
                           placeholder="Введите название произведения"
                    />
                </div>
                <div>
                    <button disabled={!formValid} style={{ marginTop: 20, color: 'white' }} className="btn btn-dark mb-2"
                            onClick={(e) => saveAuthor(e)}>
                        Сохранить
                    </button>
                    <Link to="/authors" style={{ marginLeft: 40, marginTop: 20, color: 'white' }} className="btn btn-dark mb-2 ">Назад</Link>
                </div>
            </form>
        </div>
    );
}

export default AddAuthor;