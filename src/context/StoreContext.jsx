import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { food_list } from "../assets/assets"; // Import food list from assets

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({}); // Cart items state

  // Function to add item to the cart
  const addToCart = (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: prev[itemId] ? prev[itemId] + 1 : 1, // Increment or add new item
    }));
  };

  // Function to remove an item from the cart
  const removeFromCart = (itemId) => {
    setCartItems((prev) => {
      const updatedCart = { ...prev };
      if (updatedCart[itemId] > 1) {
        updatedCart[itemId] -= 1; // Decrement the quantity
      } else {
        delete updatedCart[itemId]; // Remove the item if quantity is 1
      }
      return updatedCart;
    });
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = food_list.find((product) => product._id === item);
        if (itemInfo) {
          totalAmount += itemInfo.price * cartItems[item];
        }
      }
    }
    return totalAmount; 
  };

  // Context value provided to consuming components
  const contextValue = {
    food_list, // List of available food items
    cartItems, // Cart items object (itemId => quantity)
    addToCart, // Function to add items to the cart
    removeFromCart, // Function to remove items from the cart
    getTotalCartAmount
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}{" "}
      {/* Render child components that need access to the cart */}
    </StoreContext.Provider>
  );
};

// PropTypes validation
StoreContextProvider.propTypes = {
  children: PropTypes.node.isRequired, // Ensure children is passed and is a React node
};

export default StoreContextProvider;
