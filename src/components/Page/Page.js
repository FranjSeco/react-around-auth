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

    const [isLoggedIn, setIsLoggedIn] = React.useState(false);
    const [isInfoToolOpen, setIsInfoToolOpen] = React.useState(false);
    const [success, setSuccess] = React.useState();

    const [email, setEmail] = React.useState('');
    const history = useHistory();

    const handleLogin = () => {
        setIsLoggedIn(true);
    }

    const handleSignOut = () => {
        localStorage.removeItem('jwt');
        setIsLoggedIn(false);
        history.push('./signin');
        setEmail('');
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

    const handleEmail = (x) => {
        setEmail(x);
    }


    React.useEffect(() => {
        const jwt = localStorage.getItem('jwt');
        if (jwt) {
            auth.getContent(jwt)
                .then(res => {
                    if (res) {
                        const currentEmail = res.data.email;
                        setEmail(currentEmail);
                        setIsLoggedIn(true);
                        history.push('./app');
                    }
                    
                })
                .catch(err => console.log(err))
        }
    }, [])

    return (
        <div className='Page'>
            <Header email={email} isLoggedIn={isLoggedIn} handleSignOut={handleSignOut}/>
            <Switch>

                <ProtectedRoute component={App} exact path="/app" loggedIn={isLoggedIn} />

                <Route path="/signup">
                    <Register handleInfoTool={handlePopup} handleSuccess={handleSuccess}/>
                </Route>

                <Route path="/signin">
                    <Login handleLogin={handleLogin} handleEmail={handleEmail}/>
                </Route>

                <Route>
                    {isLoggedIn ? <Redirect to="/app" /> : <Redirect to="/signup" />}
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