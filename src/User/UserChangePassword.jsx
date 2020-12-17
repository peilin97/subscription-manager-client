import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
    selectLoggedIn,
    setLoggedIn,
} from './userSlice.js';

// const URL = 'https://subscription-manager-server.herokuapp.com/user';
const URL = 'http://localhost:5000/user';

export default function UserChangePassword() {
    const history = useHistory();
    const [password, setPassword] = useState('');
    const [duplicatePassword, setDuplicatePassword] = useState('');
    const loggedIn = useSelector(selectLoggedIn);
    const dispatch = useDispatch();

    useEffect(()=> {
        if (!loggedIn) {
            Axios.post(
                URL,
                {query: `query User {
                    user {
                        username
                    }
                }`,},
                { withCredentials: true }
            ).then(res => {
                if (res.data.errors) {
                    history.push({pathname: '/',})
                } else {
                    dispatch(setLoggedIn(true));
                }
            }).catch(err  => {
                console.log(err.response);
                history.push({pathname: '/',})
            });
        }
    }, []);

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
            <h1>Change your password</h1>
    <div className="authContainer">
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
        <button onClick={changePassword} className="authBtn small">Update</button>
    </div>
    </div>
    )
}