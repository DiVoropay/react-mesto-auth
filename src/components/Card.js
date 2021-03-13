function Card({card, onCardClick}) {
  const name = card.name;
  const link = card.link;
  const numberOfLikes = card.likes.length;
  const authorsOfLikes = card.likes.reduce((list, item) => { return list + item.name + '\n' }, '');

  return (
    <article className="element">
      <img className="element__image" src={link} alt={name} onClick={ () => {onCardClick(card)} }/>
      <div className="element__description">
        <h2 className="element__title" title={name}>
        {name}
        </h2>
        <div className="element__like-block">
          <button className="element__like page-hover" type="button"></button>
          <p className="element__like-count" title={authorsOfLikes}>
            {numberOfLikes}
          </p>
        </div>
      </div>
      <button className="element__trash page-hover" type="button"></button>
    </article>
  );  
}

export default Card;
