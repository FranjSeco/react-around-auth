import React from 'react';
import PopupWithForm from '../PopUp/PopupWithForm.js'
import { CurrentUserContext } from '../../contexts/CurrentUserContext.js'

function EditProfilePopup(props) {
    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');
    const currentUser = React.useContext(CurrentUserContext);

    // const nameInputRef = React.useRef('');
    // const aboutInputRef = React.useRef('');

    function handleNameChange(e) {
        setName(e.target.value);
    }

    function handleJobChange(e) {
        setDescription(e.target.value);
    }

    function handleSubmit(e) {
        // Prevent the browser from navigating to the form address
        e.preventDefault();
        
        // Pass the values of the managed components to the external handler
        props.onUpdateUser({
            name: name,
            about: description,
        })
    }

    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser]);

    return (
        <PopupWithForm
            onSubmit={handleSubmit}
            name={'profile'}
            title={'Edit Profile'}
            btn={'Save'}
            isOpen={props.isOpen}
            onClose={props.onClose}>
            <input
                // ref={nameInputRef}
                id="name-input"
                className="form-input profile-form__input profile-form__input_name"
                type="text"
                name="Name"
                placeholder='Name'
                minLength={2}
                maxLength={40}
                required
                onChange={handleNameChange}
            />

            <span
                id="name-input-error"
                className="form-input-error" />
            <input
            // ref={aboutInputRef}
                id="about-input"
                className="profile-form__input profile-form__input_about form-input"
                type="text"
                name="About"
                placeholder='Job'
                minLength={2}
                maxLength={200}
                required
                onChange={handleJobChange}
            />

            <span
                id="about-input-error"
                className="form-input-error"
            />

        </PopupWithForm>
    )
}

export default EditProfilePopup;