import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { productService } from '../../services/products';
import { Container, Row, Col, Button, Badge, Spinner, Alert, Card, Form } from 'react-bootstrap';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    loadProduct();
  }, [id]);

  const loadProduct = async () => {
    try {
      setLoading(true);
      const response = await productService.getById(id);
      
      if (response.success) {
        setProduct(response.data);
      } else {
        setError('Produit non trouvé');
      }
    } catch (err) {
      setError('Erreur lors du chargement du produit');
      console.error('Error loading product:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    if (product && product.stock > 0) {
      addToCart(product, quantity);
    }
  };

  const getCategoryVariant = (category) => {
    switch (category) {
      case 'homme': return 'primary';
      case 'femme': return 'success';
      case 'sport': return 'warning';
      default: return 'secondary';
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'homme': return '👨';
      case 'femme': return '👩';
      case 'sport': return '⚡';
      default: return '⌚';
    }
  };

  // Images d'exemple (en réalité, vous auriez plusieurs images par produit)
  const productImages = product ? [
    product.image || `https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=600&h=400&fit=crop`,
    `https://images.unsplash.com/photo-1547996160-81dfd9c4b1b3?w=600&h=400&fit=crop`,
    `https://images.unsplash.com/photo-1551816230-ef5deaed4a26?w=600&h=400&fit=crop`
  ] : [];

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Chargement...</span>
        </Spinner>
      </Container>
    );
  }

  if (error || !product) {
    return (
      <Container className="my-5">
        <Alert variant="danger">
          {error || 'Produit non trouvé'}
        </Alert>
        <Button onClick={() => navigate('/products')}>
          ← Retour à la boutique
        </Button>
      </Container>
    );
  }

  return (
    <Container className="my-5">
      <Button 
        variant="outline-secondary" 
        onClick={() => navigate('/products')}
        className="mb-4"
      >
        ← Retour à la boutique
      </Button>

      <Row>
        {/* Galerie d'images */}
        <Col md={6}>
          <Card className="mb-3">
            <Card.Body className="text-center">
              <img 
                src={productImages[selectedImage]} 
                alt={product.name}
                className="img-fluid rounded"
                style={{ maxHeight: '400px', objectFit: 'cover' }}
              />
            </Card.Body>
          </Card>
          
          <Row className="g-2">
            {productImages.map((image, index) => (
              <Col key={index} xs={4}>
                <Card 
                  className={`cursor-pointer ${selectedImage === index ? 'border-primary' : ''}`}
                  onClick={() => setSelectedImage(index)}
                  style={{ cursor: 'pointer' }}
                >
                  <Card.Img 
                    variant="top" 
                    src={image} 
                    style={{ height: '80px', objectFit: 'cover' }}
                  />
                </Card>
              </Col>
            ))}
          </Row>
        </Col>

        {/* Détails du produit */}
        <Col md={6}>
          <div className="ps-md-4">
            <Badge bg={getCategoryVariant(product.category)} className="mb-2">
              {getCategoryIcon(product.category)} {product.category}
            </Badge>
            
            <h1 className="h2 mb-3">{product.name}</h1>
            
            <div className="mb-4">
              <span className="h3 text-primary me-2">{product.price} €</span>
              <small className="text-muted">TVA incluse</small>
            </div>

            <div className="mb-4">
              <p className="lead">{product.description}</p>
            </div>

            {/* Stock et disponibilité */}
            <div className="mb-4">
              <p className={`fw-bold ${product.stock > 0 ? 'text-success' : 'text-danger'}`}>
                {product.stock > 0 ? (
                  <>✅ En stock - {product.stock} disponible{product.stock > 1 ? 's' : ''}</>
                ) : (
                  <>❌ Rupture de stock</>
                )}
              </p>
            </div>

            {/* Sélection de quantité et ajout au panier */}
            {product.stock > 0 && (
              <Card className="mb-4">
                <Card.Body>
                  <Row className="align-items-center">
                    <Col xs={12} sm={4}>
                      <Form.Label htmlFor="quantity" className="fw-bold">
                        Quantité:
                      </Form.Label>
                      <Form.Select
                        id="quantity"
                        value={quantity}
                        onChange={(e) => setQuantity(parseInt(e.target.value))}
                      >
                        {[...Array(Math.min(product.stock, 10))].map((_, i) => (
                          <option key={i + 1} value={i + 1}>
                            {i + 1}
                          </option>
                        ))}
                      </Form.Select>
                    </Col>
                    
                    <Col xs={12} sm={8}>
                      <Button 
                        variant="primary" 
                        size="lg" 
                        className="w-100 mt-2 mt-sm-0"
                        onClick={handleAddToCart}
                      >
                        🛒 Ajouter au panier - {(product.price * quantity).toFixed(2)} €
                      </Button>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            )}

            {/* Caractéristiques */}
            <Card>
              <Card.Header>
                <h5 className="mb-0">📋 Caractéristiques</h5>
              </Card.Header>
              <Card.Body>
                <Row>
                  <Col sm={6}>
                    <p><strong>Catégorie:</strong> {product.category}</p>
                    <p><strong>Référence:</strong> #{product.id}</p>
                  </Col>
                  <Col sm={6}>
                    <p><strong>Stock:</strong> {product.stock} unité{product.stock > 1 ? 's' : ''}</p>
                    <p><strong>Statut:</strong> {product.is_active ? 'Actif' : 'Inactif'}</p>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </div>
        </Col>
      </Row>

      {/* Section informations supplémentaires */}
      <Row className="mt-5">
        <Col>
          <Card>
            <Card.Header>
              <h5 className="mb-0">ℹ️ Informations complémentaires</h5>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col md={4} className="text-center mb-3">
                  <div className="h1">🚚</div>
                  <h6>Livraison gratuite</h6>
                  <p className="text-muted small">
                    Livraison offerte sous 2-5 jours ouvrables
                  </p>
                </Col>
                <Col md={4} className="text-center mb-3">
                  <div className="h1">↩️</div>
                  <h6>Retours faciles</h6>
                  <p className="text-muted small">
                    30 jours pour changer d'avis
                  </p>
                </Col>
                <Col md={4} className="text-center mb-3">
                  <div className="h1">🔒</div>
                  <h6>Paiement sécurisé</h6>
                  <p className="text-muted small">
                    Transactions 100% sécurisées
                  </p>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductDetail;