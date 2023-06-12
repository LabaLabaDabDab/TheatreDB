import { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import ticketsService from "../../service/TicketsService";
import ticketNumberService from "../../service/TicketNumberService";

const UpdateTicketNumber = () => {
    const [ticket, setTicket] = useState("");
    const [isSold, setIsSold] = useState(false);
    const [number_ticketId, setNumber_ticketId] = useState("");

    const [tickets, setTickets] = useState([]);

    let { id } = useParams();
    const [ticketId, numberId] = id.split('.');

    const history = useHistory();

    const saveTicketNumber = (e) => {
        e.preventDefault();

        const ticketNumber  = {
            ticket: {id: Number(ticket)},
            isSold,
            id: {
                ticketId: Number(ticket),
                number_ticketId: Number(number_ticketId)
            }
        };

        ticketNumberService.update(ticketId, numberId, ticketNumber)
            .then(response => {
                console.log('TicketNumber updated', response.data);
                history.push('/ticket_number');
            })
            .catch(error => {
                console.log('Something went wrong', error);
            });
    }

    useEffect(() => {
        if (id) {
            const [ticketId, numberId] = id.split('.');
            ticketNumberService.get(ticketId, numberId)
                .then(response => {
                    const ticketNumber = response.data;
                    const tempTicket = ticketNumber.ticket.id;
                    const tempIsSold = ticketNumber.isSold;
                    const tempNumber_ticketId = ticketNumber.id.number_ticketId;

                    ticketsService.getAllList()
                        .then(response => {
                            console.log(response.data);
                            setTickets(response.data);
                            setTicket(tempTicket);
                            setIsSold(tempIsSold);
                            setNumber_ticketId(tempNumber_ticketId);
                        })
                        .catch(error => {
                            console.log('Something went wrong', error);
                        });
                })
                .catch(error => {
                    console.log('Something went wrong', error);
                });
        } else {
            ticketsService.getAllList()
                .then(response => {
                    console.log(response.data);
                    setTickets(response.data);
                })
                .catch(error => {
                    console.log('Something went wrong', error);
                });
        }
    }, []);

    return (
        <div className="container">
            <h3 style={{ marginTop: 20, marginBottom: 20, marginLeft: 2 }}>Обновить номер билета</h3>
            <form>
                <div className="form-group">
                    <label style={{ marginBottom: 10, width: 600 }}>Выберите билет:</label>
                    <select
                        style={{ marginBottom: 10, width: 600 }}
                        className="form-control col-4"
                        id="ticket"
                        value={ticket}
                        onChange={(e) => setTicket(Number(e.target.value))}>
                        {
                            tickets && tickets.map((ticket) => (
                                <option key={ticket.id} value={ticket.id.toString()}>
                                    {ticket.datePerformance?.date?.dateOfPerformance}
                                    {" "}
                                    {ticket.datePerformance?.performance?.author?.title}
                                </option>
                            ))
                        }
                    </select>
                </div>
                <div className="form-group">
                    <label style={{ marginBottom: 10, width: 600 }}>Продан ли билет:</label>
                    <select
                        style={{ marginBottom: 10, width: 600 }}
                        className="form-control col-4"
                        id="isSold"
                        value={isSold}
                        onChange={(e) => setIsSold(e.target.value === "true")}>
                        <option value="false">Нет</option>
                        <option value="true">Да</option>
                    </select>
                </div>
                <div>
                    <button style={{ marginTop: 20, color: 'white' }} className="btn btn-dark mb-2"
                            onClick={(e) => saveTicketNumber(e)}>
                        Сохранить
                    </button>
                    <Link to="/ticket_number" style={{ marginLeft: 40, marginTop: 20, color: 'white' }} className="btn btn-dark mb-2 ">Назад</Link>
                </div>
            </form>

        </div>
    );
}

export default UpdateTicketNumber;
