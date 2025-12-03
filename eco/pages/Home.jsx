import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-dark text-white py-5">
        <Container>
          <Row className="align-items-center min-vh-50">
            <Col md={6}>
              <h1 className="display-4 fw-bold mb-4">Montres d'Exception</h1>
              <p className="lead mb-4">
                Découvrez notre collection exclusive de montres pour homme, femme et sport. 
                Élégance, précision et style dans chaque modèle.
              </p>
              <div className="d-flex flex-wrap gap-3">
                <Button as={Link} to="/products" variant="primary" size="lg">
                  Découvrir toute la collection
                </Button>
                <Button as={Link} to="/products?category=homme" variant="outline-light" size="lg">
                  Voir Homme
                </Button>
              </div>
            </Col>
            <Col md={6} className="text-center">
              <img 
                src="https://images.unsplash.com/photo-1547996160-81dfd9c4b1b3?w=600&h=400&fit=crop" 
                alt="Montre de luxe" 
                className="img-fluid rounded shadow"
                style={{ maxHeight: '400px' }}
              />
            </Col>
          </Row>
        </Container>
      </section>

      {/* Catégories */}
      <Container className="my-5">
        <Row className="text-center mb-5">
          <Col>
            <h2>Nos Collections Exclusives</h2>
            <p className="text-muted">Choisissez la montre qui vous correspond</p>
          </Col>
        </Row>

        <Row>
          <Col md={4} className="mb-4">
            <Card className="h-100 text-center border-0 shadow-sm">
              <Card.Body className="p-4">
                <div className="mb-3" style={{ fontSize: '3rem' }}>👔</div>
                <Card.Title>Collection Homme</Card.Title>
                <Card.Text className="text-muted">
                  Montres élégantes et sophistiquées pour les hommes modernes. 
                  Design classique et matériaux premium.
                </Card.Text>
                <Button as={Link} to="/products?category=homme" variant="outline-primary">
                  Explorer →
                </Button>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4} className="mb-4">
            <Card className="h-100 text-center border-0 shadow-sm">
              <Card.Body className="p-4">
                <div className="mb-3" style={{ fontSize: '3rem' }}>👗</div>
                <Card.Title>Collection Femme</Card.Title>
                <Card.Text className="text-muted">
                  Montres raffinées et délicates pour les femmes élégantes. 
                  Lignes épurées et finitions précieuses.
                </Card.Text>
                <Button as={Link} to="/products?category=femme" variant="outline-primary">
                  Explorer →
                </Button>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4} className="mb-4">
            <Card className="h-100 text-center border-0 shadow-sm">
              <Card.Body className="p-4">
                <div className="mb-3" style={{ fontSize: '3rem' }}>⚡</div>
                <Card.Title>Collection Sport</Card.Title>
                <Card.Text className="text-muted">
                  Montres robustes et fonctionnelles pour les activités sportives. 
                  Résistance et performance garanties.
                </Card.Text>
                <Button as={Link} to="/products?category=sport" variant="outline-primary">
                  Explorer →
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Home;