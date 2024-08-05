import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddUser = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [gender, setGender] = useState('Male');
    const navigate = useNavigate();
    const apiUrl = process.env.REACT_APP_API_URL;

    const saveUser = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${apiUrl}/users`, {
                name,
                email,
                gender
            });
            navigate('/');
        } catch (error) {
            console.error("There was an error creating the user!", error);
        }
    };

    return (
        <div className='columns'>
            <div className='column is-half'>
                <form onSubmit={saveUser}>
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
                            <button type='submit' className='button is-info'>Save</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddUser;
