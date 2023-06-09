import {Link, useHistory, useParams} from "react-router-dom";
import { useState, useEffect } from "react";
import employeeService from "../../service/EmployeeService";
import actorService from "../../service/ActorService";


const AddActor = () => {
    const [employee, setEmployee] = useState("");
    const [height, setHeight] = useState(Number);
    const [isStudent, setIsStudent] = useState(false);

    const [employees, setEmployees] = useState([])

    const [employeeDirty, setEmployeeDirty] = useState(false);
    const [heightDirty, setHeightDirty] = useState(false);
    const [isStudentDirty, setIsStudentDirty] = useState(false);

    const [employeeError, setEmployeeError] = useState('Поле не может быть пустым');
    const [heightError, setHeightError] = useState('Поле не может быть пустым');
    const [isStudentError, setIsStudentError] = useState('Поле не может быть пустым');

    const [formValid, setFormValid] = useState(false);

    const history = useHistory();

    let { id } = useParams();

    useEffect(() => {
        init();
    }, []);

    const init = () => {
        actorService.getAllList()
            .then(actorResponse => {
                const existingActors = actorResponse.data;

                employeeService.getAllList()
                    .then(response => {
                        console.log(response.data);
                        let filteredEmployees = response.data.filter(employee => employee.type.type === "Актёр");
                        setEmployees(filteredEmployees.filter(employee => !existingActors.find(actor => actor.employee.id === employee.id)));
                    })
                    .catch(error => {
                        console.log('Something went wrong', error);
                    })
            })
            .catch(error => {
                console.log('Something went wrong', error);
            })
    }



    useEffect(() => {
        if (employeeError || heightError || isStudentError) {
            setFormValid(false)
        } else {
            setFormValid(true)
        }
    }, [employeeError, heightError, isStudentError])

    const blurHandler = (e) => {
        switch (e.target.name) {
            case 'employee':
                setEmployeeDirty(true)
                break
            case 'height':
                setHeightDirty(true)
                break
            case 'isStudent':
                setIsStudentDirty(true)
                break
        }
    }

    const HeightHandler = (e) => {
        let value = e.target.value
        setHeight(value)
        if (!value || value === '')
            setHeightError('Поле не может быть пустым')
        else if (value <= 0)
            setHeightError('Рост должен быть больше 0')
        else
            setHeightError('')
    }

    const IsStudentHandler = (e) => {
        setIsStudent(JSON.parse(e.target.value))
        setIsStudentError('')
    }


    const EmployeeHandler = (value) => {
        setEmployee(value)
        if (!value)
            setEmployeeError('Поле не может быть пустым')
        else setEmployeeError('')
    }

    const saveActor = (e) => {
        e.preventDefault();
        const actor = {
            employee: {id: Number(employee)},
            height,
            isStudent,
            id
        };

        console.log(actor);
        actorService.create(actor)
            .then(response => {
                console.log('Actor created', response.data);
                history.push('/actors');
            })
            .catch(error => {
                console.log('Something went wrong', error);
            });
    };


    return (
        <div className="container">
            <h3 style={{ marginTop: 20, marginBottom: 20, marginLeft: 2 }}>Добавить нового актёра</h3>
            <form>
                <div>
                    <select
                        onChange={e => EmployeeHandler(Number(e.target.value))}
                        style={{ marginBottom: 10, width:600 }}
                        className='form-select'
                        id="employee">
                        <option>Выберите актёра</option>
                        {
                            employees && employees.map((employee) => (
                                <option key={employee.id} value={employee.id.toString()}>
                                    {employee.fio}
                                </option>
                            ))
                        }
                    </select>
                </div>
                <div className="form-group">
                    {(heightError && heightDirty) && <div style={{ color: "#D10000", marginLeft: 2, marginBottom: 5 }}>{heightError}</div>}
                    <label style={{ marginBottom: 10, width: 600 }}>Введите рост актёра:</label>
                    <input onChange={e => HeightHandler(e)} onBlur={e => blurHandler(e)} name='height' style={{ marginBottom: 10, width: 600 }}
                           type="number"
                           className="form-control col-4"
                           id="height"
                           value={height}
                           placeholder="Введите рост"
                    />
                </div>
                <div className="form-group">
                    {(isStudentError && isStudentDirty) && <div style={{ color: "#D10000", marginLeft: 2, marginBottom: 5 }}>{isStudentError}</div>}
                    <label style={{ marginBottom: 10, width: 600 }}>Выберите является ли актёр студентом:</label>
                    <select onChange={e => IsStudentHandler(e)} onBlur={e => blurHandler(e)} name='isStudent' style={{ marginBottom: 10, width: 600 }}
                            className="form-control col-4"
                            id="isStudent"
                            value={isStudent}>
                        <option value={true}>True</option>
                        <option value={false}>False</option>
                    </select>
                </div>


                <div>
                    <button disabled={!formValid} style={{ marginTop: 20, color: 'white' }} className="btn btn-dark mb-2"
                            onClick={(e) => saveActor(e)}>
                        Сохранить
                    </button>
                    <Link to="/actors" style={{ marginLeft: 40, marginTop: 20, color: 'white' }} className="btn btn-dark mb-2 ">Назад</Link>
                </div>
            </form>
        </div>
    );
}

export default AddActor;