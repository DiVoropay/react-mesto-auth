import Header from './Header';
import Main from './Main';
import Footer from './Footer';

// поправить стили body

function App() {
  return (
    <div className="page">
    <Header />
    <Main />
    <Footer />

    <div className="popup popup_edit-profile">
      <form className="form popup__container" name="edit-profile" novalidate>
        <button className="form__reset popup__close page-hover" type="reset"></button>
        <h2 className="form__title popup__title">
          Редактировать профиль
        </h2>
        <label className="form__field">
          <input className="form__input popup__edit-name" type="text" name="firstname" placeholder="Имя" minlength="2" maxlength="40" required />
          <span className="form__tip firstname-error"></span>
        </label>
        <label className="form__field">
          <input className="form__input popup__edit-description" type="text" name="about" placeholder="О себе" minlength="2" maxlength="200" required />
          <span className="form__tip about-error"></span>
        </label>
        <button className="form__button-submit popup__save-button page-hover" type="submit">
          Сохранить
        </button>
      </form>
    </div>

    <div className="popup popup_edit-avatar">
      <form className="form popup__container" name="edit-avatar" novalidate>
        <button className="form__reset popup__close page-hover" type="reset"></button>
        <h2 className="form__title popup__title">
          Обновить аватар
        </h2>
        <label className="form__field">
          <input className="form__input popup__edit-description" type="url" name="link-avatar" placeholder="Ссылка на аватар" required />
          <span className="form__tip link-avatar-error"></span>
        </label>
        <button className="form__button-submit popup__save-button page-hover" type="submit">
          Сохранить
        </button>
      </form>
    </div>

    <div className="popup popup_add-card">
      <form className="form popup__container" name="add-card" novalidate>
        <button className="form__reset popup__close page-hover" type="reset"></button>
        <h2 className="form__title popup__title">
          Новое место
        </h2>
        <label className="form__field">
          <input className="form__input popup__edit-name" type="text" name="place-name" placeholder="Название" minlength="2" maxlength="30" required />
          <span className="form__tip place-name-error"></span>
        </label>
        <label className="form__field">
          <input className="form__input popup__edit-description" type="url" name="link-image" placeholder="Ссылка на картинку" required />
          <span className="form__tip link-image-error"></span>
        </label>
        <button className="form__button-submit popup__save-button page-hover" type="submit">
          Создать
        </button>
      </form>
    </div>

    <div className="popup popup_remove-card">
      <form className="form popup__container" name="remove-card" novalidate>
        <button className="form__reset popup__close page-hover" type="reset"></button>
        <h2 className="form__title popup__title">
          Вы уверены?
        </h2>
        <button className="form__button-submit popup__save-button page-hover" type="submit">
          Да
        </button>
      </form>
    </div>

    <div className="popup popup_viewer">
      <div className="viewer">
        <figure className="viewer__container">
          <button className="popup__close page-hover" type="reset"></button>
          <img className="viewer__image" src="#" alt="#" />
          <figcaption className="viewer__title"></figcaption>
        </figure>
      </div>
    </div>
  </div>
  );
}

export default App;
