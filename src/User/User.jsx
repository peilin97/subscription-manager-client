import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Axios from 'axios';
import {
    selectUsername,
    setEmail,
    setSubscriptions,
    setUsername,
    selectEmail,
} from './userSlice.js';
import Subscriptions from '../Subscription/subscriptions';
import UserLogout from './userLogout';
import Cover from '../cover/cover';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';

// const URL = 'https://subscription-manager-server.herokuapp.com/user';
const URL = 'http://localhost:5000/user';

export default function User() {
    const history = useHistory();
    const username = useSelector(selectUsername);
    const email = useSelector(selectEmail);
    const [isLoggedIn, setLoggedIn] = useState(false);
    
    const dispatch = useDispatch();
    // check if a user is logged in or not
    Axios.post(
        URL,
        {query: `query User {
            user {
                username
            }
        }`,},
        {withCredentials: true}
    ).then(res => {
        if (res.data.errors) {
            // redirect to the login page
            history.push({
                pathname: '/user/login',
                state: {
                    original: res.data.original,
                },
            });
            // alert(res.data.errors[0].message);
        } else {
            setLoggedIn(true);
        }
    }).catch(err => {
        history.push({
            pathname: '/admin/login',
        });
        console.log(err.response);
    });

    useEffect(()=>{Axios.post(
        URL,
        {
            query: `mutation getUser{
                getUser {
                email
                username
                subscriptions {id, name, billingDate, frequency, cost, category}
            }
        }`,
        },
        { withCredentials: true }
    )
        .then(res => {
            if (res.data.errors) {
                console.log(res.data.errors);
                return;
            }
            dispatch(setUsername(res.data.data.getUser.username));
            dispatch(setEmail(res.data.data.getUser.email));
            // setUsername(res.data.data.getUser.username);
            // setEmail(res.data.data.getUser.email);
            let list = res.data.data.getUser.subscriptions;
            list.sort((a, b) => new Date(a.billingDate) - new Date(b.billingDate));
            // console.log(list);
            // setSubscriptions(list);
            dispatch(setSubscriptions(list));
            // console.log(subscriptions);
        })
        .catch(err => {
            console.log(err.response);
        });
    }, []);

    const createSub = () => {
        history.push({pathname: '/subscription/new',})
    }

    const editProfile = () => {
        history.push({
            pathname: '/user/edit',
            state: {
                email: email,
                username: username,
            }
        })
    }

    const changePassword = () => {
        history.push({
            pathname: '/user/edit/password',
        });
    }
    
    return (
        <div>
            {isLoggedIn &&
            <div>
                <Cover />
                <div>
                    <button onClick={editProfile}>Edit Profile</button>
                    <button onClick={changePassword}>Change Password</button>
                    <UserLogout onClick={() => setLoggedIn(false)}/>
                    <FontAwesomeIcon
                        className = "fontAwesomeIcon"
                        icon={faPlusCircle}
                        onClick={createSub} />
                    <Subscriptions />
                </div>
            </div>}
        </div>
    );
}
