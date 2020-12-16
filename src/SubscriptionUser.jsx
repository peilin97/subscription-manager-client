import React from 'react';
import Axios from 'axios';

const URL = 'http://localhost:5000/user';

export default function SubscriptionUser() {
    const editSubscription = () => {
        Axios.post(
            URL,
            {
                query: `mutation editSubscription($id: String!, $name: String!, 
                    $billingDate: Date, $frequency: String!, 
                    $cost: Double, $category: String!) {
                
                    editSubscriptionToUser(id: $id, name: $name, 
                        billingDate: $billingDate, frequency: $frequency, 
                        cost: $cost, category: $category)  {
                        
                        {subscriptions {name, billingDate, frequency, cost, category}
                    }
                }
            }`,
                variables: {
                    id: '1234',
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
                    console.log('no error');
                }
                console.log(res.data.errors[0].message);
                console.log(res);
            })
            .catch(err => {
                console.log(err);
            });
    };

    const deleteSubscription = () => {
        Axios.post(
            URL,
            {
                query: `mutation deleteSubscription($id: String!) {
                
                    deleteSubscriptionToUser(id: $id)
                }
            }`,
                variables: {
                    id: '1234',
                },
            },
            { withCredentials: true }
        )
            .then(res => {
                if (res.data.errors) {
                    console.log('has error');
                } else {
                    console.log('no error');
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
            <button onClick={deleteSubscription}>delete Subscription</button>
            <button onClick={editSubscription}>edit an Subscription</button>
        </div>
    );
}
