import { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import dateOfTourService from "../../service/DateOfTourService";
import performanceService from "../../service/PerformanceService";

const UpdateDateOfTour = () => {
    const [dateStart, setDateStart] = useState("");
    const [dateEnd, setDateEnd] = useState("");
    const [performance, setPerformance] = useState("");

    const [performances, setPerformances] = useState([]);

    let { id } = useParams();

    const history = useHistory();

    const saveDateOfTour = (e) => {
        e.preventDefault();

        const DateOfTour  = {
            dateStart,
            dateEnd,
            performance: {id: Number(performance)}
        };

        dateOfTourService.update(id, DateOfTour)
            .then(response => {
                console.log('DateOfTour updated', response.data);
                history.push('/date_of_tour');
            })
            .catch(error => {
                console.log('Something went wrong', error);
            });
    }

    useEffect(() => {
        if (id) {
            dateOfTourService.get(id)
                .then(dateOfTour => {
                    setDateStart(dateOfTour.data.dateStart);
                    setDateEnd(dateOfTour.data.dateEnd);
                    const tempPerformance = dateOfTour.data.performance.id;

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
            performanceService.getAllList()
                .then(response => {
                    console.log(response.data);
                    setPerformances(response.data);
                })
                .catch(error => {
                    console.log('Something went wrong', error);
                });
        }
    }, [])

    const handleDateEndChange = (e) => {
        const newDateEnd = e.target.value;

        const start = new Date(dateStart);
        const end = new Date(newDateEnd);

        if (start > end) {
            alert('Дата конца не может быть раньше даты начала');
            return;
        }

        setDateEnd(newDateEnd);
    }

    return (
        <div className="container">
            <h3 style={{ marginTop: 20, marginBottom: 20 }}>Обновить дату тура</h3>
            <form>
                <div className="form-group">
                    <label>Дата начала:</label>
                    <input onChange={e => setDateStart(e.target.value)}
                           style={{ marginBottom: 10, width: 600 }}
                           type="date"
                           className="form-control"
                           id="dateStart"
                           value={dateStart}
                    />
                </div>
                <div className="form-group">
                    <label>Дата конца:</label>
                    <input onChange={handleDateEndChange} style={{ marginBottom: 10 }}
                           style={{ marginBottom: 10, width: 600 }}
                           type="date"
                           className="form-control"
                           id="dateEnd"
                           value={dateEnd}
                    />
                </div>
                <div>
                    <label>Выберите представление:</label>
                    <select
                        className='form-select'
                        id="performance"
                        value={performance}
                        style={{ marginBottom: 10, width: 600 }}
                        onChange={e => setPerformance(Number(e.target.value))}>
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
                            onClick={(e) => saveDateOfTour(e)}>
                        Сохранить
                    </button>
                    <Link to="/date_of_tour" style={{ marginLeft: 40, marginTop: 20, color: 'white' }} className="btn btn-dark mb-2 ">Назад</Link>
                </div>
            </form>
        </div>
    );
}

export default UpdateDateOfTour;
