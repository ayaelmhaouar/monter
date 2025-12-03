import React, { useState, useEffect } from 'react';
import { productService } from '../../services/products';
import ProductCard from "./ProductCard";
import { Container, Row, Col, Form, Spinner, Alert, InputGroup, Button, Card } from 'react-bootstrap';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [category, setCategory] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [showDebug, setShowDebug] = useState(false);

  useEffect(() => {
    loadProducts();
  }, []);

  useEffect(() => {
    filterAndSortProducts();
  }, [products, category, searchTerm, sortBy]);

  const loadProducts = async () => {
    try {
      setLoading(true);
      setError('');
      
      console.log('🔄 Début du chargement des produits...');
      const response = await productService.getAll();
      
      console.log('📦 Réponse du service:', response);
      
      if (response.success && response.data) {
        console.log(`✅ ${response.data.length} produits chargés`);
        setProducts(response.data);
        
        // Afficher les produits dans la console pour debug
        response.data.forEach((product, index) => {
          console.log(`📝 Produit ${index + 1}:`, {
            id: product.id,
            name: product.name,
            category: product.category,
            image: product.image,
            price: product.price,
            stock: product.stock
          });
        });
      } else {
        console.warn('⚠️ Réponse sans données:', response);
        setError(response.error || 'Aucune donnée reçue');
        // Charger les données mockées par sécurité
        setProducts([
          {
            id: 1,
            name: "Montre Homme Classique",
            description: "Montre élégante pour homme",
            price: 299.99,
            category: "homme",
            stock: 10
          }
        ]);
      }
    } catch (err) {
      console.error('❌ Erreur critique:', err);
      setError('Erreur de connexion au serveur');
      // Données minimales pour éviter l'écran vide
      setProducts([
        {
          id: 999,
          name: "Montre de démonstration",
          description: "Ceci est une démonstration - vos produits apparaîtront ici",
          price: 99.99,
          category: "homme",
          stock: 5
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const filterAndSortProducts = () => {
    let filtered = [...products];

    // Filtrage par catégorie
    if (category) {
      filtered = filtered.filter(product => 
        product.category === category
      );
    }

    // Filtrage par recherche
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Tri des produits
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-asc':
          return (a.price || 0) - (b.price || 0);
        case 'price-desc':
          return (b.price || 0) - (a.price || 0);
        case 'name':
          return (a.name || '').localeCompare(b.name || '');
        case 'stock':
          return (b.stock || 0) - (a.stock || 0);
        default:
          return 0;
      }
    });

    setFilteredProducts(filtered);
  };

  const clearFilters = () => {
    setCategory('');
    setSearchTerm('');
    setSortBy('name');
  };

  // Si chargement
  if (loading) {
    return (
      <Container className="my-5 py-5">
        <Row className="justify-content-center">
          <Col md={6} className="text-center">
            <Spinner animation="border" variant="primary" />
            <h4 className="mt-3">Chargement de notre collection...</h4>
            <p className="text-muted">
              Veuillez patienter pendant que nous préparons les meilleures montres pour vous.
            </p>
            <Button 
              variant="outline-primary" 
              onClick={loadProducts}
              className="mt-3"
            >
              Rafraîchir
            </Button>
          </Col>
        </Row>
      </Container>
    );
  }

  return (
    <Container className="my-5">
      {/* Debug panel (optionnel) */}
      {showDebug && (
        <Card className="mb-4 bg-light">
          <Card.Body>
            <Button 
              size="sm" 
              variant="outline-secondary" 
              onClick={() => setShowDebug(false)}
              className="float-end"
            >
              Cacher
            </Button>
            <h6>🔧 Debug Info</h6>
            <pre style={{ fontSize: '0.8rem' }}>
              {JSON.stringify({
                totalProducts: products.length,
                filteredProducts: filteredProducts.length,
                category,
                searchTerm,
                sortBy,
                productsSample: products.slice(0, 2)
              }, null, 2)}
            </pre>
          </Card.Body>
        </Card>
      )}

      {/* En-tête */}
      <Row className="mb-5">
        <Col className="text-center">
          <h1 className="display-5 fw-bold mb-3">Notre Collection de Montres</h1>
          <p className="lead text-muted mb-4">
            Découvrez notre sélection exclusive de montres raffinées
          </p>
        </Col>
      </Row>

      {/* Filtres */}
      <Row className="mb-4 g-3">
        <Col md={4}>
          <InputGroup>
            <InputGroup.Text>🔍</InputGroup.Text>
            <Form.Control
              type="text"
              placeholder="Rechercher une montre..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </InputGroup>
        </Col>
        
        <Col md={3}>
          <Form.Select 
            value={category} 
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Toutes les collections</option>
            <option value="homme">👔 Homme</option>
            <option value="femme">👗 Femme</option>
            <option value="sport">⚡ Sport</option>
          </Form.Select>
        </Col>

        <Col md={3}>
          <Form.Select 
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="name">Trier par nom</option>
            <option value="price-asc">Prix croissant</option>
            <option value="price-desc">Prix décroissant</option>
            <option value="stock">Disponibilité</option>
          </Form.Select>
        </Col>

        <Col md={2}>
          <div className="d-flex gap-2">
            <Button 
              variant="outline-secondary" 
              onClick={clearFilters}
              className="w-50"
            >
              🔄
            </Button>
            <Button 
              variant="outline-info" 
              onClick={() => setShowDebug(!showDebug)}
              className="w-50"
            >
              {showDebug ? '🔧' : '🐛'}
            </Button>
          </div>
        </Col>
      </Row>

      {/* Messages d'erreur */}
      {error && (
        <Alert variant="warning" className="mb-4">
          <Alert.Heading>Information</Alert.Heading>
          <p>{error}</p>
          <div className="d-flex justify-content-between">
            <Button 
              variant="outline-warning" 
              size="sm"
              onClick={loadProducts}
            >
              Réessayer
            </Button>
            <Button 
              variant="outline-info" 
              size="sm"
              onClick={() => window.open('http://localhost:8000/api/products', '_blank')}
            >
              Tester l'API
            </Button>
          </div>
        </Alert>
      )}

      {/* Résultats */}
      <Row className="mb-4">
        <Col>
          <div className="d-flex justify-content-between align-items-center">
            <p className="text-muted mb-0">
              <strong>{filteredProducts.length}</strong> produit{filteredProducts.length > 1 ? 's' : ''} trouvé{filteredProducts.length > 1 ? 's' : ''}
              {category && ` dans la catégorie "${category}"`}
              {searchTerm && ` pour "${searchTerm}"`}
            </p>
            
            {products.length === 0 && (
              <Button 
                variant="primary" 
                size="sm"
                onClick={loadProducts}
              >
                🔄 Charger les produits
              </Button>
            )}
          </div>
        </Col>
      </Row>

      {/* Affichage des produits */}
      {filteredProducts.length > 0 ? (
        <Row>
          {filteredProducts.map(product => (
            <Col key={product.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
              <ProductCard product={product} />
            </Col>
          ))}
        </Row>
      ) : (
        <div className="text-center py-5">
          <div style={{ fontSize: '5rem' }}>🔍</div>
          <h3 className="mt-3">Aucun produit trouvé</h3>
          
          {products.length === 0 ? (
            <>
              <p className="text-muted mb-4">
                La base de données semble vide ou inaccessible.
              </p>
              <div className="d-flex justify-content-center gap-3">
                <Button 
                  variant="primary"
                  onClick={loadProducts}
                >
                  Rafraîchir la page
                </Button>
                <Button 
                  variant="outline-secondary"
                  onClick={() => {
                    // Ajouter un produit test localement
                    setProducts([{
                      id: Date.now(),
                      name: "Montre Test",
                      description: "Ceci est un produit de test",
                      price: 99.99,
                      category: "homme",
                      stock: 1
                    }]);
                  }}
                >
                  Afficher un produit test
                </Button>
              </div>
            </>
          ) : (
            <>
              <p className="text-muted mb-4">
                Aucun produit ne correspond à vos critères de recherche.
              </p>
              <Button 
                variant="outline-primary"
                onClick={clearFilters}
              >
                Voir toute la collection ({products.length})
              </Button>
            </>
          )}
          
          {/* Conseils de dépannage */}
          <div className="mt-5 text-start">
            <h6>🛠️ Conseils de dépannage :</h6>
            <ul className="text-muted">
              <li>Vérifiez que votre serveur Laravel est démarré : <code>php artisan serve</code></li>
              <li>Testez l'API directement : <a href="http://localhost:8000/api/products" target="_blank">http://localhost:8000/api/products</a></li>
              <li>Vérifiez la console du navigateur pour les erreurs (F12)</li>
              <li>Assurez-vous que la table 'products' contient des données</li>
            </ul>
          </div>
        </div>
      )}
    </Container>
  );
};

export default ProductList;