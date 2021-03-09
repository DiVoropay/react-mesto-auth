function ImagePopup() {
  return (
    <div className="popup popup_viewer">
      <div className="viewer">
        <figure className="viewer__container">
          <button className="popup__close page-hover" type="reset"></button>
          <img className="viewer__image" src="#" alt="#" />
          <figcaption className="viewer__title"></figcaption>
        </figure>
      </div>
    </div>
  );
}

export default ImagePopup;
