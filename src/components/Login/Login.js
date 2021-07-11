
const Login = () => {
    return (  
        <div className='login'>
            <h2 className='login__title'>Log in</h2>
            <form className='login__form'>
                <input 
                className='login__form-email' 
                placeholder='Email' 
                type='text' 
                name='email'
                minLength={2}
                maxLength={200}
                required>

                </input>
                <input 
                className='login__form-password' 
                placeholder='Password' 
                type='password' 
                name='password'
                minLength={2}
                maxLength={200}
                required>

                </input>
                <button className='login__submit' type='submit'>Log In</button>
            </form>
            <p className='login__text'>Not a member yet? Log In <a href='/signup' className='login__text_link'>here!</a></p>
        </div>
    );
}

export default Login;