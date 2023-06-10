import {Link, useHistory} from "react-router-dom";
import { useState, useEffect } from "react";
import performanceService from "../../service/PerformanceService";
import dateOfPlayingService from "../../service/DateOfPlayingService";
import ticketsService from "../../service/TicketsService";

const AddTickets = () => {
    const [price, setPrice] = useState(Number);
    const [performance, setPerformance] = useState("");
    const [date, setDate] = useState("");

    const [performances, setPerformances] = useState([]);
    const [dates, setDates] = useState([]);

    const [priceDirty, setPriceDirty] = useState(false);
    const [performanceDirty, setPerformanceDirty] = useState(false);
    const [dateDirty, setDateDirty] = useState(false);

    const [priceError, setPriceError] = useState('Поле не может быть пустым');
    const [performanceError, setPerformanceError] = useState('Поле не может быть пустым');
    const [dateError, setDateError] = useState('Поле не может быть пустым');

    const [formValid, setFormValid] = useState(false);

    const history = useHistory();

    useEffect(() => {
        init();
    }, []);

    const init = () => {
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
    }

    useEffect(() => {
        if (priceError || performanceError || dateError) {
            setFormValid(false);
        } else {
            setFormValid(true);
        }
    }, [priceError, performanceError, dateError])

    const blurHandler = (e) => {
        switch (e.target.name) {
            case 'price':
                setPriceDirty(true)
                break
            case 'performance':
                setPerformanceDirty(true)
                break
            case 'date':
                setDateDirty(true)
                break
        }
    }

    const PriceHandler = (e) => {
        let value = e.target.value;
        setPrice(value);
        if (!value || value === '')
            setPriceError('Поле не может быть пустым');
        else if (value <= 0)
            setPriceError('Цена должна быть больше 0');
        else
            setPriceError('');
    }

    const PerformanceHandler = (value) => {
        setPerformance(value);
        if (!value)
            setPerformanceError('Поле не может быть пустым');
        else setPerformanceError('');
    }

    const DateHandler = (value) => {
        setDate(value);
        if (!value)
            setDateError('Поле не может быть пустым');
        else setDateError('');
    }

    const saveTicket = (e) => {
        e.preventDefault();
        const ticket = {
            price,
            performance: {id: Number(performance)},
            date: {id: Number(date)}
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
            <h3 style={{ marginTop: 20, marginBottom: 20, marginLeft: 2 }}>Добавить группу билетов</h3>
            <form>
                <div className="form-group">
                    {(priceError && priceDirty) && <div style={{ color: "#D10000", marginLeft: 2, marginBottom: 5 }}>{priceError}</div>}
                    <label style={{ marginBottom: 10, width: 600 }}>Введите цену:</label>
                    <input onChange={e => PriceHandler(e)} onBlur={e => blurHandler(e)} name='price' style={{ marginBottom: 10, width: 600 }}
                           type="number"
                           className="form-control col-4"
                           id="price"
                           value={price}
                           placeholder="Введите цену"
                    />
                </div>
                <div>
                    <label style={{ marginBottom: 10, width: 600 }}>Выберите произведение:</label>
                    <select
                        onChange={e => PerformanceHandler(Number(e.target.value))}
                        style={{ marginBottom: 10, width:600 }}
                        className='form-select'
                        id="performance">
                        <option>Выберите произведение:</option>
                        {
                            performances && performances.map((performance) => (
                                <option key={performance.id} value={performance.id.toString()}>
                                    {performance.author.title}
                                </option>
                            ))
                        }
                    </select>
                </div>
                <div>
                    <label style={{ marginBottom: 10, width: 600 }}>Выберите дату:</label>
                    <select
                        onChange={e => DateHandler(Number(e.target.value))}
                        style={{ marginBottom: 10, width:600 }}
                        className='form-select'
                        id="date">
                        <option>Выберите дату:</option>
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

export default AddTickets;
