import { useLocation } from 'react-router-dom';
import '../../blocks/header/header.css'


function Header({email, isLoggedIn, handleSignOut}) {
    const location = useLocation();

    const handleLoginButton = () => {
        if (isLoggedIn) {
            return <button onClick={handleSignOut} className='header__signout'>Sign Out</button>
        } else if (!isLoggedIn && location.pathname === '/signin') {
            return <a href='./signup' className='header__link'>Sign up</a>
        } else {
            return <a href='./signin' className='header__link'>Sign in</a>
        }
    }

    return (
            <header className="header">
                <div className="header__logo" />
                <div className='header__login'>
                { isLoggedIn ? <p className='header__email'> {email} </p> : '' }
                {handleLoginButton()}
                </div>
            </header>
        
    )
}


export default Header;