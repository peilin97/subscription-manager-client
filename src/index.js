import React from 'react';
import ReactDOM from 'react-dom';
import Login from './login';
import CreateUser from './createUser';
import Subscription from './subscription';

//import Cover from './cover/cover';
// import Administrator from './admin/administrator';
// import AdminSignup from './admin/adminSignup';
// import AdminLogin from './admin/adminLogin';

import User from './User/User';
import UserLogin from './User/userLogin';
import UserSignup from './User/userSignup';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

ReactDOM.render(
    <Router>
        <div>
            <nav>Welcome to your Subscription Manager</nav>
        </div>

        <Switch>
            {/* <Route path="/admin/login">
                <AdminLogin />
            </Route>
            <Route path="/admin/signup">
                <AdminSignup />
            </Route>
            <Route path="/admin">
                <Administrator />
            </Route>
            <Route path="/cover">
                <Cover /> */}
            {/* </Route> */}
            <Route path="/user/login">
                <UserLogin />
            </Route>
            <Route path="/user/signup">
                <UserSignup />
            </Route>
            <Route path="/user">
                <User />
            </Route>
            <Route path="/subscription/">
                <Subscription />
            </Route>
            <Route path="/create">
                <CreateUser />
            </Route>
            <Route path="/">
                <Login />
            </Route>
        </Switch>
    </Router>,
    document.getElementById('root')
);
