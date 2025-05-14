import { defaultClothingItems } from "../../utils/constants";
import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";

function ClothesSection({ handleCardClick, handleAddClick }) {
  return (
    <div className="clothes-section">
      <div className="clothes-section__header">
        <p className="clothes-section__text">Your Items</p>
        <button
          onClick={handleAddClick}
          className="add__clothes-btn"
          type="button"
        >
          + Add New
        </button>
      </div>
      <ul className="cards__list">
        {defaultClothingItems.map((item) => {
          return (
            <ItemCard
              key={item._id}
              item={item}
              onCardClick={handleCardClick} //Pass as prop
            />
          );
        })}
      </ul>
    </div>
  );
}

export default ClothesSection;
