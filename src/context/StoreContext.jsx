import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types"; // Import PropTypes
import { food_list } from "../assets/assets";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});

  const addToCart = (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1, // Increment or initialize to 1
    }));
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => {
      const newCartItems = { ...prev };
      if (newCartItems[itemId] > 1) {
        newCartItems[itemId] -= 1;
      } else {
        delete newCartItems[itemId]; // Remove the item if the count is zero
      }
      return newCartItems;
    });
  };

  useEffect(() => {
    console.log("Updated Cart Items: ", cartItems);
  }, [cartItems]);

  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

// Add PropTypes validation
StoreContextProvider.propTypes = {
  children: PropTypes.node.isRequired, // Ensure children is passed and is a React node
};

export default StoreContextProvider;
