import React, { useState } from 'react';
import Axios from 'axios';
import { useHistory } from 'react-router-dom';

// const URL = 'https://subscription-manager-server.herokuapp.com/user';
const URL = 'http://localhost:5000/user';

export default function UserChangePassword() {
    const history = useHistory();
    const [password, setPassword] = useState('');
    const [duplicatePassword, setDuplicatePassword] = useState('');

    const changePassword = () => {
        if (password !== duplicatePassword) {
            // ADD ERROR MESSAGE HERE
            alert("Those passwords didn't match. Try again.");
            return;
        }
        Axios.post(
            URL,
            {
                query: `mutation createUser($password: String!) {
                    changePassword(password: $password) {
                        email
                    }
            }`,
                variables: {
                    password: password,
            }},
            { withCredentials: true }
        ).then(res => {
                if (res.data.errors) {
                    console.log(res.data.errors);
                    alert(res.data.errors[0].message);
                    return;
                }
                alert("Update successfully");
                // redirect to the user main page
                history.push({
                    pathname: '/user',
                });
        }).catch(err => {
            console.log(err.response.data);
        });
    }

    return (
    <div>
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
        <button onClick={changePassword}>Update</button>
    </div>
    )
}