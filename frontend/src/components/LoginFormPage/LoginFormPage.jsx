import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as sessionActions from '../../store/session';
import './LoginForm.css';


const LoginFormPage = () => {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);

    const [credential, setCredential] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);

    if (sessionUser) return <Redirect to="/" />;

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);

        let user = {credential: credential,
                    password: password}

        return dispatch(sessionActions.login(user)) // why do we need return here?
            .catch( async (res) =>{
                let data;
                try {
                    data = await res.clone().json();
                } catch {
                    data = await res.text();
                }
                if (data?.errors) setErrors(data.errors)
                else if (data) setErrors([data]);
                else setErrors([res.statusText]);
            });
    }

    return (
        <>
        <div id='signid-container'>
        <form id='login-form' onSubmit={handleSubmit}>
        <h2>Login</h2>
            <div>
                <label htmlFor='username'>Username:</label>
                    <input
                    id='username'
                    type="text"
                    value={credential}
                    onChange={e => {setCredential(e.target.value)}}
                    required
                    ></input>
            </div>
            <div>
                <label>Password:
                    <input
                    type="password"
                    value={password}
                    onChange={e => {setPassword(e.target.value)}}
                    required
                    ></input>   
                </label>
            </div>
            <button id='login-button' type="submit">Log In</button>
            <ul>
                {errors.map(error => <li key={error} className='errors'>{error}</li>)}
            </ul>
        </form>
        </div>
        </>
    )


}

export default LoginFormPage;