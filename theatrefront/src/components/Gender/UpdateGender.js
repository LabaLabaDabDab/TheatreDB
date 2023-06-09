import { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import genderService from "../../service/GenderService";

const UpdateGender = () => {

    const [type, setType] = useState('');
    const history = useHistory();

    let { id } = useParams();

    const saveGender = (e) => {
        e.preventDefault();

        const gender =
            {type};

        genderService.update(id, gender)
            .then(response => {
                console.log('Gender updated', response.data);
                history.push('/genders');
            })
            .catch(error => {
                console.log('Something went wrong', error);
            });
    }

    useEffect(() => {
        if (id) {
            genderService.get(id)
                .then(gender => {
                    setType(gender.data.type);
                })
                .catch(error => {
                    console.log('Something went wrong', error);
                })
        }
    }, [])


    return (
        <div className="container">
            <h3 style={{ marginTop: 20, marginBottom: 20, marginLeft: 2 }}>Обновить гендер</h3>
            <form>
                <div className="form-group">
                    <input style={{ marginBottom: 10, width: 600 }}
                           type="text"
                           className="form-control col-4"
                           id="type"
                           value={type}
                           onChange={(e) => setType(e.target.value)}
                           placeholder="Введите гендер"
                    />
                </div>
                <div>
                    <button style={{ marginTop: 20, color: 'white' }} className="btn btn-dark mb-2"
                            onClick={(e) => saveGender(e)}>
                        Сохранить
                    </button>
                    <Link to="/genders" style={{ marginLeft: 40, marginTop: 20, color: 'white' }} className="btn btn-dark mb-2 ">Назад</Link>
                </div>
            </form>
        </div>
    );
}

export default UpdateGender;