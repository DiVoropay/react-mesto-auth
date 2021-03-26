import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import AddPlacePopup from './AddPlacePopup';
import api from '../utils/api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [currentUser, setCurrentUser] = React.useState({});

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  } 

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  }
  
  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  }

  const handleCardClick = (card) => {
    setSelectedCard(card);
  }

  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard({});
  }

  const handleUpdateUser = (data) => {
    api.setUserInfo(data)
    .then((data) => {
      setCurrentUser(data);
      closeAllPopups();
    })
    .catch((err) => { console.log(`Ошибка: ${err}`) });
  }

  const handleUpdateAvatar = (data) => {
    api.setUserAvatar(data)
    .then((data) => {
      setCurrentUser(data);
      closeAllPopups();
    })
    .catch((err) => { console.log(`Ошибка: ${err}`) });
  }

  React.useEffect( () => {
    api.getPrifile()
      .then((data) => {
        setCurrentUser(data);
      })
      .catch((err) => { console.log(`Ошибка: ${err}`) });
  },[]);

  const [cards, setCards] = React.useState([]);

  React.useEffect( () => {    
    api.getInitialCards()
      .then((data) => {
        setCards(data);
      })
      .catch((err) => { console.log(`Ошибка: ${err}`) });

  },[]);

  function handleCardLike(card, isLiked) {    
    api.changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((cards) => cards.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((err) => { console.log(`Ошибка: ${err}`) });
  }

  function handleCardDelete(card) {
    api.removeCard(card._id)
      .then(() => {
        setCards((cards) => cards.filter((c) => c._id !== card._id));
      })
      .catch((err) => { console.log(`Ошибка: ${err}`) });
  }

  function handleAddPlaceSubmit(card) {
    api.addCard(card)
      .then((newCard) => {        
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => { console.log(`Ошибка: ${err}`) });
  }


  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>        
        <Header />
        <Main
          onEditProfile={handleEditProfileClick}        
          onAddPlace={handleAddPlaceClick}        
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
          cards={cards}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
        />
        <Footer />

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
          onAddPlace={handleAddPlaceSubmit}
        />

        <PopupWithForm name="remove-card" title="Вы уверены?" textBtn="Да">
          <label className="form__field">
            <input className="form__input popup__edit-description" type="url" name="link-avatar" placeholder="Ссылка на аватар" required />
            <span className="form__tip link-avatar-error"></span>
          </label>
        </PopupWithForm> 

        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}    
        />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
