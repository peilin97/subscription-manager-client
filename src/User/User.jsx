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
    setCover,
} from './userSlice.js';
import Subscriptions from '../Subscription/subscriptions';
import UserLogout from './userLogout';
import Cover from '../cover/cover';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import './user.css';

// const URL = 'https://subscription-manager-server.herokuapp.com/user';
const URL = 'http://localhost:5000/user';

export default function User() {
    const history = useHistory();
    const username = useSelector(selectUsername);
    const email = useSelector(selectEmail);
    const [isLoggedIn, setLoggedIn] = useState(false);
    
    const dispatch = useDispatch();
    // check if a user is logged in or not
    useEffect(()=> {
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
                // redirect to the login page
                history.push({
                    pathname: '/user/login',
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
    }, []);

    useEffect(()=>{Axios.post(
        URL,
        {
            query: `mutation getUser{
                getUser {
                email
                username
                cover
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
            console.log(res.data.data.getUser.cover);
            if(res.data.data.getUser.cover) {
                console.log("cover not null");
                dispatch(setCover(res.data.data.getUser.cover));
            }
            let list = res.data.data.getUser.subscriptions;
            list.sort((a, b) => new Date(a.billingDate) - new Date(b.billingDate));
            dispatch(setSubscriptions(list));
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
                <div className="controlBtns">
                    <button 
                    className = "editProfileBtn btn"
                    onClick={editProfile}>Edit Profile</button>
                    <button 
                    className = "changePasswordBtn btn"
                    onClick={changePassword}>Change Password</button>
                    <UserLogout
                    className = "logoutBtn btn"
                    onClick={() => setLoggedIn(false)}/>
                    <FontAwesomeIcon
                        className = "fontAwesomeIcon createBtn btn"
                        icon={faPlusCircle}
                        onClick={createSub} />
                    <Subscriptions />
                </div>
            </div>}
        </div>
    );
}
