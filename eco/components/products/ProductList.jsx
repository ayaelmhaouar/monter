// src/pages/ProductListSimple.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const ProductList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('tous');
  const [showProducts, setShowProducts] = useState([]);

  // Données de produits
  const allProducts = [
    {
      id: 1,name: "Montre Classique Homme",  price: 299.99, image: "/public/f.jpg", category: "femme",brand: "TimeLux"
    },
    {
      id: 2,name: "Montre Élégante Femme",price: 249.99, image: "/public/men.jpg", category: "homme", brand: "Elegance"
    },
    {
      id: 3,name: "Montre Sport Étanche",price: 199.99, image: "/public/s.jpg",category: "sport",brand: "AquaSport"
    },
    {
      id: 4, name: "Montre de Luxe Or",price: 8999.99,image: "/public/feem.jpg",  category: "homme",brand: "Rolex"
    },
    {
      id: 5,name: "Smartwatch Connectée", price: 399.99, image: "/public/sp.jpg",category: "sport",brand: "TimeLux"
    },
    {
      id: 6,  name: "Montre Business", price: 389.99,  image: "/public/w.jpg",category: "homme", brand: "Executive"
    },
    {
      id: 7, name: "Montre Rose Or Femme", price: 349.99,image: "/public/hom.jpg",category: "femme", brand: "RoseGold"
    },
    {
      id: 8, name: "Chronographe Running",price: 289.99,   image: "/public/sportt.jpg", category: "sport",brand: "RunPro"
    },
    {
      id: 9, name: "Montre Vintage Homme", price: 459.99, image: "/public/h1.jpg",category: "homme",brand: "VintageCo"
    },
    {
      id: 10, name: "Montre Diamant Femme", price: 1299.99, image: "/public/f1.jpg", category: "femme",brand: "Diamond"
    },
    {
      id: 11,name: "Montre Fitness GPS",price: 229.99,image: "/public/s1.jpg",category: "sport",brand: "FitTech"
    },
    {
      id: 12,  name: "Montre Cuir Homme",  price: 179.99, image: "/public/.jpg",category: "homme",brand: "LeatherStyle"
    }
  ];

  // Images de catégories
  const categoryImages = {
    homme: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    femme: "https://images.unsplash.com/photo-1547996160-81dfd7f8c0e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    sport: "https://images.unsplash.com/photo-1539874754764-5a96559165b0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  };

  useEffect(() => {
    filterProducts();
  }, [selectedCategory, searchTerm]);

  const filterProducts = () => {
    let filtered = [...allProducts];

    // Filtre par catégorie
    if (selectedCategory !== 'tous') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Filtre par recherche
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setShowProducts(filtered);
  };

  const addToCart = (product) => {
    // Récupérer le panier existant
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    
    // Vérifier si le produit existe déjà
    const existingProduct = cart.find(item => item.id === product.id);
    
    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        brand: product.brand,
        quantity: 1
      });
    }
    
    // Sauvegarder dans localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Afficher une notification
    alert(`${product.name} a été ajouté au panier !`);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('tous');
  };

  return (
    <div className="container-fluid px-0">
      {/* Barre de recherche */}
      <div className="bg-light py-3 shadow-sm">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-4 mb-2 mb-md-0">
              <h1 className="h3 mb-0">Collection de Montres</h1>
            </div>
            <div className="col-md-8">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Rechercher une montre..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button className="btn btn-outline-secondary" onClick={clearFilters}>
                  <i className="bi bi-x-circle"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Boutons de catégories */}
      <div className="container py-3">
        <div className="row g-2">
          <div className="col-6 col-md-3">
            <button 
              className={`btn w-100 ${selectedCategory === 'tous' ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => setSelectedCategory('tous')}
            >
              <i className="bi bi-grid me-2"></i>
              Tous
            </button>
          </div>
          <div className="col-6 col-md-3">
            <button 
              className={`btn w-100 ${selectedCategory === 'homme' ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => setSelectedCategory('homme')}
            >
              <i className="bi bi-person me-2"></i>
              Homme
            </button>
          </div>
          <div className="col-6 col-md-3">
            <button 
              className={`btn w-100 ${selectedCategory === 'femme' ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => setSelectedCategory('femme')}
            >
              <i className="bi bi-person-heart me-2"></i>
              Femme
            </button>
          </div>
          <div className="col-6 col-md-3">
            <button 
              className={`btn w-100 ${selectedCategory === 'sport' ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => setSelectedCategory('sport')}
            >
              <i className="bi bi-activity me-2"></i>
              Sport
            </button>
          </div>
        </div>
      </div>

      {/* Image de catégorie */}
      {selectedCategory !== 'tous' && categoryImages[selectedCategory] && (
        <div className="container mb-4">
          <div className="card border-0 shadow">
            <img 
              src={categoryImages[selectedCategory]} 
              className="card-img rounded" 
              alt={`Montres ${selectedCategory}`}
              style={{ height: '300px', objectFit: 'cover' }}
            />
            <div className="card-img-overlay d-flex align-items-center justify-content-center">
              <div className="text-center text-white bg-dark bg-opacity-50 p-4 rounded">
                <h2 className="display-5 mb-2">Montres {selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}</h2>
                <p className="lead">{showProducts.length} modèles disponibles</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Affichage des produits */}
      <div className="container">
        {showProducts.length > 0 ? (
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
            {showProducts.map(product => (
              <div key={product.id} className="col">
                <div className="card h-100 border-0 shadow-sm">
                  <div className="position-relative" style={{ height: '200px', overflow: 'hidden' }}>
                    <img 
                      src={product.image} 
                      className="card-img-top h-100 w-100 object-fit-cover" 
                      alt={product.name}
                    />
                    <span className="position-absolute top-0 start-0 bg-primary text-white px-2 py-1 small">
                      {product.brand}
                    </span>
                  </div>
                  <div className="card-body">
                    <h5 className="card-title">{product.name}</h5>
                    <p className="card-text">
                      <strong className="text-primary fs-4">{product.price.toFixed(2)} €</strong>
                    </p>
                  </div>
                  <div className="card-footer bg-white border-0">
                    <div className="d-grid gap-2">
                      <Link 
                        to={`/product/${product.id}`} 
                        className="btn btn-outline-primary"
                      >
                        <i className="bi bi-eye me-1"></i> Voir détails
                      </Link>
                      <button 
                        className="btn btn-primary"
                        onClick={() => addToCart(product)}
                      >
                        <i className="bi bi-cart-plus me-1"></i> Ajouter au panier
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-5">
            <i className="bi bi-search display-1 text-muted"></i>
            <h3 className="mt-3">Aucun produit trouvé</h3>
            <p className="text-muted">Essayez une autre recherche ou catégorie</p>
            <button className="btn btn-primary" onClick={clearFilters}>
              Voir toute la collection
            </button>
          </div>
        )}

        {/* Statistiques */}
        <div className="mt-5 pt-4 border-top">
          <div className="row text-center">
            <div className="col-md-4 mb-3">
              <div className="p-3 bg-light rounded">
                <i className="bi bi-truck display-6 text-primary mb-3"></i>
                <h5>Livraison Gratuite</h5>
                <p className="text-muted mb-0">À partir de 100€ d'achat</p>
              </div>
            </div>
            <div className="col-md-4 mb-3">
              <div className="p-3 bg-light rounded">
                <i className="bi bi-shield-check display-6 text-primary mb-3"></i>
                <h5>Garantie 2 ans</h5>
                <p className="text-muted mb-0">Sur tous nos produits</p>
              </div>
            </div>
            <div className="col-md-4 mb-3">
              <div className="p-3 bg-light rounded">
                <i className="bi bi-arrow-counterclockwise display-6 text-primary mb-3"></i>
                <h5>Retour Gratuit</h5>
                <p className="text-muted mb-0">Sous 30 jours</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      
    </div>
  );
};

export default ProductList;