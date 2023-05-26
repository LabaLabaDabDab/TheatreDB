import React from "react";
import axios from "axios";

const EMPLOYEES = 'http://localhost:8081/employee_tupes'

class EmployeePage extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            employeeData: []
        }
    }
    componentDidMount() {
        axios.get(EMPLOYEES).then(response => {
            this.setState({employeeData: response.data})
        }).catch(error => {
            console.error(error)
        })
    }

    render() {
        return(<div>
            <h2>Киоски</h2>
                <div className={"table-container"}>
                    <table className={"table"}>
                        <thead className={"thead"}>
                        <tr>
                        <th>ID</th>
                        <th>ФИО</th>
                        <th>Гендер</th>
                        <th>День рождения</th>
                        <th>Количество детей</th>
                        <th>Зарплата</th>
                        <th>День найма</th>
                        <th>Тип сотрудника</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.employeeData.map(employee => (
                            <tr key={employee.id}>
                                <td>{employee.id}</td>
                                <td>{employee.fio}</td>
                                <td>{employee.gender}</td>
                                <td>{employee.birth_date}</td>
                                <td>{employee.birth_date}</td>
                                <td>{employee.hire_date}</td>
                                <td>{employee.employee_type}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            <></>
        </div>
        )
    }
}

export default EmployeePage