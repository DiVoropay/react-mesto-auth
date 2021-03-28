import logo from '../images/logo/logo-mesto.svg';

function Header() {
  return (
    <header className="header page__header">
      <img className="header__logo" src={logo} alt="Логотип 'Место Раша'" />
    </header>
  );
}

export default Header;