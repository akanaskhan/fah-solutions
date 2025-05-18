import { createContext, useEffect, useState, useContext } from "react";
import { db } from "../utils/firebase"; // import Firestore
import { doc, setDoc } from "firebase/firestore";
import { AuthContext } from "./AuthContext"; // assuming you have AuthContext to get user information
import { useNavigate } from "react-router-dom";

export const CartContext = createContext();

export default function CartContextProvider({ children }) {
  const { user } = useContext(AuthContext); 
  const [cartItems, setCartItems] = useState([]);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    const itemsFromStorage = localStorage.getItem("cartItems");
    if (itemsFromStorage) {
      setCartItems(JSON.parse(itemsFromStorage));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    if (user && user.uid) {
      syncCartWithFirestore(cartItems);
    }
  }, [cartItems, user]);



  function addItemToCart(product) {
    const arr = cartItems;
    const itemIndex = cartItems.findIndex((data) => data.id == product.id);
    if (itemIndex == -1) {
      // item array mein nahn he
      arr.push({ ...product, quantity: 1 });
    } else {
      arr[itemIndex].quantity++;
    }
    setCartItems([...arr]);
  }


  // Buy Now function: adds product to cart and navigates to checkout page
  const buyNow = (item) => {
    const arr = [...cartItems];
    const itemIndex = arr.findIndex((data) => data.id === item.id);
    if (itemIndex === -1) {
      arr.push({ ...item, quantity: 1 });
    } else {
      arr[itemIndex].quantity++;
    }
    setCartItems(arr);
  };
  function removeItemFromCart(id) {
    const arr = cartItems.filter((data) => data.id !== id);
    setCartItems(arr);
  }

  function lessQuantityFromCart(id) {
    const arr = [...cartItems];
    const itemIndex = arr.findIndex((data) => data.id === id);
    if (itemIndex !== -1 && arr[itemIndex].quantity > 1) {
      arr[itemIndex].quantity--;
      setCartItems(arr);
    } else if (itemIndex !== -1) {
      removeItemFromCart(id); // remove item if quantity is 0
    }
  }

  function isItemAdded(id) {
    const arr = cartItems;
    const itemIndex = cartItems.findIndex((data) => data.id == id);
    if (itemIndex == -1) {
      return null;
    } else {
      return arr[itemIndex];
    }
  }


  return (
    <CartContext.Provider
      value={{
        cartItems,
        addItemToCart,
        buyNow,
        removeItemFromCart,
        lessQuantityFromCart,
        isItemAdded,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
