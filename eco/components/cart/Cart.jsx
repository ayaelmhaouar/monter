import React from 'react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Table, Alert } from 'react-bootstrap';
import CartItem from './CartItem';

const Cart = () => {
  const { cart, getCartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    navigate('/checkout');
  };

  const handleContinueShopping = () => {
    navigate('/products');
  };

  if (cart.length === 0) {
    return (
      <Container className="my-5">
        <Row className="justify-content-center">
          <Col md={6}>
            <Card className="text-center">
              <Card.Body className="py-5">
                <div className="mb-4" style={{ fontSize: '4rem' }}>🛒</div>
                <h3>Votre panier est vide</h3>
                <p className="text-muted mb-4">
                  Découvrez notre collection de montres et trouvez la pièce parfaite !
                </p>
                <Button variant="primary" onClick={handleContinueShopping}>
                  Découvrir nos produits
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }

  return (
    <Container className="my-5">
      <Row>
        <Col>
          <h2 className="mb-4">Votre Panier</h2>
        </Col>
      </Row>

      <Row>
        <Col lg={8}>
          <Card>
            <Card.Header>
              <h5 className="mb-0">
                Articles ({cart.reduce((total, item) => total + item.quantity, 0)})
              </h5>
            </Card.Header>
            <Card.Body className="p-0">
              <Table responsive className="mb-0">
                <thead className="bg-light">
                  <tr>
                    <th style={{ width: '40%' }}>Produit</th>
                    <th style={{ width: '15%' }}>Prix</th>
                    <th style={{ width: '20%' }}>Quantité</th>
                    <th style={{ width: '15%' }}>Total</th>
                    <th style={{ width: '10%' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map(item => (
                    <CartItem key={item.id} item={item} />
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>

          <div className="d-flex justify-content-between mt-3">
            <Button 
              variant="outline-secondary" 
              onClick={handleContinueShopping}
            >
              ← Continuer mes achats
            </Button>
            <Button 
              variant="outline-danger" 
              onClick={clearCart}
            >
              🗑️ Vider le panier
            </Button>
          </div>
        </Col>

        <Col lg={4}>
          <Card className="sticky-top" style={{ top: '100px' }}>
            <Card.Header>
              <h5 className="mb-0">Résumé de la commande</h5>
            </Card.Header>
            <Card.Body>
              <div className="d-flex justify-content-between mb-2">
                <span>Sous-total:</span>
                <span>{getCartTotal().toFixed(2)} €</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>Livraison:</span>
                <span className="text-success">Gratuite</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>Taxes:</span>
                <span>Incluses</span>
              </div>
              <hr />
              <div className="d-flex justify-content-between mb-3">
                <strong>Total:</strong>
                <strong className="h5 text-primary">
                  {getCartTotal().toFixed(2)} €
                </strong>
              </div>

              {!user && (
                <Alert variant="warning" className="small">
                  🔒 Vous devez être connecté pour passer commande
                </Alert>
              )}

              <Button 
                variant="primary" 
                size="lg" 
                className="w-100"
                onClick={handleCheckout}
                disabled={!user}
              >
                {user ? 'Passer la commande' : 'Se connecter pour commander'}
              </Button>

              {user && (
                <div className="text-center mt-2">
                  <small className="text-muted">
                    Livraison estimée: 2-5 jours ouvrables
                  </small>
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Cart;