import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './home/Home';
import CreateSubscription from './Subscription/createSub';
import UpdateSubscription from './Subscription/updateSub';
import Administrator from './admin/administrator';
import AdminSignup from './admin/adminSignup';
import AdminLogin from './admin/adminLogin';
import User from './User/User';
import UserLogin from './User/userLogin';
import UserSignup from './User/userSignup';
import UserEditProfile from './User/UserEditProfile';
import UserChangePassword from './User/UserChangePassword';

export default function App() {
    return (
        <Router>
            <Switch>
                <Route path="/admin/login">
                    <AdminLogin />
                </Route>
                <Route path="/admin/signup">
                    <AdminSignup />
                </Route>
                <Route path="/admin">
                    <Administrator />
                </Route>
                <Route path="/user/login">
                    <UserLogin />
                </Route>
                <Route path="/user/signup">
                    <UserSignup />
                </Route>
                <Route path="/user/edit/password">
                    <UserChangePassword />
                </Route>
                <Route path="/user/edit">
                    <UserEditProfile />
                </Route>
                <Route path="/user">
                    <User />
                </Route>
                <Route path="/subscription/new">
                    <CreateSubscription />
                </Route>
                <Route path="/subscription/update">
                    <UpdateSubscription />
                </Route>
                <Route path="/">
                    <Home />
                </Route>
            </Switch>
        </Router>
    );
}
