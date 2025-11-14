import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './Products.css';

const Products = () => {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      const mockProducts = [
        {
          id: 1,
          name: 'Montre Classique Homme',
          price: 299.99,
          image: '/images/montre1.jpg',
          category: 'homme'
        },
        {
          id: 2,
          name: 'Montre Élégante Femme',
          price: 249.99,
          image: '/images/montre2.jpg',
          category: 'femme'
        },
        {
          id: 3,
          name: 'Montre Sport Étanche',
          price: 199.99,
          image: '/images/montre3.jpg',
          category: 'sport'
        },
        {
          id: 4,
          name: 'Montre Luxe Or',
          price: 999.99,
          image: '/images/montre4.jpg',
          category: 'luxe'
        }
      ];

      if (category && category !== 'nouveautes' && category !== 'promotions') {
        const filtered = mockProducts.filter(product => 
          product.category === category
        );
        setProducts(filtered);
      } else {
        setProducts(mockProducts);
      }
      
      setLoading(false);
    }, 1000);
  }, [category]);

  const addToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Produit ajouté au panier !');
  };

  if (loading) {
    return (
      <div className="loading">
        <p>Chargement des produits...</p>
      </div>
    );
  }

  return (
    <div className="products-page">
      <h1>
        {category ? `Montres ${category.charAt(0).toUpperCase() + category.slice(1)}` : 'Toutes nos montres'}
      </h1>
      
      <div className="products-grid">
        {products.map(product => (
          <div key={product.id} className="product-card">
            <div className="product-image">
              <div className="image-placeholder">⌚</div>
            </div>
            <div className="product-info">
              <h3>{product.name}</h3>
              <p className="price">{product.price} €</p>
              <button 
                className="add-to-cart-btn"
                onClick={() => addToCart(product)}
              >
                Ajouter au panier
              </button>
            </div>
          </div>
        ))}
      </div>

      {products.length === 0 && (
        <div className="no-products">
          <p>Aucun produit trouvé dans cette catégorie.</p>
        </div>
      )}
    </div>
  );
};

export default Products;