import React from 'react';
import Axios from 'axios';

export default function SearchResult(props) {
    const deleteUser = () => {
        Axios.post(
            process.env.REACT_APP_ADMIN_SERVER,
            {
                query: `mutation DeleteUserByEmail($email: String!) {
                deleteUser(userEmail: $email)
            }`,
                variables: {
                    email: props.info.email,
                },
            },
            { withCredentials: true }
        )
            .then(res => {
                if (res.data.errors) {
                    alert(res.data.errors[0].message);
                    return;
                }
                alert('The user is successfully deleted');
            })
            .catch(err => {
                console.log(err.response.data);
            })
            .finally(() => {
                window.location.reload();
            });
    };

    return (
        <div>
            <div className="searchResult small">
                <ul>
                    <li>{'username: ' + props.info.username}</li>
                    <li>{'email: ' + props.info.email}</li>
                    <li>
                        {'subscriptions: '}
                        <ul>
                            {props.info.subscriptions.map(subscription => (
                                <li>
                                    {subscription.name +
                                        ', $' +
                                        subscription.cost +
                                        ' per ' +
                                        subscription.frequency +
                                        ', ' +
                                        subscription.billingDate +
                                        ', ' +
                                        subscription.category}
                                </li>
                            ))}
                        </ul>
                    </li>
                </ul>
            </div>
            <button onClick={deleteUser} className="authBtn small">
                Delete
            </button>
        </div>
    );
}
