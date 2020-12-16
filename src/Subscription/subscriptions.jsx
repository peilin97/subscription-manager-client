import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import {
    selectSubscriptions,
    setSubscriptions,
} from '../User/userSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faEdit } from '@fortawesome/free-solid-svg-icons';
import './subscriptions.css';

// const URL = 'https://subscription-manager-server.herokuapp.com/user';
const URL = 'http://localhost:5000/user';

// show all subscriptions sorted by billingdate
export default function Subscriptions() {
    const history = useHistory();
    const list = useSelector(selectSubscriptions);
    const dispatch = useDispatch();

    const editItem = (item) => {
        history.push({
            pathname:'/subscription/update',
            state: {
                sub: item,
            }
        });
    };

    const deleteItem = (id) => {
        Axios.post(
            URL,
            {
                query: `mutation deleteSubscription($id: String!) {
                    deleteSubscriptionToUser(id: $id) {
                        subscriptions {id, name, billingDate, frequency, cost, category}
                    }
                }`,
                variables: {
                    id: id,
                },
            },
            { withCredentials: true }
        ).then(res => {
            console.log(res.data);
            if (res.data.errors) {
                console.log(res.data.errors);
                return;
            }
            let list = res.data.data.deleteSubscriptionToUser.subscriptions;
            list.sort((a, b) => new Date(a.billingDate) - new Date(b.billingDate));
            dispatch(setSubscriptions(list));
        })
        .catch(err => {
            console.log(err.response);
        });
    }

    return (
    <div>
        {list && list.map(item => (
            <div id={item.id} className="subItem">
                <div>{item.name}</div>
                <div>{item.cost}</div>
                <div>{item.billingDate}</div>
                <div>{item.frequency}</div>
                <div>{item.category}</div>
                <div>{item.content}</div>
                <FontAwesomeIcon
                className = "fontAwesomeIcon"
                icon={faEdit}
                onClick={() => editItem(item)}
                />
                <FontAwesomeIcon
                    className = "fontAwesomeIcon"
                    icon={faTrashAlt}
                    onClick={() => deleteItem(item.id)}
                />
            </div>
        ))}
    </div>
    )
}