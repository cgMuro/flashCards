import React, { useState } from 'react';
import { FormText } from 'reactstrap';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthState';

export default function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { login } = useContext(AuthContext);

    const handleInput = (f, e) => {
        f(e.target.value);
    }

    const handleSubmit = (e) => {
        
        const user = {
            email,
            password
        }

        login(user)

        e.preventDefault();
    }

    return (
        <form onSubmit={(e) => handleSubmit(e)}>
            <h3 className="text-center mb-4">Sign in</h3>
            <div className="form-group">
                <label>Email</label>
                <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => handleInput(setEmail, e)}
                    className="form-control"
                    placeholder="Enter email"
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
                />
                <FormText>
                    <p className="forgot-password text-right">
                        Forgot <a href="#">password?</a>
                    </p>
                </FormText>
            </div>
            <button type="submit" className="btn btn-outline-primary btn-block mt-5">Submit</button>
            <p className="create-account mt-3">First time? <Link to="/register">Create an account</Link></p>
        </form>
    )
}
