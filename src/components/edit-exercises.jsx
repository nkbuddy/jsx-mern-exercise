import React, { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import axios from 'axios';
import "react-datepicker/dist/react-datepicker.css";


export default function EditExercise() {
    const navigate = useNavigate();
    const params = useParams();

    const [username, setUsername] = useState('')
    const [description, setDescription] = useState('')
    const [duration, setDuration] = useState(0)
    const [date, setDate] = useState(new Date())
    const [users, setUsers] = useState([])

    const userInputRef = useRef('userInput');

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await axios.get(`http://localhost:5050/exercises/${params.id}`);
                const data = await response.data;

                setUsername(data.username);
                setDescription(data.description);
                setDuration(data.duration);
                setDate(new Date(data.date));
            }
            catch (error) {
                console.error(error);
            }
        };
        getData()

        const getUsers = async () => {
            const response = await axios.get('http://localhost:5050/users/');
            const data = await response.data;
            setUsers(data.map(user => user.username));
        };
        getUsers();
    }, [])


    const onChangeUsername = (e) => {
        setUsername(e.target.value);
    }

    const onChangeDescription = (e) => {
        setDescription(e.target.value);
    }

    const onChangeDuration = (e) => {
        setDuration(e.target.value);
    }

    const onChangeDate = (date) => {
        setDate(date)
    }

    const onSubmit = async (e) => {
        e.preventDefault();

        const exercise = {
            username: username,
            description: description,
            duration: duration,
            date: date,
        }
        console.log(exercise);
        try {
            await axios.post(`http://localhost:5050/exercises/update/${params.id}`, exercise)
                .then(res => console.log(res.data));
            navigate('/');
        }
        catch (error) {
            console.error(error);
        }
    }

    return (
        <div>
            <h3>Edit Exercise Log</h3>
            <form onSubmit={onSubmit}>
                <div className='form-group'>
                    <label>Username: </label>
                    <select ref={userInputRef}
                        required
                        className="form-control"
                        value={username}
                        onChange={onChangeUsername}>
                        {
                            users.map(function (user) {
                                return <option
                                    key={user}
                                    value={user}>{user}
                                </option>;
                            })
                        }
                    </select>
                </div>
                <div className="form-group">
                    <label>Description: </label>
                    <input type="text"
                        required
                        className="form-control"
                        value={description}
                        onChange={onChangeDescription}
                    />
                </div>
                <div className="form-group">
                    <label>Duration (in minutes): </label>
                    <input
                        type="text"
                        className="form-control"
                        value={duration}
                        onChange={onChangeDuration}
                    />
                </div>
                <div className="form-group">
                    <label>Date: </label>
                    <div>
                        <DatePicker
                            selected={date}
                            className="form-control"
                            onChange={onChangeDate}
                        />
                    </div>
                </div>

                <div className="form-group">
                    <input type="submit" value="Edit Exercise Log" className="btn btn-primary" />
                </div>
            </form>
        </div>
    );

}
