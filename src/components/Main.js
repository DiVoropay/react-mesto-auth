import avatar from '../images/profile/avatar.png';

function Main(props) {
  const onEditProfile = props.onEditProfile;
  const onAddPlace = props.onAddPlace;
  const onEditAvatar = props.onEditAvatar;


  return (    
    <main className="content">

      <section className="profile content__profile">
        <button className="profile__edit-avatar"  onClick={onEditAvatar} type="button">
          <img className="profile__avatar" src={avatar}  alt="Фотография профиля"/>
          <div className="profile__edit-icon"></div>
        </button>


        <div className="profile__info">
          <div className="profile__flex-row">
            <h1 className="profile__name"></h1>
            <button className="profile__edit-button page-hover" onClick={onEditProfile} type="button"></button>
          </div>
          <p className="profile__description"></p>
        </div>
        <button className="profile__add-button page-hover"  onClick={onAddPlace} type="button"></button>
      </section>

      <section className="elements">

      </section>

    </main>

  );
}

export default Main;
