import React, { useState } from 'react';
import { Card, Button, Badge } from 'react-bootstrap';
import { useCart } from '../../context/CartContext';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [imageError, setImageError] = useState(false);

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product, 1);
  };

  const handleCardClick = () => {
    navigate(`/product/${product.id}`);
  };

  const handleImageError = () => setImageError(true);

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

  // Fonction pour obtenir l'image de fallback
  const getFallbackImage = () => {
    const fallbackImages = {
      homme: [
        'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1547996160-81dfd9c4b1b3?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=400&h=300&fit=crop'
      ],
      femme: [
        'https://images.unsplash.com/photo-1548169874-53e85f753f1e?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1594576722512-582d5577dc55?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=300&fit=crop'
      ],
      sport: [
        'https://images.unsplash.com/photo-1553545204-5336bc12ca2c?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1539874754764-5a96559165b0?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop'
      ]
    };

    const categoryImages = fallbackImages[product.category] || fallbackImages.homme;
    const imageIndex = (product.id || 0) % categoryImages.length;
    return categoryImages[imageIndex];
  };

  // Fonction principale pour obtenir l'image du produit
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
    
    // Fallback vers les images Unsplash
    return getFallbackImage();
  };

  // Debug: afficher les infos du produit
  console.log('ProductCard - Produit:', product);
  console.log('ProductCard - Image URL:', getProductImage());

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