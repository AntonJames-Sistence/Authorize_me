import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import './LoginForm.css';


const LoginForm = () => {
    const dispatch = useDispatch();
    // const sessionUser = useSelector(state => state.session.user);

    const [credential, setCredential] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);

    // if (sessionUser) return <Redirect to="/" />;

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
        <div id='sign-container'>
        <form id='login-form' onSubmit={handleSubmit}>
        <h2>Login</h2>
        <ul>
            {errors.map(error => <li key={error} className='errors'>{error}</li>)}
        </ul>
            <div>
                <p>Username:</p>
                    <input
                    id='username'
                    type="text"
                    value={credential}
                    onChange={e => {setCredential(e.target.value)}}
                    required
                    />
            </div>
            <div>
                <p>Password:</p>
                    <input
                    type="password"
                    value={password}
                    onChange={e => {setPassword(e.target.value)}}
                    required
                    />
            </div>
            <button id='login-signup-button' type="submit">Log In</button>
        </form>
        </div>
        </>
    )


}

export default LoginForm;