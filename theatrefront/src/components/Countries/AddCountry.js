import {Link, useHistory, useParams} from "react-router-dom";
import { useState, useEffect } from "react";
import countryService from "../../service/CountryService";


const AddCountry = () => {
    const [name, setName] = useState('');

    const [nameDirty, setNameDirty] = useState(false);

    const [nameError, setNameError] = useState('Поле не может быть пустым');

    const [formValid, setFormValid] = useState(false);

    const history = useHistory();

    let { id } = useParams();


    useEffect(() => {
        if (nameError) {
            setFormValid(false)
        } else {
            setFormValid(true)
        }
    }, [nameError])

    const blurHandler = (e) => {
        switch (e.target.name) {
            case 'Name':
                setNameDirty(true)
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

    const saveName = (e) => {
        e.preventDefault();
        const countries = {
            name,
            id
        };

        console.log(countries);
        countryService.create(countries)
            .then(response => {
                console.log('Country created', response.data);
                history.push('/countries');
            })
            .catch(error => {
                console.log('Something went wrong', error);
            });
    };


    return (
        <div className="container">
            <h3 style={{ marginTop: 20, marginBottom: 20, marginLeft: 2 }}>Добавить страну</h3>
            <form>
                <div className="form-group">
                    {(nameError && nameDirty) && <div style={{ color: "#D10000", marginLeft: 2, marginBottom: 5 }}>{nameError}</div>}
                    <input onChange={e => NameHandler(e)} onBlur={e => blurHandler(e)} name='name' style={{ marginBottom: 10, width: 600 }}
                           type="text"
                           className="form-control col-4"
                           id="name"
                           value={name}
                           placeholder="Введите страну"
                    />
                </div>
                <div>
                    <button disabled={!formValid} style={{ marginTop: 20, color: 'white' }} className="btn btn-dark mb-2"
                            onClick={(e) => saveName(e)}>
                        Сохранить
                    </button>
                    <Link to="/countries" style={{ marginLeft: 40, marginTop: 20, color: 'white' }} className="btn btn-dark mb-2 ">Назад</Link>
                </div>
            </form>
        </div>
    );
}

export default AddCountry;