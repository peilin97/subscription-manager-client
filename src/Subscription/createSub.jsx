import React, { useState } from 'react';
import Axios from 'axios';
import { useHistory } from 'react-router-dom';

//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//import { faTimesCircle, faSearch } from '@fortawesome/free-solid-svg-icons';

// const URL = 'https://subscription-manager-server.herokuapp.com/user';
const URL = 'http://localhost:5000/user';

export default function CreateSub() {
    const history = useHistory();

    const createSubscription = () => {
        Axios.post(
            URL,
            {
                query: `mutation createSubscription($name: String!, 
                $billingDate: Date, $frequency: String!, 
                $cost: Double, $category: String!) {
                
                    postSubscriptionToUser(name: $name, 
                billingDate: $billingDate, frequency: $frequency, 
                cost: $cost, category: $category) 
                
                {subscriptions {name, billingDate, frequency, cost, category}
                }
            }
        }`,
                variables: {
                    name: 'admin3',
                    billingDate: '12/12/2021',
                    frequency: 'MONTHLY',
                    cost: 5.55,
                    category: 'CONTENT',
                },
            },
            { withCredentials: true }
        )
            .then(res => {
                if (res.data.errors) {
                    console.log('has error');
                } else {
                    history.push({
                        pathname: '/user',
                        state: {
                            original: res.data.original,
                        },
                    });
                }
                console.log(res.data.errors[0].message);
                console.log(res);
            })
            .catch(err => {
                console.log(err);
            });
    };
    return (
        <div>
            <button onClick={createSubscription}>delete Subscription</button>
        </div>
    );
}
