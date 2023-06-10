import {Link, useHistory, useParams} from "react-router-dom";
import { useState, useEffect } from "react";
import employeeTypeService from "../../service/EmployeeTypeService";


const AddEmployeeType = () => {
    const [type, setType] = useState('');

    const [typeDirty, setTypeDirty] = useState(false);

    const [typeError, setTypeError] = useState('Поле не может быть пустым');

    const [formValid, setFormValid] = useState(false);

    const history = useHistory();

    let { id } = useParams();


    useEffect(() => {
        if (typeError) {
            setFormValid(false)
        } else {
            setFormValid(true)
        }
    }, [typeError])

    const blurHandler = (e) => {
        switch (e.target.name) {
            case 'type':
                setTypeDirty(true)
                break
        }
    }

    const typeHandler = (e) => {
        setType(e.target.value)
        if (e.target.value.length < 2 || e.target.value.length > 20)
            setTypeError('Некорректная длина')
        else if (!e.target.value)
            setTypeError('Поле не может быть пустым')
        else setTypeError('')
    }

    const saveType = (e) => {
        e.preventDefault();
        const employeeType = {
            type,
            id
        };

        console.log(employeeType);
        employeeTypeService.create(employeeType)
            .then(response => {
                console.log('Employee Type created', response.data);
                history.push('/employees_type');
            })
            .catch(error => {
                console.log('Something went wrong', error);
            });
    };


    return (
        <div className="container">
            <h3 style={{ marginTop: 20, marginBottom: 20, marginLeft: 2 }}>Добавить тип сотрудника</h3>
            <form>
                <div className="form-group">
                    {(typeError && typeDirty) && <div style={{ color: "#D10000", marginLeft: 2, marginBottom: 5 }}>{typeError}</div>}
                    <input onChange={e => typeHandler(e)} onBlur={e => blurHandler(e)} name='type' style={{ marginBottom: 10, width: 600 }}
                           type="text"
                           className="form-control col-4"
                           id="type"
                           value={type}
                           placeholder="Введите тип сотрудника"
                    />
                </div>
                <div>
                    <button disabled={!formValid} style={{ marginTop: 20, color: 'white' }} className="btn btn-dark mb-2"
                            onClick={(e) => saveType(e)}>
                        Сохранить
                    </button>
                    <Link to="/employees_type" style={{ marginLeft: 40, marginTop: 20, color: 'white' }} className="btn btn-dark mb-2 ">Назад</Link>
                </div>
            </form>
        </div>
    );
}

export default AddEmployeeType;
