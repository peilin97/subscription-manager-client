import React from 'react';
import Axios from 'axios';
import { useHistory } from 'react-router-dom';

// const URL = 'https://subscription-manager-server.herokuapp.com/admin';
const URL = 'http://localhost:5000/admin';

export default function AdminLogout() {

    const history = useHistory();

    const logout = () => {
        Axios.post(
            URL,
            {query: `mutation  LogOutAdmin {
                logout
            }`,},
            {withCredentials: true}
        ).then((res) => {
            // redirect to the home page
            history.push({
                pathname: '/',
            });
        }).catch(() => {
            history.push({
                pathname: '/',
            });
        })
    }

    return (
    <div>
        <button onClick={logout} className="coverBtn">Log out</button>
    </div>)
}