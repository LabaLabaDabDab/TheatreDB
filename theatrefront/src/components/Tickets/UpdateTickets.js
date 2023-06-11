import { useState, useEffect } from "react";
import { useHistory, useParams, Link } from "react-router-dom";
import ticketsService from "../../service/TicketsService";
import dateOfPerformanceService from "../../service/DateOfPerformanceService";

const UpdateTickets = () => {
    const [price, setPrice] = useState("");
    const [datePerformance, setDatePerformance] = useState("");
    const [datePerformances, setDatePerformances] = useState([]);

    const { id } = useParams();
    const history = useHistory();

    useEffect(() => {
        ticketsService.get(id)
            .then(ticketResponse => {
                const ticket = ticketResponse.data;
                setPrice(ticket.price);

                dateOfPerformanceService.getAllList()
                    .then(response => {
                        console.log(response.data);
                        let filteredDatePerformances = response.data.filter(date =>
                            !ticket.find(ticket =>
                                ticket.datePerformance.id.dateId === date.date.id &&
                                ticket.datePerformance.id.performanceId === date.performance.id
                            )
                        );
                        setDatePerformances(filteredDatePerformances);
                    })
                    .catch(error => {
                        console.log('Something went wrong', error);
                    })
            })
            .catch(error => {
                console.log('Something went wrong', error);
            });
    }, [id]);

    const saveTicket = (e) => {
        e.preventDefault();
        const ticket = {
            price: Number(price),
            datePerformance: {
                id: datePerformance
            }
        };

        console.log(ticket);
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
                <div className="mb-3">
                    <label htmlFor="price" className="form-label">Цена</label>
                    <input type="number" className="form-control" id="price" value={price} onChange={e => setPrice(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="datePerformance" className="form-label">Представление</label>
                    <select
                        onChange={e => {
                            const [dateId, performanceId] = e.target.value.split("_");
                            setDatePerformance({ dateId: Number(dateId), performanceId: Number(performanceId) });
                        }}
                        className='form-select'
                        id="datePerformance">
                        value={datePerformance}
                        <option>Выберите представление:</option>
                        {
                            datePerformances && datePerformances.map((datePerformance) => (
                                <option
                                    key={`${datePerformance.date.id}_${datePerformance.performance.id}`}
                                    value={`${datePerformance.date.id}_${datePerformance.performance.id}`}>
                                    {datePerformance.date.dateOfPerformance}
                                    {" "}
                                    {datePerformance.performance.author.title}
                                </option>
                            ))
                        }
                    </select>
                </div>
                <div>
                    <button style={{ marginTop: 20, color: 'white' }} className="btn btn-dark mb-2" onClick={(e) => saveTicket(e)}>
                        Сохранить
                    </button>
                    <Link to="/tickets" style={{ marginLeft: 40, marginTop: 20, color: 'white' }} className="btn btn-dark mb-2 ">Назад</Link>
                </div>
            </form>
        </div>
    );
}

export default UpdateTickets;
