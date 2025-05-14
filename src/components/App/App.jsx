import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../footer/footer";
import ItemModal from "../ItemModal/ItemModal";
import { getWeather, filterWeatherData } from "../../utils/weatherAPI";
import { coordinates, APIkey } from "../../utils/constants";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import Profile from "../Profile/Profile";
import AddItemModal from "../AddItemModal/AddItemModal";
import { defaultClothingItems } from "../../utils/constants";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999 },
    city: "",
  });
  //[State variable, setter function]
  //We ONLY ever call a setter function within the same component that it's state is defined in!
  const [clothingItems, setClothingItems] = useState(defaultClothingItems);
  const [activeModal, setActiveModal] = useState(""); //an empty string means(Default) => no modal is active here
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

  /////////////////// -- Adding Item to the Form Mode -- ///////////////////
  const handleAddItemModalSubmit = ({ name, imageUrl, weather }) => {
    const newId = Math.max(...clothingItems.map((item) => item._id)) + 1; //this code is to give each newly added clothing item a unique Key id #
    //Update clothingItems array
    setClothingItems((prevItems) => [
      //we are updating it to all the previous arrays of the clothingItems by using (...)
      { name, link: imageUrl, weather, _id: newId },
      ...prevItems,
    ]);
    //Close the modal
    closeActiveModal();
  };

  ///////////// -- Opening & closing the Card-Modal -- //////////////

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
                  clothingItems={clothingItems}
                />
              }
            />
            <Route
              path="/profile"
              element={<Profile handleCardClick={handleCardClick} />}
            />
          </Routes>
        </div>
        <AddItemModal
          isOpen={activeModal === "add-garment"}
          onClose={closeActiveModal}
          onAddItemModalSubmit={handleAddItemModalSubmit}
        />
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
