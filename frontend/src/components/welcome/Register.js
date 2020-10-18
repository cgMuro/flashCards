import React, { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthState';
import { Link } from 'react-router-dom';

export default function Register() {

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { register } = useContext(AuthContext);

    const handleInput = (f, e) => {
        f(e.target.value);
    }

    const handleSubmit = (e) => {
        const newUser = {
            username,
            email,
            password
        }
        // Register user
        register(newUser);

        e.preventDefault();
    }

    return (
        <form onSubmit={(e) => handleSubmit(e)}>
            <h3 className="text-center mb-4">Sign up</h3>
            <div className="form-group">
                <label>Username</label>
                <input
                    type="name"
                    name="username"
                    value={username}
                    onChange={(e) => handleInput(setUsername, e)}
                    className="form-control"
                    placeholder="Enter username"
                    required
                />
            </div>
            <div className="form-group">
                <label>Email</label>
                <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => handleInput(setEmail, e)}
                    className="form-control"
                    placeholder="example@gmail.com"
                    required
                />
            </div>
            <div className="form-group">
                <label>Password</label>
                <input
                    type="password"
                    name="password"
                    value={password}
                    onChange={(e) => handleInput(setPassword, e)}
                    className="form-control"
                    placeholder="Enter password"
                    required
                />
            </div>
            <button type="submit" className="btn btn-outline-info btn-block mt-5">Register</button>
            <p className="back-login mt-3">Do you already have an account? <Link to="/login">Go back to login</Link></p>
        </form>
    )
}
