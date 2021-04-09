function Form({ name, title, textBtn, children, onSubmit }) {

  return (
    <div className={``}>
      <form className="form sign" name={name} onSubmit={onSubmit} noValidate>
        <h2 className="form__title">
          {title}
        </h2>
        {children}
        <button className="form__button-submit page-hover" type="submit">
          {textBtn}
        </button>
      </form>
    </div>
  );

}

export default Form;
