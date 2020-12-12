import React from 'react';
import Axios from 'axios';
import { Link, Redirect } from 'react-router-dom';


export default class CreateUser extends React.Component {


    constructor(props) {
        super(props);

        this.state = {
            email: '', 
            username: '', 
            password: '',
            duplicatePassword: '',
            createdOn: Date, 
            subscriptionId: '',
            redirect: '',
        }

    }

    onChange(key, event) {
        this.setState(
            {
                [key]: event.target.value,
            }
        )
    }

    onClick() {
        if (this.state.password !== this.state.duplicatePassword) {
            // ADD ERROR MESSAGE HERE
            console.log("ERROR WITH PASSWORD")
            return 
        }

        Axios.post('http://localhost:3000/graphql', this.state)
            .then((response) => {
                this.setState({
                    redirect: '/subscription/'
                })
            })
            .catch((error) => {
                // handle error
                console.error(error);
            })

    }

    render() {
        if(this.state.redirect) {

            return (<Redirect to={this.state.redirect} />)

        }

        return (<>
        <h1>Create New User</h1>

        <div>
            <label for="email">Email:</label>
            <input id="email" value={this.state.email}
            onChange={(e) => this.onChange('email', e)} />
        </div>

        <div>
            <label for="username">Username:</label>
            <input id="username" value={this.state.username}
            onChange={(e) => this.onChange('username', e)} />
        </div>

        <div>
            <label for="password">Password:</label>
            <input id="password" type="password" value={this.state.password}
            onChange={(a) => this.onChange('password', a)} />
        </div>

        <div>
            <label for="duplicatePassword">Confirm Password:</label>
            <input id="duplicatePassword" type="password" 
            value={this.state.duplicatePassword}
            onChange={(e) => this.onChange('duplicatePassword', e)} />
        </div>

        <button onClick={() => this.onClick()}>Create User</button>


        <div>
            <Link to="/">Login</Link>
        </div>

        </>)


    }

}