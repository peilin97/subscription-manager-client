import React from 'react';
import ReactDOM from 'react-dom';
import Login from './login';
import CreateUser from './createUser';
import AnonymousUser from './anonymousUser';
import Subscription from './subscription';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

ReactDOM.render(
    <Router>
        <div>
            <nav>Welcome to your Subscription Manager</nav>
        </div>

        <Switch>
            <Route path="/subscription/">
                <Subscription />
            </Route>
            <Route path="/create">
                <CreateUser />
            </Route>
            <Route path="/anonymous">
                <AnonymousUser />
            </Route>
            <Route path="/">
                <Login />
            </Route>
        </Switch>
    </Router>,
    document.getElementById('root')
);
