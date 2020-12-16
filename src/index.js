import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import store from './store';
import { Provider } from 'react-redux';
import App from './app';
import CreateSubscription from './Subscription/createSub';
import UpdateSubscription from './Subscription/updateSub';
import Cover from './cover/cover';
import Administrator from './admin/administrator';
import AdminSignup from './admin/adminSignup';
import AdminLogin from './admin/adminLogin';
import User from './User/User';
import UserLogin from './User/userLogin';
import UserSignup from './User/userSignup';
import UserEditProfile from './User/UserEditProfile';
import UserChangePassword from './User/UserChangePassword';

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <Router>
                <div>
                    <nav>Welcome to your Subscription Manager</nav>
                </div>
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
                    <Route path="/cover">
                        <Cover />
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
                        <App />
                    </Route>
                </Switch>
            </Router>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);
