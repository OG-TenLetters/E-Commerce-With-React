import React, { useState, useEffect } from "react";
import EmptyCart from "../assets/empty_cart.svg";
import { Link } from "react-router-dom";

const Cart = ({ cart, changeQuantity, removeBookFromCart }) => {
  const total = () => {
    let price = 0;
    cart.forEach((item) => {
      price += +(
        (item.salePrice || item.originalPrice) * item.quantity
      ).toFixed(2);
    });
    return price;
  };

  return (
    <div>
      <div id="books__body">
        <main id="books__main">
          <div className="books__container">
            <div className="row">
              <div className="book__selected--top">
                <h2 className="cart__title">Cart</h2>
              </div>
              <div className="cart">
                <div className="cart__header">
                  <span className="cart__book">Book</span>
                  <span className="cart__quantity">Quantity</span>
                  <span className="cart__total">Price</span>
                </div>
                <div className="cart__body">
                  {cart.map((book, index) => {
                    return (
                      <div className="cart__item" key={index}>
                        <div className="cart__book">
                          <img
                            className="cart__book--img"
                            src={book.url}
                            alt=""
                          />
                          <div className="cart__book--info">
                            <span className="cart__book--title">
                              {book.title}
                            </span>
                            <span className="cart__book--price">
                              $
                              {(book.salePrice || book.originalPrice).toFixed(
                                2
                              )}
                            </span>
                            <button
                              onClick={() => removeBookFromCart(book)}
                              className="cart__book--remove"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                        <div className="cart__quantity">
                          <input
                            type="number"
                            min={0}
                            max={99}
                            className="cart__input"
                            value={book.quantity}
                            onChange={(event) =>
                              changeQuantity(book, event.target.value)
                            }
                          />
                        </div>
                        <div className="cart__total">
                          $
                          {(
                            (book.salePrice || book.originalPrice) *
                            book.quantity
                          ).toFixed(2)}
                        </div>
                      </div>
                    );
                  })}
                </div>
                {cart.length === 0 && (
                  <div className="cart__empty">
                    <img src={EmptyCart} alt="" className="cart__empty--img" />
                    <h2>You don't have any books in your cart!</h2>
                    <Link to="/books">
                      <button className="btn">Browse Books</button>
                    </Link>
                  </div>
                )}
              </div>
              {cart.length > 0 && (
                <div className="total">
                  <div className="total__item total__sub-total">
                    <span>Subtotal</span>
                    <span>${total().toFixed(2)}</span>
                  </div>
                  <div className="total__item total__tax">
                    <span>Tax</span>
                    <span>
                      $
                      {total() === 0
                        ? "0.00"
                        : (total() * 1.1 - total()).toFixed(2)}
                    </span>
                  </div>
                  <div className="total__item total__price">
                    <span>Total</span>
                    <span>${(total() * 1.1).toFixed(2)}</span>
                  </div>
                  <button
                    className="btn btn__checkout no-cursor"
                    onClick={() =>
                      alert(`Yeahh... I haven't gotten around to that yet :'(`)
                    }
                  >
                    Proceed to Checkout
                  </button>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Cart;
