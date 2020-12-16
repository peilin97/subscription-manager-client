import React, { useState, useEffect } from 'react';
import Axios from 'axios';
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//import { faTimesCircle, faSearch } from '@fortawesome/free-solid-svg-icons';

const URL = 'https://subscription-manager-server.herokuapp.com/user';
// const URL = 'http://localhost:5000/user';

export default function User() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [subscriptions, setSubscriptions] = useState('');

    useEffect(()=>{Axios.post(
        URL,
        {
            query: `mutation getUser{
                getUser {
                username
                subscriptions {id, name, billingDate, frequency, cost, category}
            }
        }`,
        },
        { withCredentials: true }
    )
        .then(res => {
            if (res.data.errors) {
                // alert(res.data.errors[0].message);
                console.log(res.data);
            }
            setEmail(res.data.data)
            console.log(res.data)
        })
        .catch(err => {
            console.log(err.response);
        });}, [])
    return (
        <div>
            <button>log in</button>
        </div>
    );
}
