import "./AddItemModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useState } from "react";

export default function AddItemModal({
  onClose,
  isOpen,
  onAddItemModalSubmit,
}) {
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [weather, setWeather] = useState("");

  //created a function for the onChange handler for name and link
  //e.target represents the element in which the event occured on
  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleImageUrlChange = (e) => {
    setImageUrl(e.target.value);
  };

  const handleWeatherChange = (e) => {
    setWeather(e.target.value);
  };

  //Submit handler that will run when we submit the modal
  //We are going to need to pass this in modalWithForm & use this as an event handler on the form when we submit the form in the modal
  const handleSubmit = (e) => {
    e.preventDefault(); //prevents the page from refreshing
    //Update clothingItems array
    onAddItemModalSubmit({ name, imageUrl, weather });
    //Empty the inputs (resettig the form of the modal)
    //to empty the inputs all we have to do is set the state variables to empty strings(default vairable)
    setName("");
    setImageUrl("");
    setWeather("");
  };

  return (
    <ModalWithForm
      title="New garment"
      buttonText="Add garment"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit} //Passed as a prop - when you pass functions as a prop, if the function is used either directly as an event handler or within some event handler, it's common practice to remain the function starting with "on"
    >
      <label htmlFor="name" className="modal__label">
        Name{" "}
        <input
          type="text"
          name="name"
          className="modal__input"
          id="name"
          placeholder="Name"
          required
          minLength="1"
          maxLength="30"
          onChange={handleNameChange} //We are putting an onChange event handler which triggers every time the text changes so it can be updated with its input
          value={name}
          //Controlled inputs are a two way street:
          //Value is applied to the State so the State can change the text in the name input (can vewed in Components in devTools)
        />
      </label>
      <label htmlFor="imageUrl" className="modal__label">
        Image{" "}
        <input
          type="url"
          name="link"
          className="modal__input"
          id="imageUrl"
          placeholder="Image URL"
          required
          onChange={handleImageUrlChange}
          value={imageUrl}
        />
      </label>
      <fieldset className="modal__radio-buttons">
        <legend className="modal__legend">Select the weather type</legend>
        <label htmlFor="hot" className="modal__label modal__label_type_radio">
          <input
            className="modal__radio-input"
            id="hot"
            type="radio"
            name="weather"
            value="hot"
            onChange={handleWeatherChange}
            checked={weather === "hot"}
          />
          <span>Hot</span>
        </label>

        <label htmlFor="warm" className="modal__label modal__label_type_radio">
          <input
            className="modal__radio-input"
            id="warm"
            type="radio"
            name="weather"
            value="warm"
            onChange={handleWeatherChange}
            checked={weather === "warm"}
          />
          <span>Warm</span>
        </label>

        <label htmlFor="cold" className="modal__label modal__label_type_radio">
          <input
            className="modal__radio-input"
            id="cold"
            type="radio"
            name="weather"
            value="cold"
            onChange={handleWeatherChange}
            checked={weather === "cold"}
          />
          <span>Cold</span>
        </label>
      </fieldset>
    </ModalWithForm>
  );
}
