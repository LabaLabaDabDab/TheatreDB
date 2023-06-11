import { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import producerService from "../../service/ProducerService";
import performanceService from "../../service/PerformanceService";
import producerPerformanceService from "../../service/ProducerPerformanceService";

const UpdateProducerPerformance = () => {
    const [producer, setProducer] = useState("");
    const [performance, setPerformance] = useState("");

    const [producers, setProducers] = useState([]);
    const [performances, setPerformances] = useState([]);

    let { id } = useParams();
    const [producerID, performanceID] = id.split('.');

    const history = useHistory();

    const saveProducerPerformance = (e) => {
        e.preventDefault();

        const ProducerPerformance = {
            producer: { id: Number(producer) },
            performance: { id: Number(performance) }
        };

        producerPerformanceService.update(producerID, performanceID, ProducerPerformance)
            .then(response => {
                console.log('ProducerPerformance updated', response.data);
                history.push('/producers-performances');
            })
            .catch(error => {
                console.log('Something went wrong', error);
            });
    }

    useEffect(() => {
        if (id) {
            const [producerID, performanceID] = id.split('.');
            producerPerformanceService.get(producerID, performanceID)
                .then(response => {
                    const producerPerformance = response.data;
                    const tempProducer = producerPerformance.producer.id;
                    const tempPerformance = producerPerformance.performance.id;

                    producerService.getAllList()
                        .then(response => {
                            console.log(response.data);
                            setProducers(response.data);
                            setProducer(tempProducer);
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
            producerService.getAllList()
                .then(response => {
                    console.log(response.data);
                    setProducers(response.data);
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
            <h3 style={{ marginTop: 20, marginBottom: 20, marginLeft: 2 }}>Обновить продюсера и представление</h3>
            <form>
                <div className="form-group">
                    <label style={{ marginBottom: 10, width: 600 }}>Выберите продюсера:</label>
                    <select
                        style={{ marginBottom: 10, width: 600 }}
                        className="form-control col-4"
                        id="producer"
                        value={producer}
                        onChange={(e) => setProducer(Number(e.target.value))}>
                        {
                            producers && producers.map((producer) => (
                                <option key={producer.id} value={producer.id.toString()}>
                                    {producer.employee.fio}
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
                                <option key={performance.id.toString()} value={performance.id.toString()}>
                                    {performance.author.title}
                                </option>
                            ))
                        }
                    </select>
                </div>
                <div>
                    <button style={{ marginTop: 20, color: 'white' }} className="btn btn-dark mb-2"
                            onClick={(e) => saveProducerPerformance(e)}>
                        Сохранить
                    </button>
                    <Link to="/producers-performances" style={{ marginLeft: 40, marginTop: 20, color: 'white' }} className="btn btn-dark mb-2 ">Назад</Link>
                </div>
            </form>

        </div>
    );
}

export default UpdateProducerPerformance;
