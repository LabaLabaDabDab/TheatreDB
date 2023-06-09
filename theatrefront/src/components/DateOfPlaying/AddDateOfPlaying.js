import {Link, useHistory, useParams} from "react-router-dom";
import { useState, useEffect } from "react";
import dateOfPlayingService from "../../service/DateOfPlayingService";

const AddDateOfPlaying = () => {
    const [dateOfPerformance, setDateOfPerformance] = useState("");
    const [ticketsCount, setTicketsCount] = useState(Number);
    const [isTour, setIsTour] = useState(false);

    const [dateOfPerformanceDirty, setDateOfPerformanceDirty] = useState(false);
    const [ticketsCountDirty, setTicketsCountDirty] = useState(false);
    const [isTourDirty, setIsTourDirty] = useState(false);

    const [dateOfPerformanceError, setDateOfPerformanceError] = useState('Поле не может быть пустым');
    const [ticketsCountError, setTicketsCountError] = useState('Поле не может быть пустым');
    const [isTourError, setIsTourError] = useState('Поле не может быть пустым');

    const [formValid, setFormValid] = useState(false);

    const history = useHistory();

    let { id } = useParams();


    useEffect(() => {
        if (dateOfPerformanceError || ticketsCountError || isTourError) {
            setFormValid(false)
        } else {
            setFormValid(true)
        }
    }, [dateOfPerformanceError, ticketsCountError, isTourError])


    const blurHandler = (e) => {
        switch (e.target.name) {
            case 'dateOfPerformance':
                setDateOfPerformanceDirty(true)
                break
            case 'ticketsCount':
                setTicketsCountDirty(true)
                break
            case 'isTour':
                setIsTourDirty(true)
                break
        }
    }

    const DateOfPerformanceHandler = (e) => {
        setDateOfPerformance(e.target.value)
        if (!e.target.value || e.target.value === '')
            setDateOfPerformanceError('Поле не может быть пустым')
        else setDateOfPerformanceError('')
    }


    const TicketsCountHandler = (e) => {
        let value = e.target.value
        setTicketsCount(value)
        if (!value || value === '')
            setTicketsCountError('Поле не может быть пустым')
        else if (value <= 0)
            setTicketsCountError('Кол-во билетов должно быть больше 0')
        else
            setTicketsCountError('')
    }

    const IsTourHandler = (e) => {
        setIsTour(JSON.parse(e.target.value))
        setIsTourError('')
    }

    const saveDateOfPlaying = (e) => {
        e.preventDefault();
        const season = calculateSeason(dateOfPerformance);
        const DateOfPlaying  = {
            dateOfPerformance,
            season,
            ticketsCount,
            isTour
        };

        console.log(DateOfPlaying);
        dateOfPlayingService.create(DateOfPlaying)
            .then(response => {
                console.log('DateOfPlaying created', response.data);
                history.push('/date_of_playing');
            })
            .catch(error => {
                console.log('Something went wrong', error);
            });
    };

    const calculateSeason = (date) => {
        const month = new Date(date).getMonth() + 1;
        if (month <= 2 || month === 12) return 1; // winter
        if (month >= 3 && month <= 5) return 2; // spring
        if (month >= 6 && month <= 8) return 3; // summer
        if (month >= 9 && month <= 11) return 4; // autumn
    }

    return (
        <div className="container">
            <h3 style={{ marginTop: 20, marginBottom: 20, marginLeft: 2 }}>Добавить дату проведения</h3>
            <form>
                <div className="form-group">
                    {(dateOfPerformanceError && dateOfPerformanceDirty) && <div style={{ color: "#D10000", marginLeft: 2, marginBottom: 5 }}>{dateOfPerformanceError}</div>}
                    <label style={{ marginBottom: 10, width: 600 }}>Выберите дату проведения:</label>
                    <input onChange={e => DateOfPerformanceHandler(e)} onBlur={e => blurHandler(e)} name='dateOfPerformance' style={{ marginBottom: 10, width: 600 }}
                           type="date"
                           className="form-control col-4"
                           id="dateOfPerformance"
                           value={dateOfPerformance}
                           placeholder="Введите дату"
                    />
                </div>
                <div className="form-group">
                    {(ticketsCountError && ticketsCountDirty) && <div style={{ color: "#D10000", marginLeft: 2, marginBottom: 5 }}>{ticketsCountError}</div>}
                    <label style={{ marginBottom: 10, width: 600 }}>Введите кол-во билетов:</label>
                    <input onChange={e => TicketsCountHandler(e)} onBlur={e => blurHandler(e)} name='ticketsCount' style={{ marginBottom: 10, width: 600 }}
                           type="number"
                           className="form-control col-4"
                           id="ticketsCount"
                           value={ticketsCount}
                           placeholder="Введите кол-во билетов"
                    />
                </div>
                <div className="form-group">
                    {(isTourError && isTourDirty) && <div style={{ color: "#D10000", marginLeft: 2, marginBottom: 5 }}>{isTourError}</div>}
                    <label style={{ marginBottom: 10, width: 600 }}>Выберите является проводимая дата частью тура:</label>
                    <select onChange={e => IsTourHandler(e)} onBlur={e => blurHandler(e)} name='isTour' style={{ marginBottom: 10, width: 600 }}
                            className="form-control col-4"
                            id="isTour"
                            value={isTour}>
                        <option value={true}>True</option>
                        <option value={false}>False</option>
                    </select>
                </div>
                <div>
                    <button disabled={!formValid} style={{ marginTop: 20, color: 'white' }} className="btn btn-dark mb-2"
                            onClick={(e) => saveDateOfPlaying(e)}>
                        Сохранить
                    </button>
                    <Link to="/date_of_playing" style={{ marginLeft: 40, marginTop: 20, color: 'white' }} className="btn btn-dark mb-2 ">Назад</Link>
                </div>
            </form>
        </div>
    );
}

export default AddDateOfPlaying;