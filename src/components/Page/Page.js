import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

import Login from '../Login/Login.js';
import Register from '../Register/Register.js';
import App from '../App/App';

import Header from '../Header/Header.js';
import InfoTooltips from '../InfoTooltip/InfoTooltip';

import '../../Page.css';
import '../../index.css';

const Page = () => {

    const [isLoggedIn, setIsLoggedIn] = React.useState(false);
    const [isInfoToolOpen, setIsInfoToolOpen] = React.useState(false);
    const [success, setSuccess] = React.useState(false);

    const handleLogin = () => {
        setIsLoggedIn(true);
    }

    const handlePopup = () => {
        setIsInfoToolOpen(true);
    }

    const closeAllPopups = () => {
        setIsInfoToolOpen(false);
    }

    const handleSuccess = (x) => {
        setSuccess(x);
    }

    return (
        <div className='Page'>
            <Header />
            <Switch>

                <ProtectedRoute component={App} exact path="/app" loggedIn={isLoggedIn} />

                <Route path="/signup">
                    <Register handleInfoTool={handlePopup} handleSuccess={handleSuccess}/>
                </Route>

                <Route path="/signin">
                    <Login handleLogin={handleLogin} />
                </Route>

                <Route>
                    {isLoggedIn ? <Redirect to="/app" /> : <Redirect to="/signin" />}
                </Route>

            </Switch>

            <InfoTooltips 
            isOpen={isInfoToolOpen}
            onClose={closeAllPopups}   
            success={success}
            />
            
        </div>
    );
}

export default Page;