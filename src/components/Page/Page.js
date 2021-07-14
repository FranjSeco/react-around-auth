import React from 'react';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

import Login from '../Login/Login.js';
import Register from '../Register/Register.js';
import App from '../App/App';

import Header from '../Header/Header.js';
import InfoTooltips from '../InfoTooltip/InfoTooltip';

import '../../Page.css';
import '../../index.css';

import * as auth from '../../utils/auth';

const Page = () => {

    const [isLoggedIn, setIsLoggedIn] = React.useState(true);
    const [isInfoToolOpen, setIsInfoToolOpen] = React.useState(false);
    const [success, setSuccess] = React.useState(false);

    const [email, setEmail] = React.useState('');
    const history = useHistory();

    const handleLogin = () => {
        setIsLoggedIn(true);
    }

    const handleSignOut = () => {
        localStorage.removeItem('jwt');
        setIsLoggedIn(false);
        history.push('./signin');
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

    React.useEffect(() => {
        const jwt = localStorage.getItem('jwt');
        if (jwt) {
            auth.getContent(jwt)
                .then(res => {
                    if (res) {
                        setEmail(res.data.email);
                    }
                    
                })
                .catch(err => console.log(err))
        }
    }, [history])

    return (
        <div className='Page'>
            <Header email={email} isLoggedIn={isLoggedIn} handleSignOut={handleSignOut}/>
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