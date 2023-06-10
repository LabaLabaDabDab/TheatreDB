import { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import performanceService from "../../service/PerformanceService";
import dateOfPlayingService from "../../service/DateOfPlayingService";
import ticketsService from "../../service/TicketsService";

const UpdateTickets = () => {
    const [price, setPrice] = useState(Number);
    const [performance, setPerformance] = useState("");
    const [date, setDate] = useState("");

    const [performances, setPerformances] = useState([]);
    const [dates, setDates] = useState([]);

    let { id } = useParams();

    const history = useHistory();

    useEffect(() => {
        ticketsService.get(id)
            .then(response => {
                const ticket = response.data;
                setPrice(ticket.price);
                setPerformance(ticket.performance.id);
                setDate(ticket.date.id);

                performanceService.getAllList()
                    .then(response => {
                        console.log(response.data);
                        setPerformances(response.data);
                    })
                    .catch(error => {
                        console.log('Something went wrong', error);
                    });

                dateOfPlayingService.getAllList()
                    .then(response => {
                        console.log(response.data);
                        setDates(response.data);
                    })
                    .catch(error => {
                        console.log('Something went wrong', error);
                    });
            })
            .catch(error => {
                console.log('Something went wrong', error);
            });
    }, [id])

    const saveTicket = (e) => {
        e.preventDefault();
        const ticket = {
            price,
            performance: {id: Number(performance)},
            date: {id: Number(date)}
        };

        ticketsService.update(id, ticket)
            .then(response => {
                console.log('Ticket updated', response.data);
                history.push('/tickets');
            })
            .catch(error => {
                console.log('Something went wrong', error);
            });
    };

    return (
        <div className="container">
            <h3 style={{ marginTop: 20, marginBottom: 20, marginLeft: 2 }}>Обновить билет</h3>
            <form>
                <div className="form-group">
                    <label style={{ marginBottom: 10 }}>Цена:</label>
                    <input onChange={e => setPrice(Number(e.target.value))}
                           style={{ marginBottom: 10, width: 600 }}
                           type="number"
                           className="form-control"
                           id="price"
                           value={price}
                    />
                </div>
                <div className="form-group">
                    <label style={{ marginBottom: 10, width: 600 }}>Произведение:</label>
                    <select
                        style={{ marginBottom: 10, width: 600 }}
                        className="form-control col-4"
                        id="performance"
                        value={performance}
                        onChange={(e) => setPerformance(Number(e.target.value))}>
                        {
                            performances && performances.map((performance) => (
                                <option key={performance.id} value={performance.id.toString()}>
                                    {performance.author.title}
                                </option>
                            ))
                        }
                    </select>
                </div>
                <div className="form-group">
                    <label style={{ marginBottom: 10, width: 600 }}>Дата:</label>
                    <select
                        style={{ marginBottom: 10, width: 600 }}
                        className="form-control col-4"
                        id="date"
                        value={date}
                        onChange={(e) => setDate(Number(e.target.value))}>
                        {
                            dates && dates.map((date) => (
                                <option key={date.id} value={date.id.toString()}>
                                    {date.dateOfPerformance}
                                </option>
                            ))
                        }
                    </select>
                </div>
                <div>
                    <button style={{ marginTop: 20, color: 'white' }} className="btn btn-dark mb-2"
                            onClick={(e) => saveTicket(e)}>
                        Сохранить
                    </button>
                    <Link to="/tickets" style={{ marginLeft: 40, marginTop: 20, color: 'white' }} className="btn btn-dark mb-2">Назад</Link>
                </div>
            </form>
        </div>
    );
}

export default UpdateTickets;
