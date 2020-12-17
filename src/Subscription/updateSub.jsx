import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { selectLoggedIn, setLoggedIn } from '../User/userSlice.js';
import { useLocation, useHistory } from 'react-router-dom';

export default function UpdateSub() {
    const history = useHistory();
    const location = useLocation();
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [billingDate, setBillingDate] = useState('');
    const [category, setCategory] = useState('');
    const [frequency, setFrequency] = useState('');
    const [cost, setCost] = useState('');
    const loggedIn = useSelector(selectLoggedIn);
    const dispatch = useDispatch();

    // check if a user is logged in or not
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

    // check location.state
    useEffect(() => {
        if (location.state === undefined) {
            history.push({ pathname: '/' });
            return;
        }
        setId(location.state.sub.id);
        setName(location.state.sub.name);
        setBillingDate(location.state.sub.billingDate);
        setCategory(location.state.sub.category);
        setFrequency(location.state.sub.frequency);
        setCost(location.state.sub.cost);
    }, []);

    const editSubscription = () => {
        // check the validaity name and billing date
        if (name === '') {
            alert('Name cannot be empty');
            return;
        }
        if (billingDate === '') {
            alert('Billing date cannot be empty');
            return;
        }
        Axios.post(
            process.env.REACT_APP_USER_SERVER,
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
        )
            .then(res => {
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
                <label htmlFor="name" className="small">
                    Name
                </label>
                <input
                    required
                    id="name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                />
            </div>
            <div className="form">
                <label htmlFor="billingDate" className="small">
                    Next Billing Date
                </label>
                <input
                    required
                    id="billingDate"
                    type="date"
                    min={new Date().toISOString().substring(0, 10)}
                    value={billingDate}
                    onChange={e => setBillingDate(e.target.value)}
                />
            </div>
            <div className="form">
                <label htmlFor="frequency" className="small">
                    Frequency
                </label>
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
            <div className="form">
                <label htmlFor="cost" className="small">
                    Cost
                </label>
                <input
                    required
                    id="cost"
                    type="number"
                    step={0.01}
                    min={0.01}
                    value={cost}
                    onChange={e => setCost(e.target.value)}
                />
            </div>
            <div className="form">
                <label htmlFor="category" className="small">
                    Category
                </label>
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
            <button onClick={editSubscription} className="authBtn small">
                Update
            </button>
        </div>
    );
}
