import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
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

  React.useEffect( () => {
    api.getPrifile()
      .then((data) => {
        setCurrentUser(data);
      })
      .catch((err) => { console.log(`Ошибка: ${err}`) });
  },[]);


  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>        
        <Header />
        <Main
          onEditProfile={handleEditProfileClick}        
          onAddPlace={handleAddPlaceClick}        
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
        />
        <Footer />

        <PopupWithForm
          name="edit-profile"
          title="Редактировать профиль"
          textBtn="Сохранить"
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}>
            <label className="form__field">
              <input className="form__input popup__edit-name" type="text" name="firstname" placeholder="Имя" minLength="2" maxLength="40" required />
              <span className="form__tip firstname-error"></span>
            </label>
            <label className="form__field">
              <input className="form__input popup__edit-description" type="text" name="about" placeholder="О себе" minLength="2" maxLength="200" required />
              <span className="form__tip about-error"></span>
            </label>
        </PopupWithForm>

        <PopupWithForm
          name="edit-avatar"
          title="Обновить аватар"
          textBtn="Сохранить"
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}>
            <label className="form__field">
              <input className="form__input popup__edit-description" type="url" name="link-avatar" placeholder="Ссылка на аватар" required />
              <span className="form__tip link-avatar-error"></span>
            </label>
        </PopupWithForm>

        <PopupWithForm
          name="add-card"
          title="Новое место"
          textBtn="Создать"
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}>
            <label className="form__field">
              <input className="form__input popup__edit-name" type="text" name="place-name" placeholder="Название" minLength="2" maxLength="30" required />
              <span className="form__tip place-name-error"></span>
            </label>
            <label className="form__field">
              <input className="form__input popup__edit-description" type="url" name="link-image" placeholder="Ссылка на картинку" required />
              <span className="form__tip link-image-error"></span>
            </label>
        </PopupWithForm>

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
