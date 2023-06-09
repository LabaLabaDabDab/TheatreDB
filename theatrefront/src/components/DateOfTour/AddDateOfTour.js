import { useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import dateOfTourService from "../../service/DateOfTourService";
import performanceService from "../../service/PerformanceService";

const AddDateOfTour = () => {
    const [dateStart, setDateStart] = useState("");
    const [dateEnd, setDateEnd] = useState("");
    const [performance, setPerformance] = useState("");

    const [performances, setPerformances] = useState([]);

    const [dateStartError, setDateStartError] = useState('Поле не может быть пустым');
    const [dateEndError, setDateEndError] = useState('Поле не может быть пустым');
    const [performanceError, setPerformanceError] = useState('Поле не может быть пустым');

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
            })
    }

    useEffect(() => {
        if (dateStartError || dateEndError || performanceError) {
            setFormValid(false);
        } else {
            setFormValid(true);
        }
    }, [dateStartError, dateEndError, performanceError])

    const DateStartHandler = (e) => {
        setDateStart(e.target.value)
        if (!e.target.value || e.target.value === '')
            setDateStartError('Поле не может быть пустым')
        else setDateStartError('')
    }

    const DateEndHandler = (e) => {
        setDateEnd(e.target.value);
        if(e.target.value) {
            if(new Date(e.target.value) < new Date(dateStart)) {
                setDateEndError('Дата конца не может быть раньше даты начала');
            } else {
                setDateEndError('');
            }
        } else {
            setDateEndError('');
        }
    }

    const PerformanceHandler = (value) => {
        setPerformance(value)
        if (!value)
            setPerformanceError('Поле не может быть пустым')
        else setPerformanceError('')
    }

    const saveDateOfTour = (e) => {
        e.preventDefault();
        const DateOfTour  = {
            dateStart,
            dateEnd,
            performance: {id: Number(performance)}
        };

        dateOfTourService.create(DateOfTour)
            .then(response => {
                console.log('DateOfTour created', response.data);
                history.push('/date_of_tour');
            })
            .catch(error => {
                console.log('Something went wrong', error);
            });
    };

    return (
        <div className="container">
            <h3 style={{ marginTop: 20, marginBottom: 20 }}>Добавить дату тура</h3>
            <form>
                <div className="form-group">
                    {(dateStartError) && <div style={{ color: "red", marginBottom: 5 }}>{dateStartError}</div>}
                    <label style={{ marginBottom: 10 }}>Дата начала тура:</label>
                    <input onChange={e => DateStartHandler(e)} style={{ marginBottom: 10 }} type="date"
                           className="form-control"
                           id="dateStart"
                           value={dateStart}
                    />
                </div>
                <div className="form-group">
                    {(dateEndError) && <div style={{ color: "red", marginBottom: 5 }}>{dateEndError}</div>}
                    <label style={{ marginBottom: 10 }}>Дата конца тура:</label>
                    <input onChange={e => DateEndHandler(e)} style={{ marginBottom: 10 }} type="date"
                           className="form-control"
                           id="dateEnd"
                           value={dateEnd}
                    />
                </div>
                <div>
                    <label style={{ marginBottom: 10 }}>Выберите представление:</label>
                    <select
                        onChange={e => PerformanceHandler(Number(e.target.value))}
                        className='form-select'
                        id="performance">
                        <option>Выберите представление</option>
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
                            onClick={(e) => saveDateOfTour(e)}>
                        Сохранить
                    </button>
                    <Link to="/date_of_tour" style={{ marginLeft: 40, marginTop: 20, color: 'white' }} className="btn btn-dark mb-2 ">Назад</Link>
                </div>
            </form>
        </div>
    );
}

export default AddDateOfTour;
