import { Link, useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import producerService from "../../service/ProducerService";
import performanceService from "../../service/PerformanceService";
import producerPerformanceService from "../../service/ProducerPerformanceService";

const AddProducerPerformance = () => {
    const [producer, setProducer] = useState("");
    const [performance, setPerformance] = useState("");

    const [producers, setProducers] = useState([]);
    const [performances, setPerformances] = useState([]);

    const [producerDirty, setProducerDirty] = useState(false);
    const [performanceDirty, setPerformanceDirty] = useState(false);

    const [producerError, setProducerError] = useState('Поле не может быть пустым');
    const [performanceError, setPerformanceError] = useState('Поле не может быть пустым');

    const [formValid, setFormValid] = useState(false);

    const history = useHistory();

    useEffect(() => {
        init();
    }, []);

    const init = () => {
        producerService.getAllList()
            .then(response => {
                console.log(response.data);
                setProducers(response.data);
            })
            .catch(error => {
                console.log('Something went wrong', error);
            })
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
        if (producerError || performanceError) {
            setFormValid(false)
        } else {
            setFormValid(true)
        }
    }, [producerError, performanceError])

    const blurHandler = (e) => {
        switch (e.target.name) {
            case 'producer':
                setProducerDirty(true)
                break
            case 'performance':
                setPerformanceDirty(true)
                break
        }
    }

    const producerHandler = (value) => {
        setProducer(value)
        if (!value)
            setProducerError('Поле не может быть пустым')
        else setProducerError('')
    }

    const performanceHandler = (value) => {
        setPerformance(value)
        if (!value)
            setPerformanceError('Поле не может быть пустым')
        else setPerformanceError('')
    }

    const saveProducerPerformance = (e) => {
        e.preventDefault();
        const ProducerPerformance = {
            producer: { id: Number(producer) },
            performance: { id: Number(performance) },
            id: { producerId: Number(producer), performancesId: Number(performance) }
        };

        console.log(ProducerPerformance);
        producerPerformanceService.create(ProducerPerformance)
            .then(response => {
                console.log('ProducerPerformance created', response.data);
                history.push('/producers-performances');
            })
            .catch(error => {
                console.log('Something went wrong', error);
            });
    };

    return (
        <div className="container">
            <h3 style={{ marginTop: 20, marginBottom: 20, marginLeft: 2 }}>Добавить продюсера и представление</h3>
            <form>
                <div>
                    <select
                        onChange={e => producerHandler(Number(e.target.value))}
                        style={{ marginBottom: 10, width: 600 }}
                        className='form-select'
                        id="producer">
                        <option>Выберите продюсера:</option>
                        {
                            producers && producers.map((producer) => (
                                <option key={producer.id} value={producer.id.toString()}>
                                    {producer.employee.fio}
                                </option>
                            ))
                        }
                    </select>
                </div>
                <div>
                    <select
                        onChange={e => performanceHandler(Number(e.target.value))}
                        style={{ marginBottom: 10, width: 600 }}
                        className='form-select'
                        id="performance">
                        <option>Выберите представление:</option>
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
                    <button disabled={!formValid} style={{ marginTop: 20, color: 'white' }} className="btn btn-dark mb-2"
                            onClick={(e) => saveProducerPerformance(e)}>
                        Сохранить
                    </button>
                    <Link to="/producers-performances" style={{ marginLeft: 40, marginTop: 20, color: 'white' }} className="btn btn-dark mb-2 ">Назад</Link>
                </div>
            </form>
        </div>
    );
}

export default AddProducerPerformance;
