import React, { useState } from 'react';
import Axios from 'axios';
import { useHistory } from 'react-router-dom';

// const URL = 'https://subscription-manager-server.herokuapp.com/admin';
const URL = 'http://localhost:5000/admin';

export default function AdminSignup() {
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [duplicatePassword, setDuplicatePassword] = useState('');
    const [invitationCode, setInvitationCode] = useState('');

    const signUp = () => {
        if (password !== duplicatePassword) {
            // ADD ERROR MESSAGE HERE
            alert("Those passwords didn't match. Try again.");
            return;
        }
        Axios.post(
            URL,
            {query: `mutation CreateAdmin(
                $email: String!,
                $username: String!,
                $password: String!,
                $invitationCode: String!
                ) {
                signup(
                    email: $email,
                    username: $username,
                    password: $password,
                    invitationCode: $invitationCode,
                ) {
                    id,
                    email,
                    username
                }
            }`, variables: {
                email: email,
                username: username,
                password: password,
                invitationCode: invitationCode
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
        }).finally( () => {
            // reset states
            setEmail('');
            setUsername('');
            setPassword('');
            setDuplicatePassword('');
            setInvitationCode('');
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
            <label htmlFor="username">Username:</label>
            <input
                id="username"
                value={username}
                onChange={e => setUsername(e.target.value)}
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
        <div>
            <label htmlFor="duplicatePassword">Confirm Password:</label>
            <input
                id="duplicatePassword"
                type="password"
                value={duplicatePassword}
                onChange={e => setDuplicatePassword(e.target.value)}
            />
        </div>
        <div>
            <label htmlFor="invitationCode">Invitation Code:</label>
            <input
                id="invitationCode"
                value={invitationCode}
                onChange={e => setInvitationCode(e.target.value)}
            />
        </div>
        <button onClick={signUp}>Sign Up</button>
    </div>)
}