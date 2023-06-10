import {Link, useHistory, useParams} from "react-router-dom";
import { useState, useEffect } from "react";
import genderService from "../../service/GenderService";
import performanceService from "../../service/PerformanceService";
import roleService from "../../service/RoleService";


const AddRole = () => {
    const [name, setName] = useState("");
    const [main, setMain] = useState(false);
    const [age, setAge] = useState(Number);
    const [gender, setGender] = useState("");
    const [height, setHeight] = useState(Number);
    const [performance, setPerformance] = useState("");

    const [genders, setGenders] = useState([]);
    const [performances, setPerformances] = useState([]);

    const [nameDirty, setNameDirty] = useState(false);
    const [mainDirty, setMainDirty] = useState(false);
    const [ageDirty, setAgeDirty] = useState(false);
    const [genderDirty, setGenderDirty] = useState(false);
    const [heightDirty, setHeightDirty] = useState(false);
    const [performanceDirty, setPerformanceDirty] = useState(false);


    const [nameError, setNameError] = useState('Поле не может быть пустым');
    const [mainError, setMainError] = useState('Поле не может быть пустым');
    const [ageError, setAgeError] = useState('Поле не может быть пустым');
    const [genderError, setGenderError] = useState('Поле не может быть пустым');
    const [heightError, setHeightError] = useState('Поле не может быть пустым');
    const [performanceError, setPerformanceError] = useState('Поле не может быть пустым');

    const [formValid, setFormValid] = useState(false);

    const history = useHistory();

    let { id } = useParams();

    useEffect(() => {
        init();
    }, []);

    const init = () => {
        genderService.getAllList()
            .then(response => {
                console.log(response.data);
                setGenders(response.data);
            })
            .catch(error => {
                console.log('Something went wrong', error);
            })
        performanceService.getAllList()
            .then(response => {
                console.log(response.data);
                setPerformances(response.data);
            })
            .catch(error => {
                console.log('Something went wrong', error);
            })
    }

    useEffect(() => {
        if (nameError || mainError || ageError || genderError || heightError || performanceError) {
            setFormValid(false);
        } else {
            setFormValid(true);
        }
    }, [nameError, mainError, ageError, genderError, heightError, heightError])

    const blurHandler = (e) => {
        switch (e.target.name) {
            case 'name':
                setNameDirty(true)
                break
            case 'main':
                setMainDirty(true)
                break
            case 'age':
                setAgeDirty(true)
                break
            case 'gender':
                setGenderDirty(true)
                break
            case 'height':
                setHeightDirty(true)
                break
            case 'performance':
                setPerformanceDirty(true)
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

    const MainHandler = (e) => {
        setMain(JSON.parse(e.target.value))
        setMainError('')
    }

    const AgeHandler = (e) => {
        let value = e.target.value
        setAge(value)
        if (!value || value === '')
            setAgeError('Поле не может быть пустым')
        else if (value <= 0)
            setAgeError('Кол-во билетов должно быть больше 0')
        else
            setAgeError('')
    }

    const HeightHandler = (e) => {
        let value = e.target.value
        setHeight(value)
        if (!value || value === '')
            setHeightError('Поле не может быть пустым')
        else if (value <= 0)
            setHeightError('Кол-во билетов должно быть больше 0')
        else
            setHeightError('')
    }

    const GenderHandler = (value) => {
        setGender(value)
        if (!value)
            setGenderError('Поле не может быть пустым')
        else setGenderError('')
    }

    const PerformanceHandler = (value) => {
        setPerformance(value)
        if (!value)
            setPerformanceError('Поле не может быть пустым')
        else setPerformanceError('')
    }


    const saveRole = (e) => {
        e.preventDefault();
        const Role = {
            name,
            main,
            age,
            gender: {id: Number(gender)},
            height,
            performance: {id: Number(performance)}
        };

        console.log(Role);
        roleService.create(Role)
            .then(response => {
                console.log('Role created', response.data);
                history.push('/roles');
            })
            .catch(error => {
                console.log('Something went wrong', error);
            });
    };

    return (
        <div className="container">
            <h3 style={{ marginTop: 20, marginBottom: 20, marginLeft: 2 }}>Добавить роль</h3>
            <form>
                <div className="form-group">
                    {(nameError && nameDirty) && <div style={{ color: "#D10000", marginLeft: 2, marginBottom: 5 }}>{nameError}</div>}
                    <label style={{ marginBottom: 10, width: 600 }}>Введите имя героя:</label>
                    <input onChange={e => NameHandler(e)} onBlur={e => blurHandler(e)} name='name' style={{ marginBottom: 10, width: 600 }}
                           type="text"
                           className="form-control col-4"
                           id="name"
                           value={name}
                           placeholder="Введите имя"
                    />
                </div>
                <div className="form-group">
                    {(mainError && mainDirty) && <div style={{ color: "#D10000", marginLeft: 2, marginBottom: 5 }}>{mainError}</div>}
                    <label style={{ marginBottom: 10, width: 600 }}>Выберите является роль главной:</label>
                    <select onChange={e => MainHandler(e)} onBlur={e => blurHandler(e)} name='main' style={{ marginBottom: 10, width: 600 }}
                            className="form-control col-4"
                            id="main"
                            value={main}>
                        <option value={true}>True</option>
                        <option value={false}>False</option>
                    </select>
                </div>
                <div className="form-group">
                    {(ageError && ageDirty) && <div style={{ color: "#D10000", marginLeft: 2, marginBottom: 5 }}>{ageError}</div>}
                    <label style={{ marginBottom: 10, width: 600 }}>Введите возраст героя:</label>
                    <input onChange={e => AgeHandler(e)} onBlur={e => blurHandler(e)} name='age' style={{ marginBottom: 10, width: 600 }}
                           type="number"
                           className="form-control col-4"
                           id="age"
                           value={age}
                           placeholder="Введите возвраст"
                    />
                </div>
                <div>
                    <label style={{ marginBottom: 10, width: 600 }}>Выберите гендер героя:</label>
                    <select
                        onChange={e => GenderHandler(Number(e.target.value))}
                        style={{ marginBottom: 10, width:600 }}
                        className='form-select'
                        id="gender">
                        <option>Выберите гендер:</option>
                        {
                            genders && genders.map((gender) => (
                                <option key={gender.id} value={gender.id.toString()}>
                                    {gender.type}
                                </option>
                            ))
                        }
                    </select>
                </div>
                <div className="form-group">
                    {(heightError && heightDirty) && <div style={{ color: "#D10000", marginLeft: 2, marginBottom: 5 }}>{heightError}</div>}
                    <label style={{ marginBottom: 10, width: 600 }}>Введите рост героя:</label>
                    <input onChange={e => HeightHandler(e)} onBlur={e => blurHandler(e)} name='height' style={{ marginBottom: 10, width: 600 }}
                           type="number"
                           className="form-control col-4"
                           id="height"
                           value={height}
                           placeholder="Введите рост героя"
                    />
                </div>
                <div>
                    <label style={{ marginBottom: 10, width: 600 }}>Выберите произведение:</label>
                    <select
                        onChange={e => PerformanceHandler(Number(e.target.value))}
                        style={{ marginBottom: 10, width:600 }}
                        className='form-select'
                        id="performance">
                        <option>Выберите произведение:</option>
                        {
                            performances && performances.map((performance) => (
                                <option key={performance.id} value={performance.id.toString()}>
                                    {performance.author.title}
                                </option>
                            ))
                        }
                    </select>
                </div>

                <div>
                    <button disabled={!formValid} style={{ marginTop: 20, color: 'white' }} className="btn btn-dark mb-2"
                            onClick={(e) => saveRole(e)}>
                        Сохранить
                    </button>
                    <Link to="/roles" style={{ marginLeft: 40, marginTop: 20, color: 'white' }} className="btn btn-dark mb-2 ">Назад</Link>
                </div>
            </form>
        </div>
    );
}

export default AddRole;