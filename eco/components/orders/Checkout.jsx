import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { orderService } from '/src/services/Orders.js';

const Checkout = () => {
  const { cart, getCartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    shipping_address: '',
    billing_address: '',
    payment_method: 'card'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const orderData = {
        ...formData,
        items: cart
      };

      const response = await orderService.create(orderData);
      
      if (response.success) {
        clearCart();
        navigate('/order-success', { 
          state: { orderId: response.data.id } 
        });
      } else {
        setError(response.error);
      }
    } catch (err) {
      setError('Erreur lors de la création de la commande');
      console.error('Checkout error:', err);
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0) {
    return (
      <Container className="my-5">
        <Alert variant="info">
          Votre panier est vide. <a href="/products">Découvrez nos produits</a>
        </Alert>
      </Container>
    );
  }

  return (
    <Container className="my-5">
      <Row>
        <Col>
          <h2>Finaliser la commande</h2>
        </Col>
      </Row>

      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={8}>
            <Card className="mb-4">
              <Card.Header>
                <h5>Informations de livraison</h5>
              </Card.Header>
              <Card.Body>
                <Form.Group className="mb-3">
                  <Form.Label>Adresse de livraison *</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="shipping_address"
                    value={formData.shipping_address}
                    onChange={handleChange}
                    required
                    placeholder="Entrez votre adresse complète de livraison"
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Adresse de facturation *</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="billing_address"
                    value={formData.billing_address}
                    onChange={handleChange}
                    required
                    placeholder="Entrez votre adresse complète de facturation"
                  />
                </Form.Group>

                <Form.Check
                  type="checkbox"
                  label="Utiliser la même adresse pour la livraison et la facturation"
                  onChange={(e) => {
                    if (e.target.checked) {
                      setFormData({
                        ...formData,
                        billing_address: formData.shipping_address
                      });
                    }
                  }}
                />
              </Card.Body>
            </Card>

            <Card>
              <Card.Header>
                <h5>Méthode de paiement</h5>
              </Card.Header>
              <Card.Body>
                <Form.Group>
                  <Form.Check
                    type="radio"
                    name="payment_method"
                    value="card"
                    checked={formData.payment_method === 'card'}
                    onChange={handleChange}
                    label="Carte de crédit"
                    className="mb-2"
                  />
                  <Form.Check
                    type="radio"
                    name="payment_method"
                    value="paypal"
                    checked={formData.payment_method === 'paypal'}
                    onChange={handleChange}
                    label="PayPal"
                    className="mb-2"
                  />
                  <Form.Check
                    type="radio"
                    name="payment_method"
                    value="cash_on_delivery"
                    checked={formData.payment_method === 'cash_on_delivery'}
                    onChange={handleChange}
                    label="Paiement à la livraison"
                  />
                </Form.Group>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4}>
            <Card>
              <Card.Header>
                <h5>Résumé de la commande</h5>
              </Card.Header>
              <Card.Body>
                {cart.map(item => (
                  <div key={item.id} className="d-flex justify-content-between mb-2">
                    <span>
                      {item.name} x {item.quantity}
                    </span>
                    <span>{(item.price * item.quantity).toFixed(2)} €</span>
                  </div>
                ))}
                
                <hr />
                <div className="d-flex justify-content-between mb-2">
                  <span>Sous-total:</span>
                  <span>{getCartTotal().toFixed(2)} €</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>Livraison:</span>
                  <span>Gratuite</span>
                </div>
                <hr />
                <div className="d-flex justify-content-between mb-3">
                  <strong>Total:</strong>
                  <strong>{getCartTotal().toFixed(2)} €</strong>
                </div>

                {error && <Alert variant="danger">{error}</Alert>}

                <Button 
                  variant="primary" 
                  type="submit" 
                  className="w-100" 
                  disabled={loading}
                >
                  {loading ? 'Traitement...' : 'Confirmer la commande'}
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default Checkout;