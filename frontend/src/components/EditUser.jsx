import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const EditUser = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [gender, setGender] = useState('Male');
    const { id } = useParams();
    const navigate = useNavigate();
    const apiUrl = process.env.REACT_APP_API_URL;

    useEffect(() => {
        getUserById();
    }, []);

    const getUserById = async () => {
        try {
            const response = await axios.get(`${apiUrl}/users/${id}`);
            setName(response.data.name);
            setEmail(response.data.email);
            setGender(response.data.gender);
        } catch (error) {
            console.error("There was an error fetching the user!", error);
        }
    };

    const updateUser = async (e) => {
        e.preventDefault();
        try {
            await axios.patch(`${apiUrl}/users/${id}`, {
                name,
                email,
                gender,
            });
            navigate('/');
        } catch (error) {
            console.error("There was an error updating the user!", error);
        }
    };

    return (
        <div className='columns'>
            <div className='column is-half'>
                <form onSubmit={updateUser}>
                    <div className='field'>
                        <label className='label'>Name</label>
                        <div className='control'>
                            <input
                                type='text'
                                className='input'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder='Name'
                            />
                        </div>
                    </div>
                    <div className='field'>
                        <label className='label'>Email</label>
                        <div className='control'>
                            <input
                                type='text'
                                className='input'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder='Email'
                            />
                        </div>
                    </div>
                    <div className='field'>
                        <label className='label'>Gender</label>
                        <div className='control'>
                            <div className='select is-fullwidth'>
                                <select
                                    value={gender}
                                    onChange={(e) => setGender(e.target.value)}
                                >
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className='field'>
                        <div className='control'>
                            <button type='submit' className='button is-info'>Update</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditUser;
