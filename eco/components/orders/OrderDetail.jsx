import React, { useState } from 'react';
import { Card, Button, Badge } from 'react-bootstrap';
import { useCart } from '../../context/CartContext';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [imageError, setImageError] = useState(false);

  // Ajouter au panier
  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product, 1);
  };

  // Redirection vers la page produit
  const handleCardClick = () => {
    navigate(`/product/${product.id}`);
  };

  // Gestion erreur image
  const handleImageError = () => setImageError(true);

  // Badge catégorie
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
      case 'homme': return '👔';
      case 'femme': return '👗';
      case 'sport': return '⚡';
      default: return '⌚';
    }
  };

  const getCategoryLabel = (category) => {
    switch (category) {
      case 'homme': return 'Homme';
      case 'femme': return 'Femme';
      case 'sport': return 'Sport';
      default: return 'Montre';
    }
  };

  // Obtenir l'image du produit
  const getProductImage = () => {
    // Si le produit a une image dans la base de données
    if (product.image && !imageError) {
      // Si c'est déjà une URL complète
      if (product.image.startsWith('http')) {
        return product.image;
      }
      // Si c'est juste un nom de fichier
      else if (product.image.includes('.')) {
        // Construire l'URL vers public/products/
        return `http://localhost:8000/products/${product.image}`;
      }
    }
    
    // Fallback vers les images locales
    const fallbackImages = {
      homme: ['/images/homme1.jpg', '/images/homme2.jpg', '/images/homme3.jpg'],
      femme: ['/images/femme1.jpg', '/images/femme2.jpg', '/images/femme3.jpg'],
      sport: ['/images/sport1.jpg', '/images/sport2.jpg', '/images/sport3.jpg']
    };

    const categoryImages = fallbackImages[product.category] || fallbackImages.homme;
    const imageIndex = (product.id || 0) % categoryImages.length;
    return categoryImages[imageIndex];
  };

  return (
    <Card 
      className="h-100 product-card shadow-sm border-0"
      style={{ cursor: 'pointer', transition: 'all 0.3s ease' }}
      onClick={handleCardClick}
    >
      <div className="position-relative overflow-hidden">
        <Card.Img
          variant="top"
          src={getProductImage()}
          onError={handleImageError}
          style={{ height: '250px', objectFit: 'cover', transition: 'transform 0.3s ease' }}
          className="card-img-hover"
        />
        
        {/* Badge catégorie */}
        <Badge
          bg={getCategoryVariant(product.category)}
          className="position-absolute top-0 start-0 m-3"
        >
          {getCategoryIcon(product.category)} {getCategoryLabel(product.category)}
        </Badge>

        {/* Badge stock */}
        {product.stock === 0 ? (
          <Badge bg="danger" className="position-absolute top-0 end-0 m-3">Rupture</Badge>
        ) : product.stock < 5 ? (
          <Badge bg="warning" text="dark" className="position-absolute top-0 end-0 m-3">Bientôt épuisé</Badge>
        ) : null}
      </div>

      <Card.Body className="d-flex flex-column p-4">
        <Card.Title className="h6 mb-2 fw-bold" style={{ minHeight: '48px', lineHeight: '1.4' }}>
          {product.name || 'Nom non disponible'}
        </Card.Title>

        <Card.Text className="text-muted small flex-grow-1 mb-3" style={{ minHeight: '60px', lineHeight: '1.5' }}>
          {product.description 
            ? (product.description.length > 90 
                ? `${product.description.substring(0, 90)}...` 
                : product.description) 
            : 'Description non disponible'}
        </Card.Text>

        <div className="mt-auto">
          {/* Prix et stock */}
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div>
              <span className="h5 text-primary fw-bold mb-0">
                {product.price ? `${product.price} €` : 'Prix non disponible'}
              </span>
              <small className="text-muted d-block">TTC</small>
            </div>
            <small className={`text-${product.stock > 0 ? 'success' : 'danger'}`}>
              {product.stock > 0 ? (
                <>
                  <div className="fw-bold">✓ En stock</div>
                  <small>{product.stock} disponible{product.stock > 1 ? 's' : ''}</small>
                </>
              ) : (
                <div className="fw-bold">✗ Rupture</div>
              )}
            </small>
          </div>

          {/* Boutons */}
          <div className="d-grid gap-2">
            <Button
              variant={product.stock > 0 ? "primary" : "outline-secondary"}
              size="sm"
              onClick={handleAddToCart}
              disabled={product.stock === 0 || !product.price}
              className="fw-semibold"
            >
              {product.stock > 0 ? <>🛒 Ajouter au panier</> : <>⏳ Indisponible</>}
            </Button>

            <Button
              variant="outline-primary"
              size="sm"
              onClick={handleCardClick}
            >
              👁️ Voir les détails
            </Button>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;