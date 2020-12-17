import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { useLocation, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectLoggedIn, setLoggedIn } from './userSlice.js';
import './user.css';

export default function UserEditProfile() {
    const history = useHistory();
    const location = useLocation();
    const [email, setEmail] = useState(location.state.email);
    const [username, setUsername] = useState(location.state.username);
    const loggedIn = useSelector(selectLoggedIn);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!loggedIn) {
            Axios.post(
                process.env.REACT_APP_USER_SERVER,
                {
                    query: `query User {
                    user {
                        username
                    }
                }`,
                },
                { withCredentials: true }
            )
                .then(res => {
                    if (res.data.errors) {
                        history.push({ pathname: '/' });
                    } else {
                        dispatch(setLoggedIn(true));
                    }
                })
                .catch(err => {
                    console.log(err.response);
                    history.push({ pathname: '/' });
                });
        }
    }, []);

    const EditUserProfile = () => {
        if (username === '') {
            alert('username cannot be empty');
            return;
        }
        if (email === '') {
            alert('email cannot be empty');
            return;
        }
        Axios.post(
            process.env.REACT_APP_USER_SERVER,
            {
                query: `mutation EditUserProfile(
                $email: String!,
                $username: String!,
                ) {
                    editProfile(
                    email: $email,
                    username: $username,
                ) {
                    email,
                    username,
                }
            }`,
                variables: {
                    email: email,
                    username: username,
                },
            },
            { withCredentials: true }
        )
            .then(res => {
                if (res.data.errors) {
                    console.log(res.data.errors);
                    alert(res.data.errors[0].message);
                    return;
                }
                alert('Update successfully');
                // redirect to the user main page
                history.push({
                    pathname: '/user',
                });
            })
            .catch(err => {
                console.log(err.response);
            });
    };

    return (
        <div>
            <h1> Update your profile</h1>
            <div className="authContainer editProfile">
                <div className="form">
                    <label htmlFor="email" className="small">
                        Email
                    </label>
                    <input
                        id="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </div>
                <div className="form">
                    <label htmlFor="username" className="small">
                        Username
                    </label>
                    <input
                        id="username"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                    />
                </div>
                <button onClick={EditUserProfile} className="authBtn small">
                    Update
                </button>
            </div>
        </div>
    );
}
