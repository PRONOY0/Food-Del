import React, { useContext } from "react";
import "./foodDisplay.css";
import { StoreContext } from "../../context/StoreContext";
import FoodItem from "../FoodItem/FoodItem";
import Spinner from "../Spinner/Spinner";

const FoodDisplay = ({ category }) => {
  const { food_list, loader } = useContext(StoreContext);

  return (
    <div className="food-display" id="food-display">
      <h2>Top dishes near you</h2>
      {
        loader ? (<Spinner/>) 
        
        : 
        
        (
          <div className="food-display-list">
        {food_list
          .filter(item => category === "All" || category === item.category)
          .map((item) => (
              <FoodItem
                key={item._id}
                id={item._id}
                price={item.price}
                name={item.name}
                description={item.description}
                image={item.image}
              />
        ))}
      </div>
        )
      }
    </div>
  );
};

export default FoodDisplay;
