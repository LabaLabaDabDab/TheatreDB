import {Link, useHistory} from "react-router-dom";
import { useState, useEffect } from "react";
import ticketsService from "../../service/TicketsService";
import dateOfPerformanceService from "../../service/DateOfPerformanceService";

const AddTicket = () => {
    const [price, setPrice] = useState("");
    const [datePerformance, setDatePerformance] = useState("");
    const [datePerformances, setDatePerformances] = useState([]);
    const [formValid, setFormValid] = useState(false);

    const history = useHistory();

    useEffect(() => {
        ticketsService.getAllList()
            .then(ticketResponse => {
                const existingTickets = ticketResponse.data;

                dateOfPerformanceService.getAllList()
                    .then(response => {
                        console.log(response.data);
                        let filteredDatePerformances = response.data.filter(date =>
                            !existingTickets.find(ticket =>
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
            })
    }, []);


    useEffect(() => {
        if (!price || !datePerformance) {
            setFormValid(false)
        } else {
            setFormValid(true)
        }
    }, [price, datePerformance])


    const saveTicket = (e) => {
        e.preventDefault();
        const ticket  = {
            price: Number(price),
            datePerformance: {
                id: datePerformance
            }
        };

        console.log(ticket);
        ticketsService.create(ticket)
            .then(response => {
                console.log('Ticket created', response.data);
                history.push('/tickets');
            })
            .catch(error => {
                console.log('Something went wrong', error);
            });
    };


    return (
        <div className="container">
            <h3 style={{ marginTop: 20, marginBottom: 20, marginLeft: 2 }}>Добавить Билет</h3>
            <form>
                <div className="mb-3">
                    <label htmlFor="price" className="form-label">Цена</label>
                    <input type="number" className="form-control" id="price" onChange={e => setPrice(e.target.value)} />
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
                    <button disabled={!formValid} style={{ marginTop: 20, color: 'white' }} className="btn btn-dark mb-2"
                            onClick={(e) => saveTicket(e)}>
                        Сохранить
                    </button>
                    <Link to="/tickets" style={{ marginLeft: 40, marginTop: 20, color: 'white' }} className="btn btn-dark mb-2 ">Назад</Link>
                </div>
            </form>
        </div>
    );
}

export default AddTicket;
