import logo from '../images/logo/logo-mesto.svg';
import { Route, Switch, NavLink } from 'react-router-dom';

function Header() {
  return (
    <header className="header page__header">
      <img className="header__logo" src={logo} alt="Логотип 'Место Раша'" />
      <nav className="navigation">
        <Switch>
          <Route path="/sign-up">
            <NavLink className="navigation__link navigation__link_white" to="/sign-in">Вход</NavLink>           
          </Route>
          <Route path="/sign-in">
          <NavLink className="navigation__link navigation__link_white" to="/sign-up">Регистрация</NavLink>       
          </Route>
          <Route path="/main">
            <p className="navigation__link">Текущий пользователь</p>
            <p className="navigation__link">Выйти</p>      
          </Route>
        </Switch>
      </nav>
      
    </header>
  );
}

export default Header;