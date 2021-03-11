function ImagePopup(props) {
  const name = props.card.name;
  const link = props.card.link;
  const onClose = props.onClose;
  const isOpen = link ? true : false;

  return (
    <div className={"popup popup_viewer" + (isOpen ? " popup_opened" : "")}>
      <div className="viewer">
        <figure className="viewer__container">
          <button className="popup__close page-hover" onClick={onClose} type="reset"></button>
          <img className="viewer__image" src={link} alt={name}/>
          <figcaption className="viewer__title">{name}</figcaption>
        </figure>
      </div>
    </div>
  );
}

export default ImagePopup;
