import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import employeeService from "../../service/EmployeeService";
import musicianService from "../../service/MusicianService";

const AddMusician = () => {
    const [employee, setEmployee] = useState("");

    const [employees, setEmployees] = useState([]);

    const [employeeDirty, setEmployeeDirty] = useState(false);
    const [employeeError, setEmployeeError] = useState('Поле не может быть пустым');
    const [formValid, setFormValid] = useState(false);

    const history = useHistory();

    useEffect(() => {
        musicianService.getAllList()
            .then(musicianResponse => {
                const existingMusicians = musicianResponse.data;

                employeeService.getAllList()
                    .then(response => {
                        console.log(response.data);
                        let filteredEmployees = response.data.filter(employee => employee.type.type === "Музыкант");
                        setEmployees(filteredEmployees.filter(employee => !existingMusicians.find(musician => musician.employee.id === employee.id)));
                    })
                    .catch(error => {
                        console.log('Something went wrong', error);
                    })
            })
            .catch(error => {
                console.log('Something went wrong', error);
            })
    }, []);


    useEffect(() => {
        if (employeeError) {
            setFormValid(false)
        } else {
            setFormValid(true)
        }
    }, [employeeError]);

    const blurHandler = (e) => {
        switch (e.target.name) {
            case 'employee':
                setEmployeeDirty(true);
                break;
        }
    }

    const EmployeeHandler = (value) => {
        setEmployee(value);
        if (!value)
            setEmployeeError('Поле не может быть пустым');
        else setEmployeeError('');
    }

    const saveMusician = (e) => {
        e.preventDefault();

        const musician = {
            employee: { id: Number(employee) }
        };

        console.log(musician);
        musicianService.create(musician)
            .then(response => {
                console.log('Musician created', response.data);
                history.push('/musicians');
            })
            .catch(error => {
                console.log('Something went wrong', error);
            });
    };

    return (
        <div className="container">
            <h3 style={{ marginTop: 20, marginBottom: 20, marginLeft: 2 }}>Добавить нового музыканта</h3>
            <form>
                <div>
                    {(employeeError && employeeDirty) && <div style={{ color: "#D10000", marginLeft: 2, marginBottom: 5 }}>{employeeError}</div>}
                    <label style={{ marginBottom: 10, width: 600 }}>Выберите сотрудника:</label>
                    <select
                        onChange={e => EmployeeHandler(Number(e.target.value))}
                        onBlur={e => blurHandler(e)}
                        name='employee'
                        style={{ marginBottom: 10, width: 600 }}
                        className='form-select'
                        id="employee">
                        <option>Выберите сотрудника</option>
                        {
                            employees && employees.map((employee) => (
                                <option key={employee.id} value={employee.id.toString()}>
                                    {employee.fio}
                                </option>
                            ))
                        }
                    </select>
                </div>
                <div>
                    <button disabled={!formValid} style={{ marginTop: 20, color: 'white' }} className="btn btn-dark mb-2"
                            onClick={(e) => saveMusician(e)}>
                        Сохранить
                    </button>
                    <Link to="/musicians" style={{ marginLeft: 40, marginTop: 20, color: 'white' }} className="btn btn-dark mb-2 ">Назад</Link>
                </div>
            </form>
        </div>
    );
}

export default AddMusician;
