import logo from '../images/logo/logo-mesto.svg';
import React from 'react';
import { Route, Switch, NavLink } from 'react-router-dom';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Header({ onExitUser }) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <header className="header page__header">
      <img className="header__logo" src={logo} alt="Логотип 'Место Раша'" />
      <nav className="navigation">
        <Switch>
          <Route path="/sign-up">
            <NavLink className="navigation__link navigation__link_white page-hover" to="/sign-in">Вход</NavLink>           
          </Route>
          <Route path="/sign-in">
          <NavLink className="navigation__link navigation__link_white page-hover" to="/sign-up">Регистрация</NavLink>       
          </Route>
          <Route path="/main">
            <p className="navigation__link navigation__link_white">{currentUser.email}</p>
            <button className="navigation__link navigation__link_white navigation__button page-hover" onClick={onExitUser} type="reset">Выйти</button>      
          </Route>
        </Switch>
      </nav>
      
    </header>
  );
}

export default Header;