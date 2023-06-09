import { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import countryService from "../../service/CountryService";

const UpdateCountry = () => {

    const [name, setName] = useState('');
    const history = useHistory();

    let { id } = useParams();

    const saveCountry = (e) => {
        e.preventDefault();

        const country =
            {name};

        countryService.update(id, country)
            .then(response => {
                console.log('Country updated', response.data);
                history.push('/countries');
            })
            .catch(error => {
                console.log('Something went wrong', error);
            });
    }

    useEffect(() => {
        if (id) {
            countryService.get(id)
                .then(country => {
                    setName(country.data.name);
                })
                .catch(error => {
                    console.log('Something went wrong', error);
                })
        }
    }, [])


    return (
        <div className="container">
            <h3 style={{ marginTop: 20, marginBottom: 20, marginLeft: 2 }}>Обновить страну</h3>
            <form>
                <div className="form-group">
                    <input style={{ marginBottom: 10, width: 600 }}
                           type="text"
                           className="form-control col-4"
                           id="name"
                           value={name}
                           onChange={(e) => setName(e.target.value)}
                           placeholder="Введите страну"
                    />
                </div>
                <div>
                    <button style={{ marginTop: 20, color: 'white' }} className="btn btn-dark mb-2"
                            onClick={(e) => saveCountry(e)}>
                        Сохранить
                    </button>
                    <Link to="/countries" style={{ marginLeft: 40, marginTop: 20, color: 'white' }} className="btn btn-dark mb-2 ">Назад</Link>
                </div>
            </form>
        </div>
    );
}

export default UpdateCountry;