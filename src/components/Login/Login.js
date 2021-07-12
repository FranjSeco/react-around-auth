import React from 'react';
import { useHistory } from 'react-router-dom';
import * as auth from '../../auth';

const Login = ({handleLogin}) => {
    const [userPassword, setUserPassword] = React.useState('');
    const [userEmail, setUserEmail] = React.useState('');
    const [message, setMessage] = React.useState('');

    const history = useHistory();

    const resetForm = () => {
        setUserPassword('');
        setUserEmail('');
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!userEmail || !userPassword) {
            return;
        }
        auth.authorize(userEmail, userPassword)
        
            .then((data) => {
                if (!data) {
                    throw new Error('Error!')
                }
                if (data.token) {
                    handleLogin();
                }
            })
            .then(resetForm)
            .then(() => history.push('/app'))
            .catch(err => setMessage(err.message))
    }

    // React.useEffect(() => {
    //     if(localStorage.getItem('jwt')) {
    //         history.push('/app');
    //     }
    // }, [])

    return (
        <div className='login'>
            <h2 className='login__title'>Log in</h2>
            <form onSubmit={handleSubmit} className='login__form'>
                <input
                    className='login__form-email'
                    placeholder='Email'
                    type='text'
                    name='email'
                    minLength={2}
                    maxLength={200}
                    required
                    value={userEmail}
                    onChange={e => setUserEmail(e.target.value)}
                >

                </input>
                <input
                    className='login__form-password'
                    placeholder='Password'
                    type='password'
                    name='password'
                    minLength={2}
                    maxLength={200}
                    required
                    value={userPassword}
                    onChange={e => setUserPassword(e.target.value)}>

                </input>
                <button className='login__submit' type='submit'>Log In</button>
            </form>
            <p className='login__text'>Not a member yet? Log In <a href='/signup' className='login__text_link'>here!</a></p>
        </div>
    );
}

export default Login;