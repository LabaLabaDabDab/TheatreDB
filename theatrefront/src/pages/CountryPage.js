import React from "react";
import {httpClient} from '../http-common.js'

export default function CountryPage({

}) {
    const [countries, setCountry] = React.useState([]);

    React.useEffect(() => {
        init();
    }, []);


    const init = ()  => {
    httpClient.get('http://localhost:8081/countries')
        .then(response => {
            console.log('Country data', response.data);
            setCountry(response.data)
        })
        .catch(error => {
            console.error(error)
        });
    }

    return (
        <div>
            <h2>Страны</h2>
            <div className={"table-container"}>
                <table className={"table"}>
                    <thead className={"thead"}>
                    <tr>
                        <th>ID</th>
                        <th>Название</th>
                    </tr>
                    </thead>
                    <tbody>
                    {countries.map(country => (
                        <tr key={country.id}>
                            <td>{country.id}</td>
                            <td>{country.name}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

