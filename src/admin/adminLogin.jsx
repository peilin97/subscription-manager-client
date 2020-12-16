import React, { useState } from 'react';
import Axios from 'axios';
import { useHistory } from 'react-router-dom';

// const URL = 'https://subscription-manager-server.herokuapp.com/admin';
const URL = 'http://localhost:5000/admin';

export default function AdminLogin() {

    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const login = () => {
        Axios.post(
            URL,
            {query: `mutation LoginAdmin(
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
            }`, variables: {
                email: email,
                password: password,
            }},
            {withCredentials: true}
        ).then(res => {
            if (res.data.errors) {
                alert(res.data.errors[0].message);
                return;
            }
            // redirect to the admin main page
            history.push({
                pathname: '/admin',
            });
        }).catch(err => {
            console.log(err);
        });
    }


    return (
    <div>
        <div>
            <label htmlFor="email">Email:</label>
            <input
                id="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
            />
        </div>
        <div>
            <label htmlFor="password">Password:</label>
            <input
                id="password"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
            />
        </div>
        <button onClick={login}>Log In</button>
    </div>)
}