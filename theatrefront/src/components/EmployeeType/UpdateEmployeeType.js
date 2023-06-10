import { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import employeeTypeService from "../../service/EmployeeTypeService";

const UpdateEmployeeType = () => {

    const [type, setType] = useState('');
    const history = useHistory();

    let { id } = useParams();

    const saveType = (e) => {
        e.preventDefault();

        const employeeType =
            {type};

        employeeTypeService.update(id, employeeType)
            .then(response => {
                console.log('Employee type updated', response.data);
                history.push('/employees_type');
            })
            .catch(error => {
                console.log('Something went wrong', error);
            });
    }

    useEffect(() => {
        if (id) {
            employeeTypeService.get(id)
                .then(employeeType => {
                    setType(employeeType.data.type);
                })
                .catch(error => {
                    console.log('Something went wrong', error);
                })
        }
    }, [])


    return (
        <div className="container">
            <h3 style={{ marginTop: 20, marginBottom: 20, marginLeft: 2 }}>Обновить тип сотрудника</h3>
            <form>
                <div className="form-group">
                    <input style={{ marginBottom: 10, width: 600 }}
                           type="text"
                           className="form-control col-4"
                           id="type"
                           value={type}
                           onChange={(e) => setType(e.target.value)}
                           placeholder="Введите тип сотрудника"
                    />
                </div>
                <div>
                    <button style={{ marginTop: 20, color: 'white' }} className="btn btn-dark mb-2"
                            onClick={(e) => saveType(e)}>
                        Сохранить
                    </button>
                    <Link to="/employees_type" style={{ marginLeft: 40, marginTop: 20, color: 'white' }} className="btn btn-dark mb-2 ">Назад</Link>
                </div>
            </form>
        </div>
    );
}

export default UpdateEmployeeType;
