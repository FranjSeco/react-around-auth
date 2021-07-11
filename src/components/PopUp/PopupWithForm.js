import React from 'react';

function PopupWithForm(props) {
    return (
        // <div className={`overlay ${(props.isOpen) ? 'overlay_popup' : ''}`} >
        <div className={`overlay ${(props.isOpen) && 'overlay_popup'}`} >
            <div className={`${props.name}-form`}>
                <button className="close-icon" onClick={props.onClose} type="button"> </button>
                <form className={`${props.name}-form__form form`} onSubmit={props.onSubmit} name="Form" noValidate>
                    <h2 className={`${props.name}-form__title`}>
                        {props.title}
                    </h2>
                    {
                        props.children
                    }
                    <button className={`${props.name}-form__btn form-submit`} onClick={props.onClose} type="submit">
                        {props.btn}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default PopupWithForm;