import React from 'react';
import Axios from 'axios';
import { useHistory } from 'react-router-dom';

export default function AdminLogout() {
    const history = useHistory();

    const logout = () => {
        Axios.post(
            process.env.REACT_APP_ADMIN_SERVER,
            {
                query: `mutation  LogOutAdmin {
                logout
            }`,
            },
            { withCredentials: true }
        )
            .then(res => {
                // redirect to the home page
                history.push({
                    pathname: '/',
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
            <button onClick={logout} className="coverBtn">
                Log out
            </button>
        </div>
    );
}
