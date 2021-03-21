import React from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup({ isOpen, onClose}) {
  const currentUser = React.useContext(CurrentUserContext);

  const [name, setName] = React.useState();
  const [description, setDescription] = React.useState();

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);

  const handleChangeName = (e) => {
    setName(e.target.value);
  }

  const handleChangeDescription = (e) => {
    setDescription(e.target.value);
  }

  return (
    <PopupWithForm
      name="edit-profile"
      title="Редактировать профиль"
      textBtn="Сохранить"
      isOpen={isOpen}
      onClose={onClose}>
        <label className="form__field">
          <input className="form__input popup__edit-name"
            onChange={handleChangeName}
            value={name}
            type="text" name="firstname"
            placeholder="Имя"
            minLength="2"
            maxLength="40"
            required
          />
          <span className="form__tip firstname-error"></span>
        </label>
        <label className="form__field">
          <input className="form__input popup__edit-description"
            onChange={handleChangeDescription}
            value={description}
            type="text"
            name="about"
            placeholder="О себе"
            minLength="2"
            maxLength="200"
            required
          />
          <span className="form__tip about-error"></span>
        </label>
    </PopupWithForm>
  )
}

export default EditProfilePopup;