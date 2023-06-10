import { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import employeeService from "../../service/EmployeeService";
import employeeTypeService from "../../service/EmployeeTypeService";
import genderService from "../../service/GenderService";
import actorService from "../../service/ActorService";


const UpdateEmployee = () => {
    const [type, setType] = useState("");
    const [fio, setFio] = useState("");
    const [gender, setGender] = useState("");
    const [birthDate, setBirthDate] = useState("");
    const [childrenAmount, setChildrenAmount] = useState(Number);
    const [salary, setSalary] = useState(Number);
    const [hireDate, setHireDate] = useState("");

    const [types, setTypes] = useState([]);
    const [genders, setGenders] = useState([]);

    const history = useHistory();

    let { id } = useParams();

    const saveEmployee = (e) => {
        e.preventDefault();

        const employee =
        {type: {id : Number(type)}, fio, gender: {id : Number(gender)}, birthDate, childrenAmount, salary, hireDate};

        employeeService.update(id, employee)
            .then(response => {
                console.log('Employee updated', response.data);
                history.push('/employees');
            })
            .catch(error => {
                console.log('Something went wrong', error);
            });
    }

    useEffect(() => {
        if (id) {
            employeeService.get(id)
                .then(employee => {
                    const tempType = employee.data.type.id;
                    setFio(employee.data.fio);
                    const tempGender = employee.data.gender.id;
                    setBirthDate(employee.data.birthDate);
                    setChildrenAmount(employee.data.childrenAmount);
                    setSalary(employee.data.salary);
                    setHireDate(employee.data.hireDate);
                    employeeTypeService.getAllList()
                        .then(response => {
                            console.log(response.data);
                            setTypes(response.data);
                            setType(tempType);
                        })
                        .catch(error => {
                            console.log('Something went wrong', error);
                        })
                    genderService.getAllList()
                        .then(response => {
                            console.log(response.data);
                            setGenders(response.data);
                            setGender(tempGender);
                        })
                        .catch(error => {
                            console.log('Something went wrong', error);
                        })
                })
                .catch(error => {
                    console.log('Something went wrong', error);
                })
        } else {
            employeeTypeService.getAllList()
                .then(response => {
                    console.log(response.data);
                    setTypes(response.data);
                })
                .catch(error => {
                    console.log('Something went wrong', error);
                })
            genderService.getAllList()
                .then(response => {
                    console.log(response.data);
                    setGenders(response.data);
                })
                .catch(error => {
                    console.log('Something went wrong', error);
                })
        }
    }, [])

    return (
        <div className="container">
            <h3 style={{ marginTop: 20, marginBottom: 20 }}>Обновить сотрудника</h3>
            <form>
                <div className="form-group">
                    <label style={{ marginBottom: 10, width: 600 }}>Выберите тип:</label>
                    <select style={{ marginBottom: 10, width: 600 }}
                        className="form-control col-4"
                        id="type"
                        value={type}
                        onChange={(e) => setType(Number(e.target.value))}>
                        {
                            types && types.map((type) => (
                                <option key={type.id} value={type.id.toString()}>
                                    {type.type}
                                </option>
                            ))
                        }
                    </select>
                </div>
                <div className="form-group">
                    <label style={{ marginBottom: 10, width: 600 }}>Введите ФИО:</label>
                    <input style={{ marginBottom: 10, width: 600 }}
                        type="text"
                        className="form-control"
                        value={fio}
                        onChange={e => setFio(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label style={{ marginBottom: 10, width: 600 }}>Пол:</label>
                    <select style={{ marginBottom: 10, width: 600 }}
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
                    <label style={{ marginBottom: 10, width: 600 }}>Дата рождения:</label>
                    <input style={{ marginBottom: 10, width: 600 }}
                        type="date"
                        className="form-control"
                        value={birthDate}
                        onChange={e => setBirthDate(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label style={{ marginBottom: 10, width: 600 }}>Количество детей:</label>
                    <input style={{ marginBottom: 10, width: 600 }}
                        type="number"
                        className="form-control"
                        value={childrenAmount}
                        onChange={e => setChildrenAmount(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label style={{ marginBottom: 10, width: 600 }}>Зарплата:</label>
                    <input style={{ marginBottom: 10, width: 600 }}
                        type="number"
                        className="form-control"
                        value={salary}
                        onChange={e => setSalary(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label style={{ marginBottom: 10, width: 600 }}>Дата найма:</label>
                    <input style={{ marginBottom: 10, width: 600 }}
                        type="date"
                        className="form-control"
                        value={hireDate}
                        onChange={e => setHireDate(e.target.value)}
                    />
                </div>
                <div>
                    <button style={{ marginTop: 20, color: 'white' }} className="btn btn-dark mb-2"
                            onClick={(e) => saveEmployee(e)}>
                        Сохранить
                    </button>
                    <Link to="/employees" style={{ marginLeft: 40, marginTop: 20, color: 'white' }} className="btn btn-dark mb-2 ">Назад</Link>
                </div>
            </form>

        </div>
    );
}

export default UpdateEmployee;
