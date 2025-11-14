import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Cart.css';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCartItems(cart);
  }, []);

  const updateQuantity = (id, quantity) => {
    if (quantity < 1) return;
    
    const updatedCart = cartItems.map(item =>
      item.id === id ? { ...item, quantity } : item
    );
    
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const removeItem = (id) => {
    const updatedCart = cartItems.filter(item => item.id !== id);
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const getTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  if (cartItems.length === 0) {
    return (
      <div className="cart-empty">
        <h2>Votre panier est vide</h2>
        <p>Découvrez nos magnifiques montres et ajoutez-les à votre panier.</p>
        <Link to="/" className="continue-shopping">
          Continuer mes achats
        </Link>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <h2>Mon Panier</h2>
      
      <div className="cart-items">
        {cartItems.map(item => (
          <div key={item.id} className="cart-item">
            <div className="item-image">
              <div className="image-placeholder">⌚</div>
            </div>
            <div className="item-details">
              <h3>{item.name}</h3>
              <p className="price">{item.price} €</p>
            </div>
            <div className="quantity-controls">
              <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                -
              </button>
              <span>{item.quantity}</span>
              <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                +
              </button>
            </div>
            <div className="item-total">
              {(item.price * item.quantity).toFixed(2)} €
            </div>
            <button 
              className="remove-btn"
              onClick={() => removeItem(item.id)}
            >
              ×
            </button>
          </div>
        ))}
      </div>

      <div className="cart-summary">
        <div className="total">
          <strong>Total : {getTotal().toFixed(2)} €</strong>
        </div>
        <button className="checkout-btn">
          Procéder au paiement
        </button>
        <Link to="/" className="continue-shopping">
          Continuer mes achats
        </Link>
      </div>
    </div>
  );
};

export default Cart;