import React from 'react';
import Axios from 'axios';

// const URL = 'https://subscription-manager-server.herokuapp.com/admin';
const URL = 'http://localhost:5000/admin';

export default function SearchResult(props) {

    const deleteUser = () => {
        Axios.post(
            URL,
            {query: `mutation DeleteUserByEmail($email: String!) {
                deleteUser(userEmail: $email)
            }`,
            variables: {
                email: props.info.email,
            }},
            {withCredentials: true}
            ).then(res => {
                if (res.data.errors) {
                    alert(res.data.errors[0].message);
                    return;
                }
                alert("The user is successfully deleted")
            }).catch(err => {
                console.log(err.response.data);
            }).finally(() => {
                window.location.reload();
            });
    }

    return (
    <div>
        <ul>
            <li>{"username: " + props.info.username}</li>
            <li>{"email: " + props.info.email}</li>
            <li>
                {"subscriptions: "}
                <ul>
                    {props.info.subscriptions.map(subscription => (
                        <li>{subscription.name+", $"+subscription.cost+" per "+subscription.frequency+", next billing date: "+subscription.billingDate +", "+subscription.category}</li>
                    ))}
                </ul>
            </li>
        </ul>
        <button onClick={deleteUser}>Delete</button>
    </div>
    );
}