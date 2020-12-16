import React, { useState } from 'react';
import Axios from 'axios';
import { useHistory } from 'react-router-dom';

// const URL = 'https://subscription-manager-server.herokuapp.com/user';
const URL = 'http://localhost:5000/user';

export default function CreateSub() {
    const history = useHistory();
    const [name, setName] = useState('');
    const [billingDate, setBillingDate] = useState('');
    const [category, setCategory] = useState('CONTENT');
    const [frequency, setFrequency] = useState("DAILY");
    const [cost, setCost] = useState(0.01);

    const createSubscription = () => {
        // check the validaity name and billing date
        if (name === '') {
            alert("Name cannot be empty");
            return;
        }
        if (billingDate === '') {
            alert("Billing date cannot be empty");
            return;
        }
        Axios.post(
            URL,
            {
                query: `mutation createSubscription(
                    $name: String!,
                    $billingDate: Date!,
                    $frequency: Frequency!, 
                    $cost: Float!,
                    $category: Category!
                    ){postSubscriptionToUser(
                        name: $name, 
                        billingDate: $billingDate,
                        frequency: $frequency, 
                        cost: $cost,
                        category: $category
                    ){username}}`,
                variables: {
                    name: name,
                    billingDate: billingDate,
                    frequency: frequency,
                    cost: parseFloat(cost),
                    category: category,
                },
            }, { withCredentials: true }
        ).then(
            res => {
                if (res.data.errors) {
                    console.log(res.data.errors);
                    return;
                } else {
                    alert('Create a new subscription');
                    history.push({
                        pathname: '/user',
                    });
                }
            }).catch(err => {
                console.log(err.response);
            });
    };

    return (
        <div>
            <h1>Subscriptions</h1>
                <h2> Create a new Subscription</h2>
                <div>
                    <div>
                        <label htmlFor="name">Name</label>
                        <input
                            required
                            id="name"
                            value={name}
                            onChange={e => setName(e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="billingDate">Next Billing Date</label>
                        <input
                            required
                            id="billingDate"
                            type="date"
                            min={new Date().toISOString().substring(0, 10)}
                            value={billingDate}
                            onChange={e => setBillingDate(e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="frequency">Frequency</label>
                        <select
                            required
                            id="frequency"
                            value={frequency}
                            onChange={e => setFrequency(e.target.value)}>
                            {/* <option value="">-</option> */}
                            <option value="DAILY">DAILY</option>
                            <option value="WEEKLY">WEEKLY</option>
                            <option value="MONTHLY">MONTHLY</option>
                            <option value="QUARTERLY">QUARTERLY</option>
                            <option value="HALFYEARLY">HALFYEARLY</option>
                            <option value="YEARLY">YEARLY</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="cost">Cost</label>
                        <input
                            required
                            id="cost"
                            type="number"
                            step = {0.01}
                            min = {0.01}
                            value={cost}
                            onChange={e => setCost(e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="category">Category</label>
                        <select
                            required
                            id="category"
                            value={category}
                            onChange={e => setCategory(e.target.value)}>
                            {/* <option value="">-</option> */}
                            <option value="CONTENT">CONTENT</option>
                            <option value="SERVICE">SERVICE</option>
                        </select>
                    </div>
                </div>
            <button onClick={createSubscription}>Create</button>
        </div>
    );
}
