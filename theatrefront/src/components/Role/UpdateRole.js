import { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import genderService from "../../service/GenderService";
import performanceService from "../../service/PerformanceService";
import roleService from "../../service/RoleService";

const UpdateRole = () => {
    const [name, setName] = useState("");
    const [main, setMain] = useState(false);
    const [age, setAge] = useState(Number);
    const [gender, setGender] = useState("");
    const [height, setHeight] = useState(Number);
    const [performance, setPerformance] = useState("");

    const [genders, setGenders] = useState([]);
    const [performances, setPerformances] = useState([]);

    let { id } = useParams();

    const history = useHistory();

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

        roleService.update(id, Role)
            .then(response => {
                console.log('Role updated', response.data);
                history.push('/roles');
            })
            .catch(error => {
                console.log('Something went wrong', error);
            });
    }

    useEffect(() => {
        if (id) {
            roleService.get(id)
                .then(role => {
                    setName(role.data.name);
                    setMain(role.data.main);
                    setAge(role.data.age);
                    const tempGender = role.data.gender.id;
                    setHeight(role.data.height);
                    const tempPerformance = role.data.performance.id;

                    genderService.getAllList()
                        .then(response => {
                            console.log(response.data);
                            setGenders(response.data);
                            setGender(tempGender);
                        })
                        .catch(error => {
                            console.log('Something went wrong', error);
                        });

                    performanceService.getAllList()
                        .then(response => {
                            console.log(response.data);
                            setPerformances(response.data);
                            setPerformance(tempPerformance);
                        })
                        .catch(error => {
                            console.log('Something went wrong', error);
                        });
                })
                .catch(error => {
                    console.log('Something went wrong', error);
                });
        } else {
            genderService.getAllList()
                .then(response => {
                    console.log(response.data);
                    setGenders(response.data);
                })
                .catch(error => {
                    console.log('Something went wrong', error);
                });

            performanceService.getAllList()
                .then(response => {
                    console.log(response.data);
                    setPerformances(response.data);
                })
                .catch(error => {
                    console.log('Something went wrong', error);
                });
        }
    }, [])

    return (
        <div className="container">
            <h3 style={{ marginTop: 20, marginBottom: 20, marginLeft: 2 }}>Обновить роль</h3>
            <form>
                <div className="form-group">
                    <label style={{ marginBottom: 10, width: 600 }}>Введите имя героя:</label>
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
                    <label style={{ marginBottom: 10, width: 600 }}>Выберите является роль главной:</label>
                    <select onChange={e => setMain(e.target.value)}
                            style={{ marginBottom: 10, width: 600 }}
                            className="form-control"
                            id="main"
                            value={main}>
                        <option value={true}>Да</option>
                        <option value={false}>Нет</option>
                    </select>
                </div>
                <div className="form-group">
                    <label style={{ marginBottom: 10 }}>Выберите возраст героя:</label>
                    <input onChange={e => setAge(Number(e.target.value))}
                           style={{ marginBottom: 10, width: 600 }}
                           type="number"
                           className="form-control"
                           id="age"
                           value={age}
                    />
                </div>
                <div className="form-group">
                    <label style={{ marginBottom: 10, width: 600 }}>Выберите гендер героя:</label>
                    <select
                        style={{ marginBottom: 10, width: 600 }}
                        className="form-control col-4"
                        id="gender"
                        value={gender}
                        onChange={(e) => setGender(Number(e.target.value))}>
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
                    <label style={{ marginBottom: 10 }}>Введите рост героя:</label>
                    <input onChange={e => setHeight(Number(e.target.value))}
                           style={{ marginBottom: 10, width: 600 }}
                           type="number"
                           className="form-control"
                           id="height"
                           value={height}
                    />
                </div>
                <div className="form-group">
                    <label style={{ marginBottom: 10, width: 600 }}>Выберите произведение:</label>
                    <select
                        style={{ marginBottom: 10, width: 600 }}
                        className="form-control col-4"
                        id="performance"
                        value={performance}
                        onChange={(e) => setPerformance(Number(e.target.value))}>
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
                    <button style={{ marginTop: 20, color: 'white' }} className="btn btn-dark mb-2"
                            onClick={(e) => saveRole(e)}>
                        Сохранить
                    </button>
                    <Link to="/authors" style={{ marginLeft: 40, marginTop: 20, color: 'white' }} className="btn btn-dark mb-2 ">Назад</Link>
                </div>
            </form>

        </div>
    );
}

export default UpdateRole;