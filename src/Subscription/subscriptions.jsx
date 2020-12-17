import React from 'react';
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
// const URL = 'http://localhost:5000/user';

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
            process.env.REACT_APP_USER_SERVER,
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
    <div className="subscriptions">
        {list && list.map(item => (
            <div id={item.id} className="subItem">
                <div className="small">{item.name}</div>
                <div className="small">{"$ " + item.cost}</div>
                <div className="small">{item.billingDate}</div>
                <div className="hide small">{item.frequency}</div>
                <div className="hide small">{item.category}</div>
                <div className="hide small">{item.content}</div>
                <button><FontAwesomeIcon
                className = "fontAwesomeIcon small"
                icon={faEdit}
                onClick={() => editItem(item)}
                /></button>
                <button><FontAwesomeIcon
                    className = "fontAwesomeIcon small"
                    icon={faTrashAlt}
                    onClick={() => deleteItem(item.id)}
                /></button>
                
            </div>
        ))}
    </div>
    )
}