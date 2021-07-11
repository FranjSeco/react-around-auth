import React from 'react';
import Main from '../Main/Main.js'
import EditProfilePopup from '../EditProfilePopup/EditProfilePopup.js'
import EditAvatarPopup from '../EditAvatarPopup/EditAvatarPopup.js'
import AddPlacePopup from '../AddPlacePopup/AddPlacePopup.js'
import DeleteCardPopup from '../DeleteCardPopup/DeleteCardPopup.js'
import ImagePopup from '../PopUp/ImagePopup.js'
import Footer from '../Footer/Footer.js'

import api from '../../utils/api.js';
import { CurrentUserContext } from '../../contexts/CurrentUserContext.js';




function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isDeleteCardOpen, setIsDeleteCardOpen] = React.useState(false);

  const [isImageOpen, setIsImageOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});

  const [cardToBeDeleted, setCardToBeDeleted] = React.useState('');

  const [cards, setCards] = React.useState([]);

  const [currentUser, setCurrentUser] = React.useState({});


  React.useEffect(() => {
    api.getUserInfo()
      .then(res => {
        setCurrentUser(res);
      })
      .catch((err) => {
        console.log(`${err}`);
      });
  }, [])

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    let handleLike = !isLiked ? api.addLike(card._id) : api.removeLike(card._id);

    handleLike
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch(err => console.log(err));
  }

  React.useEffect(() => {
    api.getInitialCards()
      .then(data => {
        setCards(data);
      })
      .catch((err) => {
        console.log(`${err}`);
      });
  }, [])

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
        let newSetup = cards.filter((item) => item._id !== cardToBeDeleted);
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

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsImageOpen(false);
    setSelectedCard({});
    setIsDeleteCardOpen(false);
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
    <div>
          <CurrentUserContext.Provider value={currentUser}>
            <Main
              onEditAvatar={handleEditAvatarClick}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onCardClick={handleCardClick}
              cards={cards}
              onCardLike={handleCardLike}
              onDeleteCardPopup={handleDeleteCardPopup}
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

            <Footer />
          </CurrentUserContext.Provider>
    </div>

  );
}

export default App;
