import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as sessionActions from '../../store/session'
import { Redirect } from "react-router-dom";
import './SignupForm.css'

const SignupForm = () => {
    const dispatch = useDispatch();
    // const sessionUser = useSelector(state => state.session.user); // select state for current user in state

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState([]);


    // if (sessionUser) return <Redirect to="/" />;


    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]); // set errors to empty every time we try to submit the form

        if(password === confirmPassword){
            
            const newUser = {
                username,
                email,
                password
            }
    
            return dispatch(sessionActions.signup(newUser))
                .catch(async (res) => {
                    let data;
                    try {
                    // .clone() essentially allows you to read the response body twice
                    data = await res.clone().json();
                    } catch {
                    data = await res.text(); // Will hit this case if the server is down
                    }
                    if (data?.errors) setErrors(data.errors);
                    else if (data) setErrors([data]);
                    else setErrors([res.statusText]);
                });
        }
        return setErrors(['Password and Confirm password must be the same']);
    }

    return (
        <>
        <div id="sign-container">
        <form id="signup-form" onSubmit={handleSubmit}>
            <h2>Sign Up</h2>
            <ul>
                {errors.map((error) => { return <li key={error} className='errors'>{error}</li>})}
            </ul>
            <div>
                <p>Username:</p>
                    <input
                    type="text"
                    value={username}
                    onChange={(e) => {setUsername(e.target.value)}}
                    /> 
            </div>

            <div>
                <p>Email:</p>
                    <input
                    type="text"
                    value={email}
                    onChange={(e) => {setEmail(e.target.value)}}
                    />
            </div>

            <div>
                <p>Password:</p>
                    <input
                    type="password"
                    value={password}
                    onChange={(e) => {setPassword(e.target.value)}}
                    />
            </div>

            <div>
                <p>Confirm password:</p>
                    <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => {setConfirmPassword(e.target.value)}}
                    />
            </div>

            <button id='login-signup-button' type="submit">Sign In</button>
        </form>
        </div>
        </>
    )
}

export default SignupForm;