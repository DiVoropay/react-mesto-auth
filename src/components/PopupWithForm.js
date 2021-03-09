function PopupWithForm(props) {
  const name = props.name;
  const title = props.title;
  const textBtn = props.textBtn;
  const children = props.children;
  const isOpen = props.isOpen;
  const onClose = props.onClose;
  
  return (
      <div className={`popup popup_${name}` + (isOpen ? " popup_opened" : "")}>
      <form className="form popup__container" name={name} novalidate>
        <button className="form__reset popup__close page-hover" onClick={onClose} type="reset"></button>
        <h2 className="form__title popup__title">
          {title}
        </h2>
        {children}
        <button className="form__button-submit popup__save-button page-hover" type="submit">
          {textBtn}
        </button>
      </form>
    </div>
  );
}

export default PopupWithForm;
