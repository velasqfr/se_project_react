import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../footer/footer";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import ItemModal from "../ItemModal/ItemModal";
import { getWeather, filterWeatherData } from "../../utils/weatherAPI";
import { coordinates, APIkey } from "../../utils/constants";
import { defaultClothingItems } from "../../utils/constants";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import Profile from "../Profile/Profile";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999 },
    city: "",
  });
  //[State variable, setter function]
  const [activeModal, setActiveModal] = useState(""); //an empy string means no modal is active
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");

  //If the current temperature is "F" switch it to "C", if it is "C" switch it to "F"
  const handleToggleSwitchChange = () => {
    if (currentTemperatureUnit === "F") {
      setCurrentTemperatureUnit("C");
    } else {
      setCurrentTemperatureUnit("F");
    }
  }; //or you can also do "setCurrentTemperatureUnit(currentTemperatureUnit === "F"? "C":"F");"

  ///////////// -- Opening & closing the Modal -- //////////////
  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };
  ///////////// -- Opening & closing the Modal -- //////////////

  ///////////// -- Clicking the Card to open the Modal -- //////////////
  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };
  ///////////// -- Clicking the Card to open the Modal -- //////////////

  ///////////////API Weather - when the page loads/////////////////////////
  //the way a useEffect works, if you pass a second arguement that is an empty array, it will get run (&one time only) when the component first loads

  useEffect(() => {
    //We are passing the object 'coordinates' as the first firs property, and then structuring the property that is in the object
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);
  }, []);

  return (
    <CurrentTemperatureUnitContext.Provider
      value={{ currentTemperatureUnit, handleToggleSwitchChange }}
    >
      <div className="page">
        <div className="page__content">
          <Header handleAddClick={handleAddClick} weatherData={weatherData} />
          <Routes>
            <Route
              path="/"
              element={
                <Main //added because it the main route of the page
                  weatherData={weatherData}
                  handleCardClick={handleCardClick}
                />
              }
            />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </div>
        <ModalWithForm
          title="New garment"
          buttonText="Add garment"
          isOpen={activeModal === "add-garment"}
          onClose={closeActiveModal}
        >
          <label htmlFor="name" className="modal__label">
            Name{" "}
            <input
              type="text"
              className="modal__input"
              id="name"
              placeholder="Name"
            />
          </label>
          <label htmlFor="imageUrl" className="modal__label">
            Image{" "}
            <input
              type="url"
              className="modal__input"
              id="imageUrl"
              placeholder="Image URL"
            />
          </label>
          <fieldset className="modal__radio-buttons">
            <legend className="modal__legend">Select the weather type</legend>
            <label
              htmlFor="hot"
              className="modal__label modal__label_type_radio"
            >
              <input
                id="hot"
                type="radio"
                name="weather"
                value="hot"
                className="modal__radio-input"
              />
              <span>Hot</span>
            </label>

            <label
              htmlFor="warm"
              className="modal__label modal__label_type_radio"
            >
              <input
                id="warm"
                type="radio"
                name="weather"
                value="warm"
                className="modal__radio-input"
              />
              <span>Warm</span>
            </label>

            <label
              htmlFor="cold"
              className="modal__label modal__label_type_radio"
            >
              <input
                id="cold"
                type="radio"
                name="weather"
                value="cold"
                className="modal__radio-input"
              />
              <span>Cold</span>
            </label>
          </fieldset>
        </ModalWithForm>
        <ItemModal
          activeModal={activeModal}
          card={selectedCard}
          onClose={closeActiveModal}
        />
        <Footer />
      </div>
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;

/*htmlFor: "" SHOULD MATCH THE ID: "" */
