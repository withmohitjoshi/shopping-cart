import React, { useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { ComponentContext } from "../App";
import { CHANGE_QTY, REMOVE_TO_CART } from "../Utils/constants";

const Cart = () => {
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [state, dispatch] = useContext(ComponentContext);
  useEffect(() => {
    setTotalPrice(
      state.cart.reduce((acc, crr) => acc + Number(crr.price) * crr.qyt, 0)
    );
    setTotalItems(state.cart.reduce((acc, crr) => acc + crr.qyt, 0));
  }, [state.cart]);

  if (state.cart.length !== 0) {
    return (
      <>
        <h1 className="cart-heading">Cart</h1>
        <p>
          Total items : <span>{totalItems}</span>
        </p>
        <p>
          Total Price : <span>${totalPrice}</span>
        </p>
        {state.cart.map((cartItem) => {
          return (
            <React.Fragment key={cartItem.id}>
              <div className="cart-item">
                <div className="cart-item-img">
                  <img loading="lazy" src={cartItem.thumbnail} />
                </div>
                <div className="cart-item-info-section">
                  <p className="cart-item-title">{cartItem.title}</p>
                  <p className="cart-item-price">
                    price: <span>${cartItem.price * cartItem.qyt}</span>
                  </p>
                </div>
                <div className="qyt-btn">
                  <button
                    onClick={() => {
                      if (cartItem.qyt === 1) {
                        dispatch({
                          type: REMOVE_TO_CART,
                          payload: cartItem.id,
                        });
                      } else {
                        dispatch({
                          type: CHANGE_QTY,
                          payload: cartItem.id,
                          qyt: cartItem.qyt - 1,
                        });
                      }
                    }}
                  >
                    -
                  </button>
                  <span>{cartItem.qyt}</span>
                  <button
                    onClick={() => {
                      dispatch({
                        type: CHANGE_QTY,
                        payload: cartItem.id,
                        qyt: cartItem.qyt + 1,
                      });
                    }}
                  >
                    +
                  </button>
                </div>
              </div>
            </React.Fragment>
          );
        })}
      </>
    );
  }
  return (
    <>
      <h1 className="cart-heading">Cart</h1>
      <p>Cart is Empty</p>
    </>
  );
};

export default React.memo(Cart);
