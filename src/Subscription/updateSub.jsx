import React, { useState } from 'react';
import Axios from 'axios';
import { useLocation, useHistory } from 'react-router-dom';

// const URL = 'https://subscription-manager-server.herokuapp.com/user';
const URL = 'http://localhost:5000/user';

export default function UpdateSub() {
    const history = useHistory();
    const location = useLocation();
    const id  = location.state.sub.id;
    const [name, setName] = useState(location.state.sub.name);
    const [billingDate, setBillingDate] = useState(location.state.sub.billingDate);
    const [category, setCategory] = useState(location.state.sub.category);
    const [frequency, setFrequency] = useState(location.state.sub.frequency);
    const [cost, setCost] = useState(location.state.sub.cost);

    const editSubscription = () => {
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
                query: `mutation editSubscription(
                    $id: String!,
                    $name: String!,
                    $billingDate: Date!,
                    $frequency: Frequency!, 
                    $cost: Float!,
                    $category: Category!) {
                    editSubscriptionToUser(
                        id: $id,
                        name: $name, 
                        billingDate: $billingDate,
                        frequency: $frequency, 
                        cost: $cost, category: $category)  
                    { id }}`,
                variables: {
                    id: id,
                    name: name,
                    billingDate: billingDate,
                    frequency: frequency,
                    cost: parseFloat(cost),
                    category: category,
                },
            },
            { withCredentials: true }
        ).then(res => {
                if (res.data.errors) {
                    console.log(res.data.errors);
                    return;
                } 
                alert('Update successfully');
                    history.push({
                        pathname: '/user',
                    });
            })
            .catch(err => {
                console.log(err.response);
            });
    };

    return (
        <div className="authContainer">
                <div className="form">
                    <label htmlFor="name" className="small">Name</label>
                    <input
                        required
                        id="name"
                        value={name}
                        onChange={e => setName(e.target.value)} />
                </div>
                <div className="form">
                    <label htmlFor="billingDate" className="small">Next Billing Date</label>
                    <input
                        required
                        id="billingDate"
                        type="date"
                        min={new Date().toISOString().substring(0, 10)}
                        value={billingDate}
                        onChange={e => setBillingDate(e.target.value)} />
                </div>
                <div className="form">
                    <label htmlFor="frequency" className="small">Frequency</label>
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
                <div  className="form">
                    <label htmlFor="cost" className="small">Cost</label>
                    <input
                        required
                        id="cost"
                        type="number"
                        step = {0.01}
                        min = {0.01}
                        value={cost}
                        onChange={e => setCost(e.target.value)} />
                </div>
                <div className="form">
                    <label htmlFor="category" className="small">Category</label>
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
            <button onClick={editSubscription} className="authBtn small">Update</button>
        </div>
    );
}
