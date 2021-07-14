import React from 'react';
import { useLocation } from 'react-router-dom';
import '../../blocks/header/header.css'


function Header({ email, isLoggedIn, handleSignOut }) {
    const location = useLocation();
    // const [bg, setBg] = React.useState(`url('./burger.svg')`)
    const [isDisplayed, setIsDisplayed] = React.useState('none')
    const [open, setOpen] = React.useState('open');

    const [getWidth, setGetWidth] = React.useState(window.innerWidth);

    const updateDimensions = () => {
        setGetWidth(window.innerWidth);
    }

    React.useEffect(() => {
        window.addEventListener("resize", updateDimensions);
        return () => window.removeEventListener("resize", updateDimensions);
    }, [getWidth])

    console.log(getWidth)

    const handleLoginButton = () => {
        if (isLoggedIn) {
            return <button onClick={handleSignOut} className='header__signout'>Sign Out</button>
        } else if (!isLoggedIn && location.pathname === '/signin') {
            return <a href='./signup' className='header__link'>Sign up</a>
        } else {
            return <a href='./signin' className='header__link'>Sign in</a>
        }
    }

    const handleBurger = () => {
        setIsDisplayed(isDisplayed === 'none' ? 'flex' : 'none');
        setOpen(open === 'open' ? 'close' : 'open')
        // setBg(bg === `url('./burger.svg')` ? `url('./CloseIcon.svg')` : `url('./burger.svg')`)
    }


    return (
        <header className="header">
            <div className="header__logo" />
            <div className='header__login'
                style={
                    isLoggedIn
                        ?
                        {
                            display: `${isDisplayed}`,
                            width: '320px',
                            flexDirection: 'column',
                            position: 'relative',
                            alignContent: 'center',
                            justifyContent: 'center',
                            textAlign: 'center',
                            top: '0',
                            right: '0',
                            borderBottom: '1px solid rgba(84, 84, 84, 0.7)'
                        }
                        :
                        {}}
            >

                {isLoggedIn ? <p className='header__email' >
                    {email}
                </p> : ''}
                {handleLoginButton()}
            </div>

            {/* <button className='header__burger' style={{backgroundImage: `${bg}`}}  onClick={handleBurger}>
            </button> */}

            {isLoggedIn
                &&
                <button className='header__burger' onClick={handleBurger}>
                    <span className={`header__burger_${open}`}></span>
                    <span className={`header__burger_${open}`}></span>
                    <span className={`header__burger_${open}`}></span>
                </button>
            }
        </header>

    )
}


export default Header;