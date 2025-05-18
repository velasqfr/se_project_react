import "./ItemModal.css";
import close from "../../assets/close.png";

function ItemModal({ activeModal, onClose, card, onDeleteClick }) {
  if (!card) return null;
  return (
    <div className={`modal ${activeModal === "preview" && "modal_opened"}`}>
      <div className="modal__content modal__content_type_image">
        <button onClick={onClose} type="button" className="modal__close">
          <img src={close} alt="close modal" />
        </button>
        <img src={card.link} alt={card.name} className="modal__image" />
        <div className="modal__footer">
          <h2 className="modal__caption">{card.name}</h2>
          <p className="modal__weather">Weather: {card.weather} </p>
        </div>
        <button
          type="button"
          className="item__delete-btn"
          onClick={() => onDeleteClick(card)} //opens confirmation modal instead of immediate delete
        >
          Delete Item
        </button>
      </div>
    </div>
  );
}
export default ItemModal;

/*if activeModal equals "preview" then we'll apply the class "modal_opened" */
/* it is card.link because of what it is being called 'card' */
