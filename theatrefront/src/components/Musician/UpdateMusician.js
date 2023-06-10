import { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import musicianService from "../../service/MusicianService";
import employeeService from "../../service/EmployeeService";

const UpdateMusician = () => {

    const [employee, setEmployee] = useState("");
    const [existingMusicians, setExistingMusicians] = useState([]);
    const [employees, setEmployees] = useState([]);

    const history = useHistory();

    let { id } = useParams();

    const saveMusician = (e) => {
        e.preventDefault();

        const musician = { employee: { id: Number(employee) } };

        musicianService.update(id, musician)
            .then(response => {
                console.log('Musician updated', response.data);
                history.push('/musicians');
            })
            .catch(error => {
                console.log('Something went wrong', error);
            });
    };

    useEffect(() => {
        musicianService.getAllList()
            .then(musicianResponse => {
                const existingMusicians = musicianResponse.data;

                musicianService.get(id)
                    .then(musician => {
                        const tempEmployee = musician.data.employee.id;

                        employeeService.getAllList()
                            .then(response => {
                                console.log(response.data);
                                let filteredEmployees = response.data.filter(employee =>
                                    employee.type.type === "Музыкант" &&
                                    (!existingMusicians.find(musician => musician.employee.id === employee.id) || employee.id === tempEmployee)
                                );
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
            })
            .catch(error => {
                console.log('Something went wrong', error);
            })
    }, [id]);

    return (
        <div className="container">
            <h3 style={{ marginTop: 20, marginBottom: 20, marginLeft: 2 }}>Обновить музыканта</h3>
            <form>
                <div className="form-group">
                    <label style={{ marginBottom: 10, width: 600 }}>Выберите музыканта:</label>
                    <select style={{ marginBottom: 10, width: 600 }}
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
                            onClick={(e) => saveMusician(e)}>
                        Сохранить
                    </button>
                    <Link to="/musicians" style={{ marginLeft: 40, marginTop: 20, color: 'white' }} className="btn btn-dark mb-2 ">Назад</Link>
                </div>
            </form>
        </div>
    );
};

export default UpdateMusician;
