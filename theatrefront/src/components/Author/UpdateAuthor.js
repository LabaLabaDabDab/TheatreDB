import { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import authorsService from "../../service/AuthorService";

const UpdateAuthor = () => {
    const [name, setName] = useState('');
    const [country, setCountry] = useState();
    const [genre, setGenre] = useState();
    const [birthDate, setBirthDate] = useState();
    const [deathDate, setDeathDate] = useState();
    const [title, setTitle] = useState();

    const history = useHistory();

    let { id } = useParams();

    const saveAuthor = (e) => {
        e.preventDefault();

        const author = { id, name, country, genre, birthDate, deathDate, title };

        authorsService.update(author)
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
            authorsService.get(id)
                .then(author => {
                    setName(author.data.name);
                    setGenre(author.data.genre)
                    setCountry(author.data.country);
                    setBirthDate(author.data.birthDate);
                    setDeathDate(author.data.deathDate);
                    setTitle(author.data.title);
                })
                .catch(error => {
                    console.log('Something went wrong', error);
                })
        }
    }, [])


    return (
        <div className="container">
            <h3 style={{ marginTop: 20, marginBottom: 20, marginLeft: 2 }}>Обновить автора</h3>
            <form>
                <div className="form-group">
                    <input style={{ marginBottom: 10, width: 600 }}
                           type="text"
                           className="form-control col-4"
                           id="name"
                           value={name}
                           onChange={(e) => setName(e.target.value)}
                           placeholder="Введите имя"
                    />
                </div>
                <div className="form-group">
                    <input style={{ marginBottom: 10, width: 600 }}
                           type="text"
                           className="form-control col-4"
                           id="country"
                           value={country}
                           onChange={(e) => setCountry(e.target.value)}
                           placeholder="Введите название страны"
                    />
                </div>
                <div className="form-group">
                    <input style={{ marginBottom: 10, width: 600 }}
                           type="text"
                           className="form-control col-4"
                           id="gender"
                           value={genre}
                           onChange={(e) => setGenre(e.target.value)}
                           placeholder="Введите жанр"
                    />
                </div>
                <div className="form-group">
                    <input style={{ marginBottom: 10, width: 600 }}
                           type="text"
                           className="form-control col-4"
                           id="birthDate"
                           value={birthDate}
                           onChange={(e) => setBirthDate(e.target.value)}
                           placeholder="Введите дату рождения автора"
                    />
                </div>
                <div className="form-group">
                    <input style={{ marginBottom: 10, width: 600 }}
                           type="text"
                           className="form-control col-4"
                           id="birthDate"
                           value={deathDate}
                           onChange={(e) => setDeathDate(e.target.value)}
                           placeholder="Введите дату смерти автора"
                    />
                </div>
                <div className="form-group">
                    <input style={{ marginBottom: 10, width: 600 }}
                           type="text"
                           className="form-control col-4"
                           id="title"
                           value={title}
                           onChange={(e) => setTitle(e.target.value)}
                           placeholder="Введите название произведения"
                    />
                </div>

                <div>
                    <button style={{ marginTop: 20, color: 'white' }} className="btn btn-dark mb-2"
                            onClick={(e) => saveAuthor(e)}>
                        Сохранить
                    </button>
                    <Link to="/authors" style={{ marginLeft: 40, marginTop: 20, color: 'white' }} className="btn btn-dark mb-2 ">К списку авторов</Link>
                </div>
            </form>

        </div>
    );
}

export default UpdateAuthor;