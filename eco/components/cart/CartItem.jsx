import React from 'react';
import { useCart } from '../../context/CartContext';
import { Row, Col, Button, Form } from 'react-bootstrap';

const CartItem = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(item.id);
    } else {
      updateQuantity(item.id, newQuantity);
    }
  };

  const handleRemove = () => {
    removeFromCart(item.id);
  };

  const totalPrice = item.price * item.quantity;

  return (
    <tr>
      <td>
        <div className="d-flex align-items-center">
          <img 
            src={item.image || '/images/placeholder-watch.jpg'} 
            alt={item.name}
            className="me-3"
            style={{
              width: '60px',
              height: '60px',
              objectFit: 'cover',
              borderRadius: '8px'
            }}
          />
          <div>
            <h6 className="mb-1">{item.name}</h6>
            <small className="text-muted">Catégorie: {item.category}</small>
          </div>
        </div>
      </td>
      
      <td className="align-middle">
        <strong>{item.price.toFixed(2)} €</strong>
      </td>
      
      <td className="align-middle">
        <div className="d-flex align-items-center">
          <Button
            variant="outline-secondary"
            size="sm"
            onClick={() => handleQuantityChange(item.quantity - 1)}
            disabled={item.quantity <= 1}
          >
            -
          </Button>
          
          <Form.Control
            type="number"
            value={item.quantity}
            onChange={(e) => handleQuantityChange(parseInt(e.target.value))}
            min="1"
            style={{
              width: '70px',
              textAlign: 'center',
              margin: '0 8px'
            }}
          />
          
          <Button
            variant="outline-secondary"
            size="sm"
            onClick={() => handleQuantityChange(item.quantity + 1)}
          >
            +
          </Button>
        </div>
      </td>
      
      <td className="align-middle">
        <strong>{totalPrice.toFixed(2)} €</strong>
      </td>
      
      <td className="align-middle">
        <Button
          variant="outline-danger"
          size="sm"
          onClick={handleRemove}
          title="Supprimer du panier"
        >
          🗑️
        </Button>
      </td>
    </tr>
  );
};

export default CartItem;