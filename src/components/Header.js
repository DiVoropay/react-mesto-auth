import logo from '../images/logo/logo-mesto.svg';
import { Route, Switch } from 'react-router-dom';

function Header() {
  return (
    <header className="header page__header">
      <img className="header__logo" src={logo} alt="Логотип 'Место Раша'" />
      <div className="navigation">
        <Switch>
          <Route path="/sign-up">
            <p className="navigation__link">Вход</p>           
          </Route>
          <Route path="/sign-in">
            <p className="navigation__link">Регистрация</p>        
          </Route>
          <Route path="/main">
            <p className="navigation__link">Текущий пользователь</p>
            <p className="navigation__link">Выйти</p>      
          </Route>
        </Switch>
      </div>
      
    </header>
  );
}

export default Header;