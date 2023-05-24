import React from "react";
import axios from "axios";

const ACTORS = 'http://localhost:8081//actors';
const EMPLOYEES = 'http://localhost:8081/employees'

class ClientsPage extends React.Component
{
    render() {
        return <div>
            <h2>Актёры</h2>
            <div className={"table-container"}>
                <table className={"table"}>
                    <thead className={"thead"}>
                    <th>ID</th>
                    <th>EMPLOYEE_ID</th>
                    <th>Студент</th>
                    <th>Рост</th>
                    </thead>
                    <tbody>
                    {this.state.clientData.map(client => (
                        <tr key={client.id} onClick={() => this.onRowClick(client.id)}>
                            <td>{client.id}</td>
                            <td>{client.name}</td>
                            <td>{client.surname}</td>
                            <td>{client.type}</td>
                            <td>{client.discountCard}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    }
}

export default ClientsPage