import React from 'react';
import Axios from 'axios';
import { useHistory } from 'react-router-dom';

const URL = 'https://subscription-manager-server.herokuapp.com/user';
// const URL = 'http://localhost:5000/user';

export default function UserLogout() {
    const history = useHistory();

    const logout = () => {
        Axios.post(
            URL,
            {
                query: `mutation  LogOutUser {
                logout
            }`,
            },
            { withCredentials: true }
        )
            .then(res => {
                // redirect to the home page
                history.push({
                    pathname: '/',
                    state: {
                        original: res.data.original,
                    },
                });
            })
            .catch(() => {
                history.push({
                    pathname: '/',
                });
            });
    };

    return (
        <div>
            <button onClick={logout}>Log out</button>
        </div>
    );
}
