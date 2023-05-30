import { useState } from "react";
import { useParams } from "react-router-dom";
import { useHistory } from 'react-router-dom';
import { Link } from "react-router-dom";
import { useEffect } from "react";
import employeeService from "../../service/EmployeeService";

const AddEmployee = () => {
    const [fio, setFio] = useState('');
    const [gender, setGender] = useState('');
    const [childrenAmount, setChildrenAmount] = useState('');
    const [salary, setSalary] = useState('');
    const [hireDate, setHireDate] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [type, setType] = useState('');
    const [fioDirty, setFioDirty] =  useState(false);
    const [genderDirty, setGenderDirty] =  useState(false);
    const [childrenAmountDirty, setChildrenAmountDirty] =  useState(false);
    const [salaryDirty, setSalaryDirty] =  useState(false);
    const [hireDateDirty, setHireDateDirty] =  useState(false);
    const [birthDateDirty, setBirthDateDirty] =  useState(false);
    const [typeDirty, setTypeDirty] =  useState(false);
    const [fioError, setFioError] = useState('Поле не может быть пустым');
    const [genderError, setGenderError] = useState('Поле не может быть пустым');
    const [childrenAmountError, setChildrenAmountError] = useState('Поле не может быть пустым');
    const [salaryError, setSalaryError] = useState('Поле не может быть пустым');
    const [hireDateError, setHireDateError] = useState('Поле не может быть пустым')
    const [birthDateError, setBirthDateError] = useState('Поле не может быть пустым');
    const [typeError, setTypeError] = useState('Поле не может быть пустым');

    const [formValid, setFormValid] = useState(false);

    const history = useHistory();

    let { id } = useParams();

    useEffect( () => {
        if (fioError || childrenAmountError || genderError || salaryError || hireDateError || typeError) {
            setFormValid(false)
        } else {
            setFormValid(true)
        }
    }, [fioError, childrenAmountError, genderError, salaryError, hireDateError, typeError])

    const blurHandler = (e) => {
        switch (e.target.name) {
            case 'fio':
                setFioDirty(true)
                break
            case 'childrenAmount':
                setChildrenAmountDirty(true)
                break
            case 'gender':
                setGenderDirty(true)
                break
            case 'salary':
                setSalaryDirty(true)
                break
            case 'hireDate':
                setHireDateDirty(true)
                break
            case 'type':
                setTypeDirty(true)
                break
        }
    }

    const fioHandler = (e) => {
        setFio(e.target.value)
        if (e.target.value.length < 3 || e.target.value.length > 50)
            setFioError('Некорректная длина')
        else if (!e.target.value)
            setFioError('Поле не может быть пустым')
        else setFioError('')
    }

    const typeHandler = (e) => {
        setType(e.target.value)
        if (e.target.value.length < 3 || e.target.value.length > 50)
            setTypeError('Некорректная длина')
        else if (!e.target.value)
            setTypeError('Поле не может быть пустым')
        else setTypeError('')
    }

    const childrenAmountHandler = (e) => {
        setChildrenAmount(e.target.value)
        if (e.target.value.length < 2 || e.target.value.length > 30)
            setChildrenAmountError('Некорректная длина')
        else if (!e.target.value)
            setChildrenAmountError('Поле не может быть пустым')
        else setChildrenAmountError('')
    }

    const genderHandler = (e) => {
        setGender(e.target.value)
        if ((e.target.value.toLowerCase() === 1) || (e.target.value.toLowerCase() === 2)) {
            setGenderError('')
        } else if (!e.target.value || e.target.value === '') {
            setGenderError('Поле не может быть пустым')
        } else {
            setGenderError('Поле может содержать значения "1/2 1-мужчина, 2-женщина"')
        }
    }

    const salaryHandler = (e) => {
        setChildrenAmount(e.target.value)
        if (e.target.value.length < 2 || e.target.value.length > 30)
            setChildrenAmountError('Некорректная длина')
        else if (!e.target.value)
            setChildrenAmountError('Поле не может быть пустым')
        else setChildrenAmountError('')
    }

    const hireDateHandler = (e) => {
        setHireDate(e.target.value)
        if (e.target.value.date || e.target.value.dateStyle)
            setHireDateError('Некорректная дата')
        else if (!e.target.value)
            setHireDateError('Поле не может быть пустым')
        else setHireDateError('')
    }

    const birthDateHandler = (e) => {
        setBirthDate(e.target.value)
        if (e.target.value.date || e.target.value.dateStyle)
            setBirthDateError('Некорректная дата')
        else if (!e.target.value)
            setBirthDateError('Поле не может быть пустым')
        else setBirthDateError('')
    }

    const saveEmployee = (e) => {
        e.preventDefault();
        const employee = { id, fio, gender, birthDate, childrenAmount, salary, hireDate, type};
        employeeService.create(employee)
            .then(response => {
                console.log('Employee data added', response.data);
                history.push('/employees');
            })
            .catch(error => {
                console.log('Something went wrong', error);
            });
    }


    return (
        <div className="container">
            <h3 style={{ marginTop: 20, marginBottom: 20, marginLeft: 2 }}>Добавить нового сотрудника</h3>
            <form>
                <div className="form-group">
                    {(typeError && typeDirty) && <div style={{ color: "#D10000", marginLeft: 2, marginBottom: 5 }}>{typeError}</div>}
                    <input onChange={e => typeHandler(e)} onBlur={e => blurHandler(e)} name='type' style={{ marginBottom: 10, width: 600 }}
                           type="text"
                           className="form-control col-4"
                           id="type"
                           value={type}
                           placeholder="Введите тип сотрудника"
                    />
                </div>
                <div className="form-group">
                    {(fioError && fioDirty) && <div style={{ color: "#D10000", marginLeft: 2, marginBottom: 5 }}>{fioError}</div>}
                    <input onChange={e => fioHandler(e)} onBlur={e => blurHandler(e)} name='fio' style={{ marginBottom: 10, width: 600 }}
                           type="text"
                           className="form-control col-4"
                           id="fio"
                           value={fio}
                           placeholder="Введите ФИО"
                    />
                </div>
                <div className="form-group">
                    {(genderError && genderDirty) && <div style={{ color: "#D10000", marginLeft: 2, marginBottom: 5 }}>{genderError}</div>}
                    <input onChange={e => genderHandler(e)} onBlur={e => blurHandler(e)} name='gender' style={{ marginBottom: 10, width: 600 }}
                           type="text"
                           className="form-control col-4"
                           id="gender"
                           value={gender}
                           placeholder="Введите пол"
                    />
                </div>
                <div className="form-group">
                    {(birthDateError && birthDateDirty) && <div style={{ color: "#D10000", marginLeft: 2, marginBottom: 5 }}>{birthDateError}</div>}
                    <input onChange={e => birthDateHandler(e)} onBlur={e => blurHandler(e)} name='birthDate' style={{ marginBottom: 10, width: 600 }}
                           type="text"
                           className="form-control col-4"
                           id="birthDate"
                           value={birthDate}
                           placeholder="Введите дату рождения"
                    />
                </div>
                <div className="form-group">
                    {(childrenAmountError && childrenAmountDirty) && <div style={{ color: "#D10000", marginLeft: 2, marginBottom: 5 }}>{childrenAmountError}</div>}
                    <input onChange={e => childrenAmountHandler(e)} onBlur={e => blurHandler(e)} name='childrenAmount' style={{ marginBottom: 10, width: 600 }}
                           type="text"
                           className="form-control col-4"
                           id="childrenAmount"
                           value={childrenAmount}
                           placeholder="Введите кол-во детей сотрудника"
                    />
                </div>
                <div className="form-group">
                    {(salaryError && salaryDirty) && <div style={{ color: "#D10000", marginLeft: 2, marginBottom: 5 }}>{salaryError}</div>}
                    <input onChange={e => salaryHandler(e)} onBlur={e => blurHandler(e)} name='salary' style={{ marginBottom: 10, width: 600 }}
                           type="text"
                           className="form-control col-4"
                           id="gender"
                           value={salary}
                           placeholder="Введите зарплату"
                    />
                </div>
                <div className="form-group">
                    {(hireDateError && hireDateDirty) && <div style={{ color: "#D10000", marginLeft: 2, marginBottom: 5 }}>{hireDateError}</div>}
                    <input onChange={e => hireDateHandler(e)} onBlur={e => blurHandler(e)} name='hireDate' style={{ marginBottom: 10, width: 600 }}
                           type="text"
                           className="form-control col-4"
                           id="hireDate"
                           value={hireDate}
                           placeholder="Введите дату рождения"
                    />
                </div>
                <div>
                    <button disabled={!formValid} style={{ marginTop: 20, color: 'white' }} className="btn btn-dark mb-2"
                            onClick={(e) => saveEmployee(e)}>
                        Сохранить
                    </button>
                    <Link to="/actors" style={{ marginLeft: 40, marginTop: 20, color: 'white' }} className="btn btn-dark mb-2 ">К списку сотрудников</Link>
                </div>
            </form>

        </div>
    );
}

export default AddEmployee;