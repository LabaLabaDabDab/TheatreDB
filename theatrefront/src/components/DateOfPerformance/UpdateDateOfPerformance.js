import { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import dateOfPlayingService from "../../service/DateOfPlayingService";
import performanceService from "../../service/PerformanceService";
import dateOfPerformanceService from "../../service/DateOfPerformanceService";

const UpdateDateOfPerformance = () => {
    const [date, setDate] = useState("");
    const [performance, setPerformance] = useState("");

    const [dates, setDates] = useState([]);
    const [performances, setPerformances] = useState([]);

    let { id } = useParams();
    const [dateId, performanceId] = id.split('.');

    const history = useHistory();

    const saveDateOfPerformance = (e) => {
        e.preventDefault();

        const DateOfPerformance  = {
            date: {id: Number(date)},
            performance: {id: Number(performance)},
        };

        dateOfPerformanceService.update(dateId, performanceId, DateOfPerformance)
            .then(response => {
                console.log('DateOfPerformance updated', response.data);
                history.push('/date_of_performance');
            })
            .catch(error => {
                console.log('Something went wrong', error);
            });
    }

    useEffect(() => {
        if (id) {
            const [dateId, performanceId] = id.split('.');
            dateOfPerformanceService.get(dateId, performanceId)
                .then(response => {
                    const datePerformance = response.data;
                    const tempDate = datePerformance.date.id;
                    const tempPerformance = datePerformance.performance.id;

                    dateOfPlayingService.getAllList()
                        .then(response => {
                            console.log(response.data);
                            setDates(response.data);
                            setDate(tempDate);
                        })
                        .catch(error => {
                            console.log('Something went wrong', error);
                        });

                    performanceService.getAllList()
                        .then(response => {
                            console.log(response.data);
                            setPerformances(response.data);
                            setPerformance(tempPerformance);
                        })
                        .catch(error => {
                            console.log('Something went wrong', error);
                        });
                })
                .catch(error => {
                    console.log('Something went wrong', error);
                });
        } else {
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
    }, []);

    return (
        <div className="container">
            <h3 style={{ marginTop: 20, marginBottom: 20, marginLeft: 2 }}>Обновить дату представления</h3>
            <form>
                <div className="form-group">
                    <label style={{ marginBottom: 10, width: 600 }}>Выберите дату:</label>
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
                <div className="form-group">
                    <label style={{ marginBottom: 10, width: 600 }}>Выберите представление:</label>
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
                <div>
                    <button style={{ marginTop: 20, color: 'white' }} className="btn btn-dark mb-2"
                            onClick={(e) => saveDateOfPerformance(e)}>
                        Сохранить
                    </button>
                    <Link to="/date_of_performance" style={{ marginLeft: 40, marginTop: 20, color: 'white' }} className="btn btn-dark mb-2 ">Назад</Link>
                </div>
            </form>
        </div>
    );
}

export default UpdateDateOfPerformance;
