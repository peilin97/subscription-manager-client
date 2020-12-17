import React, { useState } from 'react';
import Axios from 'axios';
import { useHistory } from 'react-router-dom';
import Header from '../header/Header'

// const URL = 'https://subscription-manager-server.herokuapp.com/user';
const URL = 'http://localhost:5000/user';

export default function UserLogin() {
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const login = () => {
        Axios.post(
            URL,
            {
                query: `mutation LoginUser(
                $email: String!,
                $password: String!
                ) {
                login(
                    email: $email,
                    password: $password,
                ) {
                    id,
                    email,
                    username
                }
            }`,
                variables: {
                    email: email,
                    password: password,
                },
            },
            { withCredentials: true }
        )
            .then(res => {
                if (res.data.errors) {
                    alert(res.data.errors[0].message);
                    return;
                }
                // redirect to the admin main page
                history.push({
                    pathname: '/user',
                    state: {
                        original: res.data.original,
                    },
                });
            })
            .catch(err => {
                console.log(err);
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
                <label htmlFor="password" className="small">Password</label>
                <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
            </div>
            <button onClick={login} className="authBtn small">Log in</button>
        </div>
        </div>
    );
}
