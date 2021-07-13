import React from 'react';

import PopupWithForm from '../PopUp/PopupWithForm.js'



function InfoTooltips(props) {
    return (
        
        <PopupWithForm
            isOpen={props.isOpen}
            onClose={props.onClose}
            >
            {props.success ?
            <> 
            <div className='popup__image popup__image_ok'></div>
            <p className='popup__text'>Success! You have now been registered.</p>
            </> 
            :
            <> 
            <div className='popup__image popup__image_notok'></div>
            <p className='popup__text'>Oops, something went wrong! Please try again.</p>
            </>
            }
        </PopupWithForm>
    )
}

export default InfoTooltips;