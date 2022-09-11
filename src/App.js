import React, { useEffect, useReducer, useState } from "react";
import { getProductsData } from "./getProductsData";
import { GET_PRODUCTS, HAS_ERROR } from "./Utils/constants";
import { cartReducer } from "./Reducers/cartReducer";
import "./Styles/App.css";
import Products from "./Components/Products";
import Cart from "./Components/Cart";

const initialState = {
  products: [],
  cart: [],
  hasError: false,
};

export const ComponentContext = React.createContext();
function App() {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  useEffect(() => {
    getProductsData()
      .then((data) => {
        dispatch({ type: GET_PRODUCTS, payload: data });
      })
      .catch((error) => {
        dispatch({ type: HAS_ERROR, payload: true });
      });
  }, []);

  if (state.hasError === true) {
    return (
      <>
        <div
          style={{
            display: "grid",
            placeContent: "center",
            minHeight: "100vh",
            textAlign: "center",
          }}
        >
          <p>Something went wrong</p>
          <p>Please Refresh</p>
        </div>
      </>
    );
  }
  return (
    <>
      <ComponentContext.Provider value={[state, dispatch]}>
        <div className="App">
          <div className="product">
            <Products />
          </div>
          <div className="cart">
            <Cart />
          </div>
        </div>
      </ComponentContext.Provider>
    </>
  );
}

export default App;
