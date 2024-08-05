import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const UserList = () => {
    const [users, setUsers] = useState([]);
    const apiUrl = process.env.REACT_APP_API_URL;

    const getUsers = async () => {
        try {
            const response = await axios.get(`${apiUrl}/users`);
            setUsers(response.data);
        } catch (error) {
            console.error("There was an error fetching the users!", error);
        }
    };

    
    useEffect(() => {
        getUsers();
    }, []);

    const deleteUser = async (id) => {
        try {
            await axios.delete(`${apiUrl}/users/${id}`);
            getUsers();
        } catch (error) {
            console.error("There was an error deleting the user!", error);
        }
    };

    return (
        <div className="columns">
            <div className="column is-half">
                <Link to="add" className="button is-info">Add New</Link>
                <table className="table is-striped is-fullwidth mt-5">
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Gender</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <tr key={user._id}>
                                <td>{index + 1}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.gender}</td>
                                <td>
                                    <Link to={`edit/${user._id}`} className="button is-primary is-small">Edit</Link>
                                    <button onClick={() => deleteUser(user._id)} className="button is-danger is-small">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UserList;
