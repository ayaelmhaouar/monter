// src/pages/ProductDetail.jsx (version simplifiée sans useNavigate)
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';


const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      const mockProduct = {
        id: parseInt(id),
        name: 'TimeLux Classic Homme',
        price: 299.99,
        compare_price: 399.99,
        description: 'Cette montre classique pour homme allie élégance et performance. Avec son bracelet en cuir véritable et son cadran sophistiqué, elle convient parfaitement à toutes les occasions.',
        features: [
          'Mouvement quartz suisse',
          'Étanche jusqu\'à 50m',
          'Verre saphir anti-rayures',
          'Bracelet en cuir véritable',
          'Garantie 2 ans'
        ],
        specifications: {
          brand: 'TimeLux',
          model: 'Classic',
          gender: 'Homme',
          movement: 'Quartz',
          caseMaterial: 'Acier inoxydable',
          strapMaterial: 'Cuir véritable',
          caseDiameter: '42mm',
          waterResistance: '50m',
          crystal: 'Verre saphir'
        },
        images: ['', '', '', ''],
        category: 'homme',
        stock: 15,
        sku: 'TL-CH-001'
      };

      const mockRelated = [
        {
          id: 2,
          name: 'TimeLux Sport Homme',
          price: 399.99,
          image: '',
          category: 'homme'
        },
        {
          id: 3,
          name: 'TimeLux Élégance',
          price: 349.99,
          image: '',
          category: 'homme'
        }
      ];

      setProduct(mockProduct);
      setRelatedProducts(mockRelated);
      setLoading(false);
    }, 800);
  }, [id]);

  const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    
    const existingItemIndex = cart.findIndex(item => item.id === product.id);
    
    if (existingItemIndex !== -1) {
      cart[existingItemIndex].quantity += quantity;
    } else {
      cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.images[0],
        quantity: quantity
      });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    
    alert(`Produit ajouté au panier ! Quantité: ${quantity}`);
  };

  const addToWishlist = () => {
    const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    
    if (!wishlist.find(item => item.id === product.id)) {
      wishlist.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.images[0]
      });
      
      localStorage.setItem('wishlist', JSON.stringify(wishlist));
      alert('Produit ajouté aux favoris !');
    } else {
      alert('Ce produit est déjà dans vos favoris !');
    }
  };

  if (loading) {
    return (
      <div className="loading">
        <p>Chargement du produit...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="product-not-found">
        <h2>Produit non trouvé</h2>
        <p>Le produit que vous recherchez n'existe pas.</p>
        <Link to="/montres" className="back-to-products">
          Retour aux produits
        </Link>
      </div>
    );
  }

  return (
    <div className="product-detail">
      {/* Fil d'Ariane */}
      <nav className="breadcrumb">
        <Link to="/">Accueil</Link>
        <span> / </span>
        <Link to="/montres">Montres</Link>
        <span> / </span>
        <Link to={`/montres/${product.category}`}>
          {product.specifications.gender}
        </Link>
        <span> / </span>
        <span>{product.name}</span>
      </nav>

      <div className="product-detail-container">
        {/* Galerie d'images */}
        <div className="product-gallery">
          <div className="main-image">
            <div className="image-placeholder-large">
              ⌚<br/>
              Image {selectedImage + 1}
            </div>
          </div>
          <div className="image-thumbnails">
            {product.images.map((image, index) => (
              <div
                key={index}
                className={`thumbnail ${selectedImage === index ? 'active' : ''}`}
                onClick={() => setSelectedImage(index)}
              >
                <div className="image-placeholder-small">
                  {index + 1}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Informations du produit */}
        <div className="product-info">
          <h1>{product.name}</h1>
          <p className="product-sku">Référence: {product.sku}</p>
          
          <div className="price-section">
            <span className="current-price">{product.price} €</span>
            {product.compare_price && (
              <span className="compare-price">{product.compare_price} €</span>
            )}
            {product.compare_price && (
              <span className="discount">
                -{Math.round((1 - product.price / product.compare_price) * 100)}%
              </span>
            )}
          </div>

          <div className="stock-info">
            {product.stock > 0 ? (
              <span className="in-stock">✓ En stock ({product.stock} disponibles)</span>
            ) : (
              <span className="out-of-stock">✗ Rupture de stock</span>
            )}
          </div>

          <p className="product-description">{product.description}</p>

          {/* Caractéristiques */}
          <div className="features">
            <h3>Caractéristiques principales</h3>
            <ul>
              {product.features.map((feature, index) => (
                <li key={index}>✓ {feature}</li>
              ))}
            </ul>
          </div>

          {/* Sélection de quantité et ajout au panier */}
          <div className="purchase-section">
            <div className="quantity-selector">
              <label>Quantité:</label>
              <div className="quantity-controls">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  -
                </button>
                <span>{quantity}</span>
                <button 
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  disabled={quantity >= product.stock}
                >
                  +
                </button>
              </div>
            </div>

            <div className="action-buttons">
              <button 
                className="add-to-cart-btn"
                onClick={addToCart}
                disabled={product.stock === 0}
              >
                🛒 Ajouter au panier
              </button>
              <button 
                className="wishlist-btn"
                onClick={addToWishlist}
              >
                ❤️ Favoris
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Détails supplémentaires */}
      <div className="product-details-tabs">
        <div className="tabs">
          <div className="tab active">Description</div>
          <div className="tab">Spécifications</div>
          <div className="tab">Livraison</div>
        </div>

        <div className="tab-content">
          <div className="specifications">
            <h3>Spécifications techniques</h3>
            <div className="specs-grid">
              <div className="spec-item">
                <strong>Marque:</strong>
                <span>{product.specifications.brand}</span>
              </div>
              <div className="spec-item">
                <strong>Modèle:</strong>
                <span>{product.specifications.model}</span>
              </div>
              <div className="spec-item">
                <strong>Genre:</strong>
                <span>{product.specifications.gender}</span>
              </div>
              <div className="spec-item">
                <strong>Mouvement:</strong>
                <span>{product.specifications.movement}</span>
              </div>
              <div className="spec-item">
                <strong>Matériau du boîtier:</strong>
                <span>{product.specifications.caseMaterial}</span>
              </div>
              <div className="spec-item">
                <strong>Bracelet:</strong>
                <span>{product.specifications.strapMaterial}</span>
              </div>
              <div className="spec-item">
                <strong>Diamètre:</strong>
                <span>{product.specifications.caseDiameter}</span>
              </div>
              <div className="spec-item">
                <strong>Étanchéité:</strong>
                <span>{product.specifications.waterResistance}</span>
              </div>
              <div className="spec-item">
                <strong>Verre:</strong>
                <span>{product.specifications.crystal}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Produits similaires */}
      <section className="related-products">
        <h2>Produits similaires</h2>
        <div className="related-products-grid">
          {relatedProducts.map(relatedProduct => (
            <div key={relatedProduct.id} className="related-product-card">
              <div className="related-product-image">
                <div className="image-placeholder">⌚</div>
              </div>
              <div className="related-product-info">
                <h3>{relatedProduct.name}</h3>
                <p className="price">{relatedProduct.price} €</p>
                <Link 
                  to={`/produit/${relatedProduct.id}`}
                  className="view-product-btn"
                >
                  Voir le produit
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ProductDetail;