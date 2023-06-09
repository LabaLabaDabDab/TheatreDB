import {Link, useHistory} from "react-router-dom";
import { useState, useEffect } from "react";
import dateOfPlayingService from "../../service/DateOfPlayingService";
import performanceService from "../../service/PerformanceService";
import dateOfPerformanceService from "../../service/DateOfPerformanceService";

const AddDateOfPerformance = () => {
    const [date, setDate] = useState("");
    const [performance, setPerformance] = useState("");

    const [dates, setDates] = useState([]);
    const [performances, setPerformances] = useState([]);

    const [dateError, setDateError] = useState('Поле не может быть пустым');
    const [performanceError, setPerformanceError] = useState('Поле не может быть пустым');

    const [formValid, setFormValid] = useState(false);

    const history = useHistory();

    useEffect(() => {
        init();
    }, []);

    const init = () => {
        dateOfPlayingService.getAllList()
            .then(response => {
                console.log(response.data);
                setDates(response.data);
            })
            .catch(error => {
                console.log('Something went wrong', error);
            });
        performanceService.getAllList()
            .then(response => {
                console.log(response.data);
                setPerformances(response.data);
            })
            .catch(error => {
                console.log('Something went wrong', error);
            });
    }

    useEffect(() => {
        if (dateError || performanceError) {
            setFormValid(false)
        } else {
            setFormValid(true)
        }
    }, [dateError, performanceError])


    const dateHandler = (value) => {
        setDate(value)
        if (!value)
            setDateError('Поле не может быть пустым')
        else setDateError('')
    }

    const performanceHandler = (value) => {
        setPerformance(value)
        if (!value)
            setPerformanceError('Поле не может быть пустым')
        else setPerformanceError('')
    }

    const saveDateOfPerformance = (e) => {
        e.preventDefault();
        const DateOfPerformance  = {
            date: {id: Number(date)},
            performance: {id: Number(performance)},
            id: { dateId: Number(date), performanceId: Number(performance) }
        };

        console.log(DateOfPerformance);
        dateOfPerformanceService.create(DateOfPerformance)
            .then(response => {
                console.log('DateOfPerformance created', response.data);
                history.push('/date_of_performance');
            })
            .catch(error => {
                console.log('Something went wrong', error);
            });
    };

    return (
        <div className="container">
            <h3 style={{ marginTop: 20, marginBottom: 20, marginLeft: 2 }}>Добавить дату представления</h3>
            <form>
                <div>
                    <select
                        onChange={e => dateHandler(Number(e.target.value))}
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
                    <select
                        onChange={e => performanceHandler(Number(e.target.value))}
                        style={{ marginBottom: 10, width:600 }}
                        className='form-select'
                        id="performance">
                        <option>Выберите представление:</option>
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
                    <button disabled={!formValid} style={{ marginTop: 20, color: 'white' }} className="btn btn-dark mb-2"
                            onClick={(e) => saveDateOfPerformance(e)}>
                        Сохранить
                    </button>
                    <Link to="/date_of_performance" style={{ marginLeft: 40, marginTop: 20, color: 'white' }} className="btn btn-dark mb-2 ">Назад</Link>
                </div>
            </form>
        </div>
    );
}

export default AddDateOfPerformance;
