import "./ModalWithForm.css";
import close from "../../assets/close.png";

function ModalWithForm({ children, buttonText, title, isOpen, onClose }) {
  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__content">
        <h2 className="modal__title">{title}</h2>
        <button onClick={onClose} type="button" className="modal__close">
          <img src={close} alt="close modal" />
        </button>
        <form className="modal__form">
          {children}
          <button type="submit" className="modal__submit">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;

/*htmlFor should match the ID number */

/*if activeModal is an empty string it'll be falsy so if it equals add-garment then we'll apply the class "modal__opened" */
/*{onClose} is added from App.js to close the button, add the onClick handler is then added to the button */
