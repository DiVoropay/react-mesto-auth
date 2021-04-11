import React from 'react';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import AddPlacePopup from './AddPlacePopup';
import InfoTooltip from './InfoTooltip';
import api from '../utils/api';
import signApi from '../utils/signApi';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import ProtectedRoute from './ProtectedRoute';
import Register from './Register';
import Login from './Login';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const history = useHistory();

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
    setIsInfoTooltipOpen(false);
    setSelectedCard({});
  }

  const handleUpdateUser = (data) => {
    api.setUserInfo(data)
      .then((data) => {
        const currentUserAdvanced = {...data, email: currentUser.email};
        setCurrentUser(currentUserAdvanced);
        closeAllPopups();
      })
      .catch((err) => { console.log(`Ошибка: ${err}`) });
  }

  const handleUpdateAvatar = (data) => {
    api.setUserAvatar(data)
      .then((data) => {
        const currentUserAdvanced = {...data, email: currentUser.email};
        setCurrentUser(currentUserAdvanced);
        closeAllPopups();
      })
      .catch((err) => { console.log(`Ошибка: ${err}`) });
  }


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

  const [isSuccessful, setIsSuccessful] = React.useState(false);

  const handleRegisterUser = (data) => {
    signApi.register(data)
      .then((data) => {
        console.log(data);
        setIsSuccessful(true);
        setIsInfoTooltipOpen(true);
        history.push('./sign-in');
      })
      .catch((err) => {
        setIsSuccessful(false);
        setIsInfoTooltipOpen(true);
        console.log(`Ошибка: ${err}`)
      });
  }

  const handleLoginUser = (data) => {
    signApi.login(data)
      .then((data) => {
        console.log(data);
        setLoggedIn(true);
        history.push('./main');
        localStorage.setItem('token', data.token);
      })
      .catch((err) => { console.log(`Ошибка: ${err}`) });
  }

  const handleAuthorizationUser = (token) => {
    signApi.authorization(token)
      .then((data) => {
        const currentUserAdvanced = {...currentUser, email: data.data.email};
        setCurrentUser(currentUserAdvanced);
        setLoggedIn(true);
        history.push('./main');
      })
      .catch((err) => { console.log(`Ошибка: ${err}`) });
  }

  const handleExitUser = () => {
    localStorage.removeItem('token');
    setLoggedIn(false);
  }

  React.useEffect(() => {
    handleAuthorizationUser(localStorage.getItem('token'))
    
  }, []);

  React.useEffect(() => {
    api.getPrifile()
      .then((data) => {
        const currentUserAdvanced = {...data, email: currentUser.email};
        setCurrentUser(currentUserAdvanced);
      })
      .catch((err) => { console.log(`Ошибка: ${err}`) });
  }, [loggedIn]);

  React.useEffect(() => {
    api.getInitialCards()
      .then((data) => {
        setCards(data);
      })
      .catch((err) => { console.log(`Ошибка: ${err}`) });
  }, [loggedIn]);

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Header
          onExitUser={handleExitUser}
        />
        <Switch>
          <Route path="/sign-up">
            {loggedIn ? <Redirect to="/main" /> : 
              <Register
                onRegisterUser={handleRegisterUser}           
              />
            }           
          </Route>
          <Route path="/sign-in">
            {loggedIn ? <Redirect to="/main" /> : 
              <Login
                onLoginUser={handleLoginUser}            
              />
            }          
          </Route>
          <ProtectedRoute
            path="/main"
            loggedIn={loggedIn}
            component = {Main}
            
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
            cards={cards}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
          /> 

          <Route exact path="/">
              {loggedIn ? <Redirect to="/main" /> : <Redirect to="/sign-in" />}
          </Route>

        </Switch>

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

        <InfoTooltip
          isOpen={isInfoTooltipOpen}
          onClose={closeAllPopups}
          isSuccessful={isSuccessful}
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
