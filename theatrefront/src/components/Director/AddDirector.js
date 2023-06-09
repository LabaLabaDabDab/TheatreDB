import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import employeeService from "../../service/EmployeeService";
import directorService from "../../service/DirectorService";

const AddDirector = () => {
    const [employee, setEmployee] = useState("");

    const [employees, setEmployees] = useState([]);

    const [employeeDirty, setEmployeeDirty] = useState(false);
    const [employeeError, setEmployeeError] = useState('Поле не может быть пустым');
    const [formValid, setFormValid] = useState(false);

    const history = useHistory();

    useEffect(() => {
        directorService.getAllList()
            .then(directorResponse => {
                const existingDirectors = directorResponse.data;

                employeeService.getAllList()
                    .then(response => {
                        console.log(response.data);
                        let filteredEmployees = response.data.filter(employee => employee.type.type === "Директор");
                        setEmployees(filteredEmployees.filter(employee => !existingDirectors.find(director => director.employee.id === employee.id)));
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

    const saveDirector = (e) => {
        e.preventDefault();

        const director = {
            employee: { id: Number(employee) }
        };

        console.log(director);
        directorService.create(director)
            .then(response => {
                console.log('Director created', response.data);
                history.push('/directors');
            })
            .catch(error => {
                console.log('Something went wrong', error);
            });
    };

    return (
        <div className="container">
            <h3 style={{ marginTop: 20, marginBottom: 20, marginLeft: 2 }}>Добавить нового режиссера</h3>
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
                            onClick={(e) => saveDirector(e)}>
                        Сохранить
                    </button>
                    <Link to="/directors" style={{ marginLeft: 40, marginTop: 20, color: 'white' }} className="btn btn-dark mb-2 ">Назад</Link>
                </div>
            </form>
        </div>
    );
}

export default AddDirector;
