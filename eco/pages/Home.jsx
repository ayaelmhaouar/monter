import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { 
  FaClock, 
  FaShippingFast, 
  FaShieldAlt, 
  FaStar, 
  FaCheck,
  FaCreditCard,
  FaHeadset,
  FaTruck,
  FaChevronLeft,
  FaChevronRight
} from 'react-icons/fa';
import './Home.css';

const LandingPage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const menWatchesSlider = [
    {
      id: 1,name: "Montre Classique Homme",  price: 299.99, image: "/public/f.jpg", 
    },
    {
        id: 2 ,name: "Smartwatch Connectée", price: 399.99, image: "/public/sp.jpg"
    },
    
    {
       id: 9, name: "Montre Vintage Homme", price: 459.99, image: "/public/h1.jpg"
    }
  ];

  const featuredProducts = [
    {
      id: 1,
      name: "Montre Luxe Classique",
      price: "1 499€",
      image: "/public/w.jpg",
      category: "Homme"
    },
    {
      id: 2,
      name: "Montre Sport Pro",
      price: "899€",
      image: "/public/homme.jpg",
      category: "Sport"
    },
    {
      id: 3,
      name: "Montre Élégante Femme",
      price: "1 199€",
      image: "/public/h1.jpg",
      category: "Femme"
    }
  ];

  const features = [
    {
      icon: <FaShippingFast />,
      title: "Livraison Rapide",
      desc: "Livraison gratuite en 24-48h"
    },
    {
      icon: <FaShieldAlt />,
      title: "Garantie 2 ans",
      desc: "Garantie constructeur incluse"
    },
    {
      icon: <FaClock />,
      title: "Service Expert",
      desc: "Conseils personnalisés"
    },
    {
      icon: <FaCreditCard />,
      title: "Paiement Sécurisé",
      desc: "3x sans frais possible"
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === menWatchesSlider.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? menWatchesSlider.length - 1 : prev - 1));
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  // Auto slide
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, [currentSlide]);

  return (
    <div className="landing-page">
      {/* Hero Section avec Slider */}
      <section className="hero-section">
        <div className="hero-overlay">
          <Container>
            <Row className="align-items-center min-vh-100">
              <Col lg={6} className="hero-content">
                <h1 className="hero-title">
                  L'Élégance du Temps,<br />
                  <span className="highlight">À Votre Poignet</span>
                </h1>
                <p className="hero-subtitle">
                  Découvrez notre collection exclusive de montres de luxe.
                </p>
                <div className="hero-buttons">
                  <Button as={Link} to="/products" className="btn-primary-custom">
                    Découvrir la Collection
                  </Button>
                 
                </div>
              </Col>
              
              <Col lg={6} className="hero-slider-col">
                <div className="men-watches-slider">
                  <div className="slider-container">
                    <div className="slides-wrapper">
                      {menWatchesSlider.map((slide, index) => (
                        <div 
                          key={slide.id} 
                          className={`slide ${index === currentSlide ? 'active' : ''}`}
                        >
                          <img src={slide.image} alt={slide.title} className="slider-image" />
                          <div className="slide-title">{slide.title}</div>
                        </div>
                      ))}
                    </div>
                    
                    {/* Navigation buttons */}
                    <button className="slider-prev" onClick={prevSlide}>
                      <FaChevronLeft />
                    </button>
                    <button className="slider-next" onClick={nextSlide}>
                      <FaChevronRight />
                    </button>
                    
                    {/* Dots indicator */}
                    <div className="slider-dots">
                      {menWatchesSlider.map((_, index) => (
                        <button
                          key={index}
                          className={`dot ${index === currentSlide ? 'active' : ''}`}
                          onClick={() => goToSlide(index)}
                        />
                      ))}
                    </div>
                  </div>
                  
                  <div className="slider-caption">
                    <h4>Nouvelle Collection </h4>
                    <p>Montres élégantes  modernes</p>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <Container>
          <Row className="text-center mb-5">
            <Col>
              <h2 className="section-title">Pourquoi Choisir MontresShop ?</h2>
              <p className="section-subtitle">Excellence et expertise depuis 1995</p>
            </Col>
          </Row>
          <Row>
            {features.map((feature, index) => (
              <Col md={3} sm={6} key={index} className="mb-4">
                <div className="feature-card">
                  <div className="feature-icon">{feature.icon}</div>
                  <h4 className="feature-title">{feature.title}</h4>
                  <p className="feature-desc">{feature.desc}</p>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Featured Products */}
      <section className="products-section">
        <Container>
          <Row className="text-center mb-5">
            <Col>
              <h2 className="section-title">Nos Modèles Phares</h2>
              <p className="section-subtitle">Découvrez les best-sellers de la saison</p>
            </Col>
          </Row>
          <Row>
            {featuredProducts.map((product) => (
              <Col lg={4} md={6} key={product.id} className="mb-4">
                <Card className="product-card">
                  <div className="product-badge">{product.category}</div>
                  <Card.Img variant="top" src={product.image} className="product-image" />
                  <Card.Body className="text-center">
                    <Card.Title className="product-name">{product.name}</Card.Title>
                    <Card.Text className="product-price">{product.price}</Card.Text>
                   
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
          <Row className="text-center mt-4">
            <Col>
              <Button as={Link} to="/products" className="btn-primary-custom btn-large">
                Voir Toute la Collection
              </Button>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default LandingPage;