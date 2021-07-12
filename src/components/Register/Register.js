import React from 'react';
import {useHistory} from 'react-router-dom';
import * as auth from '../../auth';


const Register = () => {
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
        
        if (userEmail && userPassword) {
            auth.register(userEmail, userPassword)
                .then(res => {
                    if (!res || res.statusCode === 400) {
                        throw new Error('Error!');
                    } return res;
                })
                .then(resetForm())
                .then(history.push('/signin'))
                .catch(err => setMessage(err.message))
        } else {
            return setMessage('Something went wrong!');
        }
    }

    // React.useEffect(() => {
    //     if(localStorage.getItem('jwt')) {
    //         history.push('/signin');
    //     }
    // }, [])

    return (
        <div className='register'>
            <h2 className='register__title'>Sign up</h2>
            <form className='register__form' onSubmit={handleSubmit}>
                <input
                    className='register__form-email'
                    placeholder='Email'
                    type='text'
                    name='email'
                    minLength={6}
                    maxLength={400}
                    required
                    value={userEmail}
                    onChange={e => setUserEmail(e.target.value)}>

                </input>
                <input
                    className='register__form-password'
                    placeholder='Password'
                    type='password'
                    name='password'
                    minLength={5}
                    maxLength={10}
                    required
                    value={userPassword}
                    onChange={e => setUserPassword(e.target.value)}>

                </input>
                <button className='register__submit' type='submit'>Sign Up</button>
            </form>
            <p className='register__text'>Already a member? Log in <a href='/signin' className='register__text_link'>here!</a></p>
        </div>
    );
}

export default Register;