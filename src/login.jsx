import React from 'react';
import Axios from 'axios';
import { Link, Redirect } from 'react-router-dom';

export default class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
        };
    }

    onChange(key, event) {
        this.setState({
            [key]: event.target.value,
        });
    }

    onClick() {
        Axios.post(
            'https://subscription-manager-server.herokuapp.com/user',
            this.state,
            { withCredentials: true }
        )
            .then(response => {
                this.setState({
                    redirect: '/subscription/',
                });
            })
            .catch(function (error) {
                // handle error
                console.error(error);
            });
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />;
        }

        return (
            <>
                <h1>Login</h1>

                <div>
                    <label htmlFor="username">Username:</label>
                    <input
                        id="username"
                        value={this.state.username}
                        onChange={e => this.onChange('username', e)}
                    />
                </div>

                <div>
                    <label htmlFor="password">Password:</label>
                    <input
                        id="password"
                        type="password"
                        value={this.state.password}
                        onChange={a => this.onChange('password', a)}
                    />
                </div>

                <button onClick={() => this.onClick()}>Create User</button>

                <div>
                    <Link to="/create">Click to create new user</Link>
                </div>

                <div>
                    <Link to="/anonymous">
                        Click to to be an anonymous user
                    </Link>
                </div>
            </>
        );
    }
}
