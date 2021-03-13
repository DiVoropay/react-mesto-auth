import React from 'react';
import avatar from '../images/profile/avatar.png';
import api from '../utils/api';
import Card from './Card';

function Main({onEditProfile, onAddPlace, onEditAvatar, onCardClick}) {

  const [userName, setUserName] = React.useState();
  const [userDescription , setUserDescription ] = React.useState();
  const [userAvatar, setUserAvatar] = React.useState();
  const [cards, setCards] = React.useState([]);

  React.useEffect( () => {
    api.getPrifile()
      .then((data) => {
        setUserName(data.name);
        setUserDescription(data.about);
        setUserAvatar(data.avatar);
      })
      .catch((err) => { console.log(`Ошибка: ${err}`) });
    
    api.getInitialCards()
      .then((data) => {
        setCards(data);
      })
      .catch((err) => { console.log(`Ошибка: ${err}`) });

  },[]);

  return (    
    <main className="content">

      <section className="profile content__profile">
        <button className="profile__edit-avatar"  onClick={onEditAvatar} type="button">
          <img className="profile__avatar" src={userAvatar ? userAvatar : avatar}  alt="Фотография профиля"/>
          <div className="profile__edit-icon"></div>
        </button>

        <div className="profile__info">
          <div className="profile__flex-row">
            <h1 className="profile__name">{userName}</h1>
            <button className="profile__edit-button page-hover" onClick={onEditProfile} type="button"></button>
          </div>
          <p className="profile__description">{userDescription}</p>
        </div>
        <button className="profile__add-button page-hover"  onClick={onAddPlace} type="button"></button>
      </section>

      <section className="elements">
        {cards.map((card) =>
            <Card
              key={card._id}
              card={card}
              onCardClick={onCardClick}
            />
          )
        }
      </section>

    </main>
  );
}

export default Main;
