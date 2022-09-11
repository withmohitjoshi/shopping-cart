import React, { useContext } from "react";
import { ComponentContext } from "../App";
import { ADD_TO_CART, REMOVE_TO_CART } from "../Utils/constants";
const Products = () => {
  const [state, dispatch] = useContext(ComponentContext);
  return (
    <>
      {state.products.map((product) => {
        return (
          <React.Fragment key={product.id}>
            <div className="product-card">
              <div className="product-image">
                <img loading="lazy" src={product.images[0]} />
              </div>
              <div className="product-info-section">
                <p className="product-title">{product.title}</p>
                <p className="product-price" style={{ marginLeft: "15px" }}>
                  ${product.price}
                </p>
              </div>
              {state.cart.some((cartItem) => cartItem.id === product.id) ? (
                <button
                  className="btn btn-red"
                  onClick={() => {
                    dispatch({
                      type: REMOVE_TO_CART,
                      payload: product.id,
                    });
                  }}
                >
                  Remove from Cart
                </button>
              ) : (
                <button
                  className="btn btn-green"
                  onClick={() => {
                    dispatch({
                      type: ADD_TO_CART,
                      payload: {
                        id: product.id,
                        thumbnail: product.thumbnail,
                        title: product.title,
                        price: product.price,
                        qyt: 1,
                      },
                    });
                  }}
                >
                  Add To Cart
                </button>
              )}
            </div>
          </React.Fragment>
        );
      })}
    </>
  );
};

export default React.memo(Products);
