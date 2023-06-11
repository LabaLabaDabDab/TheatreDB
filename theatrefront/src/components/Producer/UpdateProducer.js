import { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import producerService from "../../service/ProducerService";
import employeeService from "../../service/EmployeeService";

const UpdateProducer = () => {

    const [employee, setEmployee] = useState("");
    const [existingProducers, setExistingProducers] = useState([]);
    const [employees, setEmployees] = useState([]);

    const history = useHistory();

    let { id } = useParams();

    const saveProducer = (e) => {
        e.preventDefault();

        const producer = { employee: { id: Number(employee) } };

        producerService.update(id, producer)
            .then(response => {
                console.log('Producer updated', response.data);
                history.push('/producers');
            })
            .catch(error => {
                console.log('Something went wrong', error);
            });
    };

    useEffect(() => {
        producerService.getAllList()
            .then(producerResponse => {
                const existingProducers = producerResponse.data;

                producerService.get(id)
                    .then(producer => {
                        const tempEmployee = producer.data.employee.id;

                        employeeService.getAllList()
                            .then(response => {
                                console.log(response.data);
                                let filteredEmployees = response.data.filter(employee =>
                                    employee.type.type === "Продюсер" &&
                                    (!existingProducers.find(producer => producer.employee.id === employee.id) || employee.id === tempEmployee)
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
            <h3 style={{ marginTop: 20, marginBottom: 20, marginLeft: 2 }}>Обновить продюсера</h3>
            <form>
                <div className="form-group">
                    <label style={{ marginBottom: 10, width: 600 }}>Выберите продюсера:</label>
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
                            onClick={(e) => saveProducer(e)}>
                        Сохранить
                    </button>
                    <Link to="/producers" style={{ marginLeft: 40, marginTop: 20, color: 'white' }} className="btn btn-dark mb-2 ">Назад</Link>
                </div>
            </form>
        </div>
    );
};

export default UpdateProducer;
