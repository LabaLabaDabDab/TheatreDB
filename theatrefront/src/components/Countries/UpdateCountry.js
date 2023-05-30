import { useState } from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import countryService from "../../service/CountrySerivce";

const UpdateActor = () => {

    const [name, setName] = useState('');
    const [country, setCountry] = useState('');
    const [gender, setGender] = useState('');
    const [nameDirty, setNameDirty] = useState(false);
    const [countryDirty, setCountrDirty] = useState(false);
    const [genderDirty, setGenderDirty] = useState(false);
    const [nameError, setNameError] = useState('Поле не может быть пустым');
    const [countryError, setCountryError] = useState('Поле не может быть пустым');
    const [genderError, setGenderError] = useState('Поле не может быть пустым');

    const history = useHistory();

    let { id } = useParams();

    const saveCountry = (e) => {
        e.preventDefault();

        const country = {id, name};

        //update
        countryService.update(actor)
            .then(response => {
                console.log('Actor updated', response.data);
                history.push('/actors');
            })
            .catch(error => {
                console.log('Something went wrong', error);
            });

    }

    useEffect(() => {
        if (id) {
            countryService.get(id)
                .then(actor => {
                    setName(actor.data.name);
                    setCountry(actor.data.country);
                    setGender(actor.data.gender);
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
                           value={gender}
                           onChange={(e) => setGender(e.target.value)}
                           placeholder="Введите пол"
                    />
                </div>
                <div>
                    <button style={{ marginTop: 20, color: 'white' }} className="btn btn-dark mb-2"
                            onClick={(e) => saveCountry(e)}>
                        Сохранить
                    </button>
                    <Link to="/actors" style={{ marginLeft: 40, marginTop: 20, color: 'white' }} className="btn btn-dark mb-2 ">К списку авторов</Link>
                </div>
            </form>

        </div>
    );
}

export default UpdateActor;