import React, {useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import Axios from 'axios';
import Header from '../header/Header'
import './home.css';

// const URL = 'https://subscription-manager-server.herokuapp.com/user';
const URL = 'http://localhost:5000/user';

export default function Home() {

    const history = useHistory();

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
            if (!res.data.errors) {
                history.push({pathname: '/user',})
            }
        }).catch(err  => {
            console.log(err.response);
        });
    }, []);

    return (
        <div>
            <Header />
            <div className="home">
                <img className="homeImg"
                src="https://images.unsplash.com/photo-1473181488821-2d23949a045a?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80" alt="home"></img>
                <h1>One-stop Subscription Manager</h1>
                <h2 className="">Organize all your subscriptions</h2>
            </div>
        </div>
    );
}