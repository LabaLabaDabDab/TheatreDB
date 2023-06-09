import { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import dateOfPlayingService from "../../service/DateOfPlayingService";

const UpdateDateOfPlaying = () => {
    const [dateOfPerformance, setDateOfPerformance] = useState("");
    const [ticketsCount, setTicketsCount] = useState(Number);
    const [isTour, setIsTour] = useState(false);

    let { id } = useParams();

    const history = useHistory();

    useEffect(() => {
        if (id) {
            dateOfPlayingService.get(id)
                .then(response => {
                    const dateOfPlaying = response.data;
                    setDateOfPerformance(dateOfPlaying.dateOfPerformance);
                    setTicketsCount(dateOfPlaying.ticketsCount);
                    setIsTour(dateOfPlaying.isTour);
                })
                .catch(error => {
                    console.log('Something went wrong', error);
                });
        }
    }, []);

    const calculateSeason = (date) => {
        const month = new Date(date).getMonth() + 1;
        if (month <= 2 || month === 12) return 1; // winter
        if (month >= 3 && month <= 5) return 2; // spring
        if (month >= 6 && month <= 8) return 3; // summer
        if (month >= 9 && month <= 11) return 4; // autumn
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

        dateOfPlayingService.update(id, DateOfPlaying)
            .then(response => {
                console.log('DateOfPlaying updated', response.data);
                history.push('/date_of_playing');
            })
            .catch(error => {
                console.log('Something went wrong', error);
            });
    };

    return (
        <div className="container">
            <h3 style={{ marginTop: 20, marginBottom: 20 }}>Обновить дату игры</h3>
            <form>
                <div className="form-group">
                    <label style={{ marginBottom: 10 }}>Выберите дату игры:</label>
                    <input onChange={e => setDateOfPerformance(e.target.value)}
                           type="date"
                           className="form-control"
                           id="dateOfPerformance"
                           value={dateOfPerformance}
                    />
                </div>
                <div className="form-group">
                    <label style={{ marginBottom: 10 }}>Выберите количество билетов:</label>
                    <input onChange={e => setTicketsCount(Number(e.target.value))}
                           type="number"
                           className="form-control"
                           id="ticketsCount"
                           value={ticketsCount}
                    />
                </div>
                <div className="form-group">
                    <label style={{ marginBottom: 10 }}>Это тур?</label>
                    <select onChange={e => setIsTour(e.target.value)}
                            className="form-control"
                            id="isTour"
                            value={isTour}>
                        <option value={true}>Да</option>
                        <option value={false}>Нет</option>
                    </select>
                </div>
                <div>
                    <button style={{ marginTop: 20, color: 'white' }} className="btn btn-dark mb-2"
                            onClick={(e) => saveDateOfPlaying(e)}>
                        Сохранить
                    </button>
                    <Link to="/date_of_playing" style={{ marginLeft: 40, marginTop: 20, color: 'white' }} className="btn btn-dark mb-2 ">Назад</Link>
                </div>
            </form>
        </div>
    );
}

export default UpdateDateOfPlaying;
