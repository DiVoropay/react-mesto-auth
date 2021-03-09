import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';

// поправить стили body

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  } 

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  }
  
  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  }

  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
  }

  return (
    <div className="page">
      <Header />
      <Main
        onEditProfile={handleEditProfileClick}        
        onAddPlace={handleAddPlaceClick}        
        onEditAvatar={handleEditAvatarClick}
      />
      <Footer />

      <PopupWithForm
        name="edit-profile"
        title="Редактировать профиль"
        textBtn="Сохранить"
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}>
        <label className="form__field">
          <input className="form__input popup__edit-name" type="text" name="firstname" placeholder="Имя" minlength="2" maxlength="40" required />
          <span className="form__tip firstname-error"></span>
        </label>
        <label className="form__field">
          <input className="form__input popup__edit-description" type="text" name="about" placeholder="О себе" minlength="2" maxlength="200" required />
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
          <input className="form__input popup__edit-name" type="text" name="place-name" placeholder="Название" minlength="2" maxlength="30" required />
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

      <ImagePopup />
    </div>
  );
}

export default App;
