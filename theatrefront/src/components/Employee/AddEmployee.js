import {Link, useHistory} from "react-router-dom";
import { useState, useEffect } from "react";
import employeeService from "../../service/EmployeeService";
import genderService from "../../service/GenderService";
import employeeTypeService from "../../service/EmployeeTypeService";

const AddEmployee = () => {
    const [type, setType] = useState({});
    const [fio, setFio] = useState('');
    const [gender, setGender] = useState({});
    const [birthDate, setBirthDate] = useState('');
    const [childrenAmount, setChildrenAmount] = useState('');
    const [salary, setSalary] = useState('');
    const [hireDate, setHireDate] = useState('');
    const [types, setTypes] = useState([]);
    const [genders, setGenders] = useState([]);

    const [typeDirty, setTypeDirty] = useState(false);
    const [fioDirty, setFioDirty] = useState(false);
    const [genderDirty, setGenderDirty] = useState(false);
    const [birthDateDirty, setBirthDateDirty] = useState(false);
    const [childrenAmountDirty, setChildrenAmountDirty] = useState(false);
    const [salaryDirty, setSalaryDirty] = useState(false);
    const [hireDateDirty, setHireDateDirty] = useState(false);

    const [typeError, setTypeError] = useState('Поле не может быть пустым');
    const [fioError, setFioError] = useState('Поле не может быть пустым');
    const [genderError, setGenderError] = useState('Поле не может быть пустым');
    const [birthDateError, setBirthDateError] = useState('Поле не может быть пустым');
    const [childrenAmountError, setChildrenAmountError] = useState('Поле не может быть пустым');
    const [salaryError, setSalaryError] = useState('Поле не может быть пустым');
    const [hireDateError, setHireDateError] = useState('Поле не может быть пустым');

    const [formValid, setFormValid] = useState(false);

    const history = useHistory();

    useEffect(() => {
        employeeTypeService.getAllList()
            .then(response => {
                setTypes(response.data);
            })
            .catch(error => {
                console.log('Something went wrong', error);
            });

        genderService.getAllList()
            .then(response => {
                setGenders(response.data);
            })
            .catch(error => {
                console.log('Something went wrong', error);
            });
    }, [])

    const blurHandler = (e) => {
        switch (e.target.name) {
            case 'type':
                setTypeDirty(true);
                break;
            case 'fio':
                setFioDirty(true);
                break;
            case 'gender':
                setGenderDirty(true);
                break;
            case 'birthDate':
                setBirthDateDirty(true);
                break;
            case 'childrenAmount':
                setChildrenAmountDirty(true);
                break;
            case 'salary':
                setSalaryDirty(true);
                break;
            case 'hireDate':
                setHireDateDirty(true);
                break;
        }
    }

    const TypeHandler = (value) => {
        setType(value);
        setTypeError('');
    }

    const FioHandler = (e) => {
        let value = e.target.value;
        setFio(value);
        if (!value || value.trim() === '')
            setFioError('Поле не может быть пустым');
        else
            setFioError('');
    }

    const GenderHandler = (value) => {
        setGender(value);
        setGenderError('');
    }

    const BirthDateHandler = (e) => {
        let value = e.target.value;
        setBirthDate(value);
        if (!value || value.trim() === '')
            setBirthDateError('Поле не может быть пустым');
        else
            setBirthDateError('');
    }

    const ChildrenAmountHandler = (e) => {
        let value = e.target.value;
        setChildrenAmount(value);
        if (!value || value.trim() === '')
            setChildrenAmountError('Поле не может быть пустым');
        else if (value < 0)
            setChildrenAmountError('Кол-во детей должен быть неотрицательным')
        else
            setChildrenAmountError('');
    }

    const SalaryHandler = (e) => {
        let value = e.target.value;
        setSalary(value);
        if (!value || value.trim() === '')
            setSalaryError('Salary is required');
        else if (value <= 0)
            setSalaryError('Зарплата должна быть больше 0')
        else
            setSalaryError('');
    }

    const HireDateHandler = (e) => {
        let value = e.target.value;
        setHireDate(value);
        if (!value || value.trim() === '')
            setHireDateError('Hire date is required');
        else
            setHireDateError('');
    }

    useEffect(() => {
        if (typeError || fioError || genderError || birthDateError || childrenAmountError || salaryError || hireDateError) {
            setFormValid(false);
        } else {
            setFormValid(true);
        }
    }, [typeError, fioError, genderError, birthDateError, childrenAmountError, salaryError, hireDateError]);

    const saveEmployee = (e) => {
        e.preventDefault();
        const employee = {
            type: {id: Number(type)},
            fio,
            gender: {id: Number(gender)},
            birthDate,
            childrenAmount: Number(childrenAmount),
            salary: Number(salary),
            hireDate
        };
        employeeService.create(employee)
            .then(response => {
                console.log('Employee created', response.data);
                history.push('/employees');
            })
            .catch(error => {
                console.log('Something went wrong', error);
            });
    };

    return (
        <div className="container">
            <h3 style={{ marginTop: 20, marginBottom: 20, marginLeft: 2 }}>Добавить нового сотрудника</h3>
            <form>
                <div>
                    <select
                        onChange={e => TypeHandler(Number(e.target.value))}
                        style={{ marginBottom: 10, width:600 }}
                        className='form-select'
                        name="type"
                        onBlur={e => blurHandler(e)}
                    >
                        <option>Выберите тип</option>
                        {
                            types && types.map((type) => (
                                <option key={type.id} value={type.id.toString()}>
                                    {type.type}
                                </option>
                            ))
                        }
                    </select>
                    {(typeError && typeDirty) && <div style={{ color: "#D10000", marginLeft: 2, marginBottom: 5 }}>{typeError}</div>}
                </div>

                <div className="form-group">
                    <label style={{ marginBottom: 10, width: 600 }}>Введите ФИО:</label>
                    <input onChange={e => FioHandler(e)} onBlur={e => blurHandler(e)} name='fio' style={{ marginBottom: 10, width: 600 }}
                           type="text"
                           className="form-control col-4"
                           placeholder="Введите ФИО"
                           value={fio}
                    />
                    {(fioError && fioDirty) && <div style={{ color: "#D10000", marginLeft: 2, marginBottom: 5 }}>{fioError}</div>}
                </div>

                <div>
                    <select
                        onChange={e => GenderHandler(Number(e.target.value))}
                        style={{ marginBottom: 10, width: 600 }}
                        className='form-select'
                        name="gender"
                        onBlur={e => blurHandler(e)}
                    >
                        <option>Выберите пол</option>
                        {
                            genders && genders.map((gender) => (
                                <option key={gender.id} value={gender.id.toString()}>
                                    {gender.type}
                                </option>
                            ))
                        }
                    </select>
                    {(genderError && genderDirty) && <div style={{ color: "#D10000", marginLeft: 2, marginBottom: 5 }}>{genderError}</div>}
                </div>

                <div className="form-group">
                    <label style={{ marginBottom: 10, width: 600 }}>Введите дату рождения:</label>
                    <input onChange={e => BirthDateHandler(e)} onBlur={e => blurHandler(e)} name='birthDate' style={{ marginBottom: 10, width: 600 }}
                           type="date"
                           className="form-control col-4"
                           placeholder="Введите дату рождения"
                           value={birthDate}
                    />
                    {(birthDateError && birthDateDirty) && <div style={{ color: "#D10000", marginLeft: 2, marginBottom: 5 }}>{birthDateError}</div>}
                </div>

                <div className="form-group">
                    <label style={{ marginBottom: 10, width: 600 }}>Введите количество детей:</label>
                    <input onChange={e => ChildrenAmountHandler(e)} onBlur={e => blurHandler(e)} name='childrenAmount' style={{ marginBottom: 10, width: 600 }}
                           type="number"
                           className="form-control col-4"
                           placeholder="Введите количество детей"
                           value={childrenAmount}
                    />
                    {(childrenAmountError && childrenAmountDirty) && <div style={{ color: "#D10000", marginLeft: 2, marginBottom: 5 }}>{childrenAmountError}</div>}
                </div>

                <div className="form-group">
                    <label style={{ marginBottom: 10, width: 600 }}>Введите зарплату:</label>
                    <input onChange={e => SalaryHandler(e)} onBlur={e => blurHandler(e)} name='salary' style={{ marginBottom: 10, width: 600 }}
                           type="number"
                           className="form-control col-4"
                           placeholder="Введите зарплату"
                           value={salary}
                    />
                    {(salaryError && salaryDirty) && <div style={{ color: "#D10000", marginLeft: 2, marginBottom: 5 }}>{salaryError}</div>}
                </div>

                <div className="form-group">
                    <label style={{ marginBottom: 10, width: 600 }}>Введите дату приема на работу:</label>
                    <input onChange={e => HireDateHandler(e)} onBlur={e => blurHandler(e)} name='hireDate' style={{ marginBottom: 10, width: 600 }}
                           type="date"
                           className="form-control col-4"
                           placeholder="Введите дату приема на работу"
                           value={hireDate}
                    />
                    {(hireDateError && hireDateDirty) && <div style={{ color: "#D10000", marginLeft: 2, marginBottom: 5 }}>{hireDateError}</div>}
                </div>
                <div>
                    <button disabled={!formValid} style={{ marginTop: 20, color: 'white' }} className="btn btn-dark mb-2"
                            onClick={(e) => saveEmployee(e)}>
                        Сохранить
                    </button>
                    <Link to="/employees" style={{ marginLeft: 40, marginTop: 20, color: 'white' }} className="btn btn-dark mb-2 ">Назад</Link>
                </div>
            </form>
        </div>
    );
}

export default AddEmployee;
