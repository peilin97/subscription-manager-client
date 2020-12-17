import React, { useEffect } from 'react';
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
    selectLoggedIn,
    setLoggedIn,
} from './userSlice.js';
import Subscriptions from '../Subscription/subscriptions';
import Cover from '../cover/cover';
import Dropdown from 'react-bootstrap/Dropdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import './user.css';

const URL = 'https://subscription-manager-server.herokuapp.com/user';
// const URL = 'http://localhost:5000/user';

export default function User() {
    const history = useHistory();
    const username = useSelector(selectUsername);
    const email = useSelector(selectEmail);
    const loggedIn = useSelector(selectLoggedIn);
    // const [isLoggedIn, setLoggedIn] = useState(false);
    
    const dispatch = useDispatch();

    // check if a user is logged in or not
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
                    // redirect to the login page
                    history.push({
                        pathname: '/user/login',
                    });
                    // alert(res.data.errors[0].message);
                } else {
                    dispatch(setLoggedIn(true));
                }
            }).catch(err => {
                history.push({
                    pathname: '/user/login',
                });
                console.log(err.response);
            });
        }
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
            }
            console.log(res);
            dispatch(setUsername(res.data.data.getUser.username));
            dispatch(setEmail(res.data.data.getUser.email));
            // console.log(res.data.data.getUser.cover);
            if(res.data.data.getUser.cover) {
                console.log("cover not null");
                dispatch(setCover(res.data.data.getUser.cover));
            }
            let list = res.data.data.getUser.subscriptions;
            list.sort((a, b) => new Date(a.billingDate) - new Date(b.billingDate));
            dispatch(setSubscriptions(list));
        })
        .catch(err => {
            console.log(err);
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

    const logout = () => {
        dispatch(setLoggedIn(true));
        Axios.post(
            URL,
            {
                query: `mutation  LogOutUser {
                logout
            }`,
            },
            { withCredentials: true }
        ).then(res => {
                // redirect to the home page
                history.push({
                    pathname: '/',
                });
        }).catch(() => {
            history.push({
                pathname: '/',
            });
        });
    };
    
    return (
        <div>
            {loggedIn &&
            <div>
                <Cover />
                <div className="userBtns">
                <Dropdown>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                        <FontAwesomeIcon
                            className = "fontAwesomeIcon bigFontAwesome profileBtn"
                            icon={faUserCircle} />
                    </Dropdown.Toggle>
                    <Dropdown.Menu  className="dropdownMenu">
                        <Dropdown.Item onClick={editProfile}>Edit profile</Dropdown.Item>
                        <Dropdown.Item onClick={changePassword}>Change password</Dropdown.Item>
                        <Dropdown.Item onClick={logout}>Log out</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                <button>
                    <FontAwesomeIcon
                        className = "fontAwesomeIcon bigFontAwesome"
                        icon={faPlusCircle}
                        onClick={createSub} />
                    </button>
                    </div>                  
                    <Subscriptions />
                
            </div>}
        </div>
    );
}
