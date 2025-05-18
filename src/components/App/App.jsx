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
//import { defaultClothingItems } from "../../utils/constants";
import { getItems, addItem, deleteItem } from "../../utils/api";
import DeleteConfirmationModal from "../DeleteConfirmationModal/DeleteConfirmationModal";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999 },
    city: "",
  });
  //[State variable, setter function]
  //We ONLY ever call a setter function within the same component that it's state is defined in!
  const [clothingItems, setClothingItems] = useState([]);
  const [activeModal, setActiveModal] = useState(""); //an empty string means(Default) => no modal is active here
  const [selectedCard, setSelectedCard] = useState(null);
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
    console.log("Add button clicked");
    setActiveModal("add-garment");
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  /////////////////// -- Adding Item to the Form Mode -- ///////////////////
  const handleAddItemModalSubmit = ({ name, imageUrl, weather }) => {
    addItem({ name, link: imageUrl, weather })
      .then((newItem) => {
        setClothingItems((prevItems) => [newItem, ...prevItems]);
        closeActiveModal();
      })
      .catch(console.error);
  };

  ///////////// -- Opening & closing the Card-Modal -- //////////////

  ///////////// -- Clicking the Card to open the Modal -- //////////////
  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  //////////////////--Delete Card item Handler --////////////////////
  const handleDeleteCard = (cardToDelete) => {
    deleteItem(cardToDelete._id)
      .then(() => {
        setClothingItems((prevItems) =>
          prevItems.filter((item) => item._id !== cardToDelete._id)
        );
        //close all modals and reset selected card
        setActiveModal("");
        setSelectedCard(null);
      })
      .catch(console.error);
  };

  /////////////--New Handler for condimration deletion--/////////////
  const openConfirmationModal = (card) => {
    setSelectedCard(card);
    setActiveModal("delete-confirm");
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

  useEffect(() => {
    getItems()
      .then((data) => {
        console.log(data);
        //set the clothing items
        if (Array.isArray(data)) {
          setClothingItems(data);
        }
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
                  handleAddClick={handleAddClick}
                />
              }
            />
            <Route
              path="/profile"
              element={
                <Profile
                  handleCardClick={handleCardClick}
                  clothingItems={clothingItems}
                  handleAddClick={handleAddClick}
                />
              }
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
          onClose={() => setActiveModal("")}
          onDeleteClick={openConfirmationModal}
        />
        <DeleteConfirmationModal
          isOpen={activeModal === "delete-confirm"}
          onClose={() => setActiveModal("preview")} // Cancel, go back to preview modal
          onConfirm={() => handleDeleteCard(selectedCard)} // Delete confirmed
        />
        <Footer />
      </div>
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;

/*htmlFor: "" SHOULD MATCH THE ID: "" */
