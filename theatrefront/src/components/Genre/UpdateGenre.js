import { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import genreService from "../../service/GenreService";

const UpdateGenre = () => {

    const [name, setName] = useState('');
    const history = useHistory();

    let { id } = useParams();

    const saveGenre = (e) => {
        e.preventDefault();

        const genre =
            {name};

        genreService.update(id, genre)
            .then(response => {
                console.log('Genre updated', response.data);
                history.push('/genres');
            })
            .catch(error => {
                console.log('Something went wrong', error);
            });
    }

    useEffect(() => {
        if (id) {
            genreService.get(id)
                .then(genre => {
                    setName(genre.data.name);
                })
                .catch(error => {
                    console.log('Something went wrong', error);
                })
        }
    }, [])


    return (
        <div className="container">
            <h3 style={{ marginTop: 20, marginBottom: 20, marginLeft: 2 }}>Обновить жанр</h3>
            <form>
                <div className="form-group">
                    <input style={{ marginBottom: 10, width: 600 }}
                           type="text"
                           className="form-control col-4"
                           id="name"
                           value={name}
                           onChange={(e) => setName(e.target.value)}
                           placeholder="Введите жанр"
                    />
                </div>
                <div>
                    <button style={{ marginTop: 20, color: 'white' }} className="btn btn-dark mb-2"
                            onClick={(e) => saveGenre(e)}>
                        Сохранить
                    </button>
                    <Link to="/genres" style={{ marginLeft: 40, marginTop: 20, color: 'white' }} className="btn btn-dark mb-2 ">Назад</Link>
                </div>
            </form>
        </div>
    );
}

export default UpdateGenre;