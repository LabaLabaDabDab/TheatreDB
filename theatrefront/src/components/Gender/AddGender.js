import {Link, useHistory, useParams} from "react-router-dom";
import { useState, useEffect } from "react";
import genderService from "../../service/GenderService";


const AddGender = () => {
    const [type, setGender] = useState('');

    const [typeDirty, setGenderDirty] = useState(false);

    const [typeError, setGenderError] = useState('Поле не может быть пустым');

    const [formValid, setFormValid] = useState(false);

    const history = useHistory();

    let { id } = useParams();


    useEffect(() => {
        if (typeError) {
            setFormValid(false)
        } else {
            setFormValid(true)
        }
    }, [typeError])

    const blurHandler = (e) => {
        switch (e.target.name) {
            case 'Gender':
                setGenderDirty(true)
                break
        }
    }

    const GenderHandler = (e) => {
        setGender(e.target.value)
        if (e.target.value.length < 2 || e.target.value.length > 20)
            setGenderError('Некорректная длина')
        else if (!e.target.value)
            setGenderError('Поле не может быть пустым')
        else setGenderError('')
    }

    const saveGender = (e) => {
        e.preventDefault();
        const gender = {
            type,
            id
        };

        console.log(gender);
        genderService.create(gender)
            .then(response => {
                console.log('Gender created', response.data);
                history.push('/genders');
            })
            .catch(error => {
                console.log('Something went wrong', error);
            });
    };


    return (
        <div className="container">
            <h3 style={{ marginTop: 20, marginBottom: 20, marginLeft: 2 }}>Добавить гендер</h3>
            <form>
                <div className="form-group">
                    {(typeError && typeDirty) && <div style={{ color: "#D10000", marginLeft: 2, marginBottom: 5 }}>{typeError}</div>}
                    <input onChange={e => GenderHandler(e)} onBlur={e => blurHandler(e)} name='type' style={{ marginBottom: 10, width: 600 }}
                           type="text"
                           className="form-control col-4"
                           id="type"
                           value={type}
                           placeholder="Введите гендер"
                    />
                </div>
                <div>
                    <button disabled={!formValid} style={{ marginTop: 20, color: 'white' }} className="btn btn-dark mb-2"
                            onClick={(e) => saveGender(e)}>
                        Сохранить
                    </button>
                    <Link to="/genders" style={{ marginLeft: 40, marginTop: 20, color: 'white' }} className="btn btn-dark mb-2 ">Назад</Link>
                </div>
            </form>
        </div>
    );
}

export default AddGender;