import "./ItemCard.css";

function ItemCard({ item, onCardClick }) {
  const handleCardClick = () => {
    onCardClick(item);
  };

  return (
    <li className="card">
      <h2 className="card__name">{item.name}</h2>
      <img
        onClick={handleCardClick}
        className="card__image"
        src={item.imageUrl}
        alt={item.imageUrl}
      />
    </li>
  );
}

export default ItemCard;

/* we destructure "onCardClick" inside ItemCard from Main.jsx" */
