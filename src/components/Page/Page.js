import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

import Login from '../Login/Login.js';
import Register from '../Register/Register.js';
import App from '../App/App'

import Header from '../Header/Header.js'

import '../../Page.css';
import '../../index.css';

const Page = () => {
    
    const [isLoggedIn, setIsLoggedIn] = React.useState(false);

    return (
        <div className='Page'>
            <Header />
            <Switch>

                <Route path="/signup">
                    <Register />
                </Route>

                <Route path="/signin">
                    <Login />
                </Route>

                {isLoggedIn ? <Redirect to="/" /> : <Redirect to="/signin" />}

            </Switch>
            
            <ProtectedRoute component={App} exact path="/" loggedIn={isLoggedIn} />
        </div>
    );
}

export default Page;