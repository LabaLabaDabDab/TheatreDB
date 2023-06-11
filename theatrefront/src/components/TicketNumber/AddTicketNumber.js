import { useState, useEffect } from "react";
import {Link, useHistory} from "react-router-dom";
import ticketsService from "../../service/TicketsService";
import ticketNumberService from "../../service/TicketNumberService";

const AddTicketNumber = () => {
    const [ticket, setTicket] = useState("");
    const [isSold, setIsSold] = useState(false);

    const [tickets, setTickets] = useState([]);

    const [ticketDirty, setTicketDirty] = useState(false);
    const [isSoldDirty, setIsSoldDirty] = useState(false);

    const [ticketError, setTicketError] = useState('Поле не может быть пустым');
    const [isSoldError, setIsSoldError] = useState('Поле не может быть пустым');

    const [formValid, setFormValid] = useState(false);

    const history = useHistory();

    useEffect(() => {
        init();
    }, []);

    const init = () => {
        ticketsService.getAllList()
            .then(response => {
                console.log(response.data);
                setTickets(response.data);
            })
            .catch(error => {
                console.log('Something went wrong', error);
            });
    }

    useEffect(() => {
        if (ticketError || isSoldError) {
            setFormValid(false)
        } else {
            setFormValid(true)
        }
    }, [ticketError, isSoldError])

    const blurHandler = (e) => {
        switch (e.target.name) {
            case 'ticket':
                setTicketDirty(true)
                break
            case 'isSold':
                setIsSoldDirty(true)
                break
        }
    }

    const ticketHandler = (value) => {
        setTicket(value)
        if (!value)
            setTicketError('Поле не может быть пустым')
        else setTicketError('')
    }

    const isSoldHandler = (e) => {
        setIsSold(JSON.parse(e.target.value))
        setIsSoldError('')
    }

    const saveTicketNumber = (e) => {
        e.preventDefault();
        const ticketNumber  = {
            ticket: {id: Number(ticket)},
            isSold,
            id: { ticketId: Number(ticket) }
        };

        console.log(ticketNumber);
        ticketNumberService.create(ticketNumber)
            .then(response => {
                console.log('TicketNumber created', response.data);
                history.push('/ticket_number');
            })
            .catch(error => {
                console.log('Something went wrong', error);
            });
    };

    return (
        <div className="container">
            <h3 style={{ marginTop: 20, marginBottom: 20, marginLeft: 2 }}>Добавить номер билета</h3>
            <form>
                <div>
                    <select
                        onChange={e => ticketHandler(Number(e.target.value))}
                        style={{ marginBottom: 10, width:600 }}
                        className='form-select'
                        id="ticket">
                        <option>Выберите билет:</option>
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
                    <label style={{ marginBottom: 10, width: 600 }}>Выберите, продан ли билет:</label>
                    <select onChange={e => isSoldHandler(e)} onBlur={e => blurHandler(e)} style={{ marginBottom: 10, width: 600 }}
                            className="form-control col-4"
                            id="isSold"
                            value={isSold}>
                        <option value={true}>True</option>
                        <option value={false}>False</option>
                    </select>
                </div>
                <div>
                    <button disabled={!formValid} style={{ marginTop: 20, color: 'white' }} className="btn btn-dark mb-2"
                            onClick={(e) => saveTicketNumber(e)}>
                        Сохранить
                    </button>
                    <Link to="/ticket_number" style={{ marginLeft: 40, marginTop: 20, color: 'white' }} className="btn btn-dark mb-2 ">Назад</Link>
                </div>
            </form>
        </div>
    );
}

export default AddTicketNumber;
