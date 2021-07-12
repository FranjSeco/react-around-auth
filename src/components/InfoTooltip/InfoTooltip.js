import React from 'react';

import PopupWithForm from '../PopUp/PopupWithForm.js'



function InfoTooltips(props) {
    const [success, setSuccess] = React.useState(false);
    return (
        <PopupWithForm
            isOpen={props.isOpen}
            onClose={props.onClose}
            >            
            {success ?
            <> <div className='popup__image popup__image_ok'><img/></div>
            <p className='popup__text'>Success! You have now been registered.</p>
            </> 
            :
            <> <div className='popup__image popup__image_notok'><img className='pop'/></div>
            <p className='popup__text'>Oops, something went wrong! Please try again.</p>
            </>}
            
        </PopupWithForm>
    )
}

export default InfoTooltips;