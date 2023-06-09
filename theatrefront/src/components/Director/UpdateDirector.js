import { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import directorService from "../../service/DirectorService";
import employeeService from "../../service/EmployeeService";

const UpdateDirector = () => {

    const [employee, setEmployee] = useState("");
    const [existingDirectors, setExistingDirectors] = useState([]);
    const [employees, setEmployees] = useState([]);

    const history = useHistory();

    let { id } = useParams();

    const saveDirector = (e) => {
        e.preventDefault();

        const director = { employee: { id: Number(employee) } };

        directorService.update(id, director)
            .then(response => {
                console.log('Director updated', response.data);
                history.push('/directors');
            })
            .catch(error => {
                console.log('Something went wrong', error);
            });
    };

    useEffect(() => {
        // Fetch existing directors
        directorService.getAll()
            .then(response => {
                setExistingDirectors(response.data);
            })
            .catch(error => {
                console.log('Something went wrong', error);
            });

        if (id) {
            directorService.get(id)
                .then(director => {
                    const tempEmployee = director.data.employee.id;

                    employeeService.getAllList()
                        .then(response => {
                            console.log(response.data);
                            let filteredEmployees = response.data.filter(employee => employee.type.type === "Директор");
                            filteredEmployees = filteredEmployees.filter(employee => !existingDirectors.find(director => director.employee.id === employee.id));
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
                    let filteredEmployees = response.data.filter(employee => employee.type.type === "Директор");
                    filteredEmployees = filteredEmployees.filter(employee => !existingDirectors.find(director => director.employee.id === employee.id));
                    setEmployees(filteredEmployees);
                })
                .catch(error => {
                    console.log('Something went wrong', error);
                })
        }
    }, []);

    return (
        <div className="container">
            <h3 style={{ marginTop: 20, marginBottom: 20, marginLeft: 2 }}>Обновить директора</h3>
            <form>
                <div className="form-group">
                    <label style={{ marginBottom: 10, width: 600 }}>Выберите директора:</label>
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
                <div>
                    <button style={{ marginTop: 20, color: 'white' }} className="btn btn-dark mb-2"
                            onClick={(e) => saveDirector(e)}>
                        Сохранить
                    </button>
                    <Link to="/directors" style={{ marginLeft: 40, marginTop: 20, color: 'white' }} className="btn btn-dark mb-2 ">Назад</Link>
                </div>
            </form>
        </div>
    );
};

export default UpdateDirector;
