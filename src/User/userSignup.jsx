import React, { useState } from 'react';
import Axios from 'axios';
import { useHistory } from 'react-router-dom';
import Header from '../header/Header'

const URL = 'https://subscription-manager-server.herokuapp.com/user';
// const URL = 'http://localhost:5000/user';

export default function UserSignup() {
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [duplicatePassword, setDuplicatePassword] = useState('');

    const signUp = () => {
        if (password !== duplicatePassword) {
            // ADD ERROR MESSAGE HERE
            alert("Those passwords didn't match. Try again.");
            return;
        }
        if (username === '') {
            alert("username cannot be empty");
            return;
        }
        if (email === '') {
            alert("email cannot be empty");
            return;
        }
        Axios.post(
            URL,
            {
                query: `mutation createUser($email: String!, $username: String!, 
                $password: String!) {
                    signup(email: $email, username: $username, 
                    password: $password) {
                        email,
                        username,
                        password
                    }
            }`,
                variables: {
                    email: email,
                    username: username,
                    password: password,
            }},
            { withCredentials: true }
            ).then(res => {
                if (res.data.errors) {
                    console.log(res.data.errors);
                    alert(res.data.errors[0].message);
                    return;
                }
                // redirect to the user main page
                history.push({
                    pathname: '/user',
                });
                // reset states
                setEmail('');
                setUsername('');
                setPassword('');
                setDuplicatePassword('');
            }).catch(err => {
                console.log(err.response.data);
            });
    };

    return (
        <div>
            <Header />
        <div className="authContainer">
            <div className="form">
                <label htmlFor="email" className="small">Email</label>
                <input
                    id="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
            </div>
            <div className="form">
                <label htmlFor="username" className="small">Username</label>
                <input
                    id="username"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                />
            </div>
            <div className="form">
                <label htmlFor="password" className="small">Password</label>
                <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
            </div>
            <div className="form">
                <label htmlFor="duplicatePassword" className="small">Confirm Password</label>
                <input
                    id="duplicatePassword"
                    type="password"
                    value={duplicatePassword}
                    onChange={e => setDuplicatePassword(e.target.value)}
                />
            </div>

            <button onClick={signUp} className="authBtn small">Sign Up</button>
        </div>
        </div>
    );
}
