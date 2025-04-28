import "./Main.css";
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import { defaultClothingItems } from "../../utils/constants.js";

function Main({ weatherData, handleCardClick }) {
  return (
    <main>
      <WeatherCard />
      <section className="cards">
        <p className="cards__text">
          Today is 75 &deg; F / You may want to wear:
        </p>
        <ul className="cards__list">
          {defaultClothingItems
            // .filter((item) => {
            //     return item.weather === weatherData.type;
            //  })
            .map((item) => {
              return (
                <ItemCard
                  key={item._id}
                  item={item}
                  onCardClick={handleCardClick}
                />
              );
            })}
        </ul>
      </section>
    </main>
  );
}
export default Main;

/* wraping items in curly braces allows you to escape back to JS*/
/*the key always needs to go on the outermost piece of the markup you are renduring 
(if it is a component, it goes in the component) */

/*We are passing 'handleCardClick' from the <main /> component in App.jsx and then we specify the prop in Main.jsx
/*We then need to pas it through the componentwe want it to get to and call it onCardClick (DIFF from onClick) */
