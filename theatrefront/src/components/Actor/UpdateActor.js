import { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import actorService from "../../service/ActorService";
import employeeService from "../../service/EmployeeService";


const UpdateActor = () => {

    const [employee, setEmployee] = useState("");
    const [height, setHeight] = useState(Number);
    const [isStudent, setIsStudent] = useState("false");

    const [employees, setEmployees] = useState([])

    const history = useHistory();

    let { id } = useParams();

    const saveActor = (e) => {
        e.preventDefault();

        const actor =
            {employee: { id: Number(employee) }, height, isStudent};

        actorService.update(id, actor)
            .then(response => {
                console.log('Actor updated', response.data);
                history.push('/actors');
            })
            .catch(error => {
                console.log('Something went wrong', error);
            });
    }

    useEffect(() => {
        if (id) {
            actorService.get(id)
                .then(actor => {
                    const tempEmployee = actor.data.employee.id;
                    setHeight(actor.data.height);
                    setIsStudent(actor.data.student);
                    employeeService.getAllList()
                        .then(response => {
                            console.log(response.data);
                            let filteredEmployees = response.data.filter(employee => employee.type.type === "Актёр");
                            setEmployees(filteredEmployees);
                            setEmployee(tempEmployee);
                        })
                        .catch(error => {
                            console.log('Something went wrong', error);
                        })
                })
                .catch(error => {
                    console.log('Something went wrong', error);
                })
        } else {
            employeeService.getAllList()
                .then(response => {
                    console.log(response.data);
                    let filteredEmployees = response.data.filter(employee => employee.type.type === "Актёр");
                    setEmployees(filteredEmployees);
                })
                .catch(error => {
                    console.log('Something went wrong', error);
                })
        }
    }, [])

    return (
        <div className="container">
            <h3 style={{ marginTop: 20, marginBottom: 20, marginLeft: 2 }}>Обновить обновить актёра</h3>
            <form>
                <div className="form-group">
                    <label style={{ marginBottom: 10, width: 600 }}>Выберите актёра:</label>
                    <select
                        style={{ marginBottom: 10, width: 600 }}
                        className="form-control col-4"
                        id="employee"
                        value={employee}
                        onChange={(e) => setEmployee(Number(e.target.value))}
                    >
                        {employees && employees.map((employee) => (
                            <option key={employee.id} value={employee.id.toString()}>
                                {employee.fio}
                            </option>
                        ))}

                    </select>
                </div>
                <div className="form-group">
                    <label style={{ marginBottom: 10, width: 600 }}>Введите рост актёра:</label>
                    <input onChange={e => setHeight(e.target.value)}
                           style={{ marginBottom: 10, width: 600 }}
                           type="number"
                           className="form-control col-4"
                           id="height"
                           value={height}
                           placeholder="Введите рост"
                    />
                </div>
                <div className="form-group">
                    <label style={{ marginBottom: 10, width: 600 }}>Выберите является ли актёр студентом:</label>
                    <div className="form-check">
                        <input className="form-check-input" type="radio" name="isStudent" id="isStudentTrue" value="true" checked={isStudent} onChange={e => setIsStudent(true)}/>
                        <label className="form-check-label" htmlFor="isStudentTrue">True</label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="radio" name="isStudent" id="isStudentFalse" value="false" checked={!isStudent} onChange={e => setIsStudent(false)}/>
                        <label className="form-check-label" htmlFor="isStudentFalse">False</label>
                    </div>
                </div>
                <div>
                    <button style={{ marginTop: 20, color: 'white' }} className="btn btn-dark mb-2"
                            onClick={(e) => saveActor(e)}>
                        Сохранить
                    </button>
                    <Link to="/actors" style={{ marginLeft: 40, marginTop: 20, color: 'white' }} className="btn btn-dark mb-2 ">Назад</Link>
                </div>
            </form>

        </div>
    );
}

export default UpdateActor;