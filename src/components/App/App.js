import React from 'react';
import Main from '../Main/Main.js'
import EditProfilePopup from '../EditProfilePopup/EditProfilePopup.js'
import EditAvatarPopup from '../EditAvatarPopup/EditAvatarPopup.js'
import AddPlacePopup from '../AddPlacePopup/AddPlacePopup.js'
import DeleteCardPopup from '../DeleteCardPopup/DeleteCardPopup.js'
import ImagePopup from '../PopUp/ImagePopup.js'


import api from '../../utils/api.js';
import { CurrentUserContext } from '../../contexts/CurrentUserContext.js';

import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

import Login from '../Login/Login.js';
import Register from '../Register/Register.js';

import Header from '../Header/Header.js';
import InfoTooltips from '../InfoTooltip/InfoTooltip';

import '../../Page.css';
import '../../index.css';

import * as auth from '../../utils/auth';


function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isDeleteCardOpen, setIsDeleteCardOpen] = React.useState(false);

  const [isImageOpen, setIsImageOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});

  const [cardToBeDeleted, setCardToBeDeleted] = React.useState({});

  const [cards, setCards] = React.useState([]);

  const [currentUser, setCurrentUser] = React.useState({});

  // REGISTER
  // LOGIN
  // JWT
  // PAGE

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

  // APP

  React.useEffect(() => {
    api.getUserInfo()
      .then(res => {
        setCurrentUser(res);
      })
      .catch((err) => {
        console.log(`${err}`);
      });
  }, [])


  //INITIAL CARDS

  React.useEffect(() => {
    api.getInitialCards()
      .then(data => {
        setCards(data);
      })
      .catch((err) => {
        console.log(`${err}`);
      });
  }, [])

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    const handleLike = !isLiked ? api.addLike(card._id) : api.removeLike(card._id);

    handleLike
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch(err => console.log(err));
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }
  function handleDeleteCardPopup(id) {
    setCardToBeDeleted(id);
    setIsDeleteCardOpen(true);
  }

  function handleDeleteCard() {
    api.removeCard(cardToBeDeleted)
      .then(() => {
        const newSetup = cards.filter((item) => item._id !== cardToBeDeleted);
        setCards(newSetup);
      })
      .catch((err) => {
        console.log(`${err}`);
      });
  }

  function handleCardClick({ name, link }) {
    setSelectedCard({ name, link });
    setIsImageOpen(true);
  }


  // POPUPS

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsImageOpen(false);
    setSelectedCard({});
    setIsDeleteCardOpen(false);
    setIsInfoToolOpen(false);
  }

  function handleUpdateUser(userInfo) {
    api.editProfile({ ...userInfo })
      .then((data) => {
        setCurrentUser({ ...data })
      })
      .catch((err) => {
        console.log(`${err}`);
      });
  }

  function handleUpdateAvatar(avatarInput) {
    api.editAvatar(avatarInput.avatar)
      .then((data) => {
        setCurrentUser({ ...data })
      })
      .catch((err) => {
        console.log(`${err}`);
      });
  }

  function handleAddPlaceSubmit(newPlace) {
    api.addCard({ ...newPlace })
      .then((data) => {

        setCards([data, ...cards]);
      })
      .catch((err) => {
        console.log(`${err}`);
      });
  }

  return (
    <div className='Page'>
      <CurrentUserContext.Provider value={currentUser}>
        <Header email={email} isLoggedIn={isLoggedIn} handleSignOut={handleSignOut} />
        <Switch>

          <ProtectedRoute component={Main}
            onEditAvatar={handleEditAvatarClick}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onCardClick={handleCardClick}
            cards={cards}
            onCardLike={handleCardLike}
            onDeleteCardPopup={handleDeleteCardPopup}
            exact path="/app" loggedIn={isLoggedIn} />

          <Route path="/signup">
            <Register handleInfoTool={handlePopup} handleSuccess={handleSuccess} />
          </Route>

          <Route path="/signin">
            <Login handleLogin={handleLogin} handleEmail={handleEmail} />
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

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit} />

        <DeleteCardPopup
          isOpen={isDeleteCardOpen}
          onClose={closeAllPopups}
          onDeleteCardSubmit={handleDeleteCard}
        />

        <ImagePopup
          isOpen={isImageOpen}
          card={selectedCard}
          onClose={closeAllPopups}
        />

        
      </CurrentUserContext.Provider>

      

    </div>


  );
}

export default App;
