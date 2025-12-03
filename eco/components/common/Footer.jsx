import React from 'react';
import { Container, Row, Col, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark text-light mt-5">
      <Container className="py-5">
        <Row>
          {/* Brand & Description */}
          <Col lg={4} md={6} className="mb-4">
            <h5 className="fw-bold mb-3">🕐 MontresShop</h5>
            <p className="text-muted">
              Découvrez notre collection exclusive de montres pour homme, femme et sport. 
              Qualité, élégance et précision dans chaque modèle.
            </p>
            <div className="social-links mt-4">
              <a href="#" className="text-light me-3" aria-label="Facebook">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="text-light me-3" aria-label="Instagram">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="text-light me-3" aria-label="Twitter">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="text-light" aria-label="LinkedIn">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
          </Col>

          {/* Liens rapides */}
          <Col lg={2} md={6} className="mb-4">
            <h6 className="fw-bold mb-3">Navigation</h6>
            <Nav className="flex-column">
              <Nav.Link as={Link} to="/" className="text-muted px-0 py-1">
                Accueil
              </Nav.Link>
              <Nav.Link as={Link} to="/products" className="text-muted px-0 py-1">
                Boutique
              </Nav.Link>
              <Nav.Link as={Link} to="/products?category=homme" className="text-muted px-0 py-1">
                Montres Homme
              </Nav.Link>
              <Nav.Link as={Link} to="/products?category=femme" className="text-muted px-0 py-1">
                Montres Femme
              </Nav.Link>
              <Nav.Link as={Link} to="/products?category=sport" className="text-muted px-0 py-1">
                Montres Sport
              </Nav.Link>
            </Nav>
          </Col>

          {/* Service client */}
          <Col lg={2} md={6} className="mb-4">
            <h6 className="fw-bold mb-3">Service Client</h6>
            <Nav className="flex-column">
              <Nav.Link as={Link} to="/contact" className="text-muted px-0 py-1">
                Contact
              </Nav.Link>
              <Nav.Link href="#" className="text-muted px-0 py-1">
                Livraison & Retours
              </Nav.Link>
              <Nav.Link href="#" className="text-muted px-0 py-1">
                Guide des tailles
              </Nav.Link>
              <Nav.Link href="#" className="text-muted px-0 py-1">
                FAQ
              </Nav.Link>
              <Nav.Link href="#" className="text-muted px-0 py-1">
                Conditions générales
              </Nav.Link>
            </Nav>
          </Col>

          {/* Contact & Info */}
          <Col lg={4} md={6} className="mb-4">
            <h6 className="fw-bold mb-3">Contact</h6>
            <div className="text-muted">
              <p className="mb-2">
                <i className="fas fa-map-marker-alt me-2"></i>
                123 Avenue des Montres, 75001 Paris
              </p>
              <p className="mb-2">
                <i className="fas fa-phone me-2"></i>
                +33 1 23 45 67 89
              </p>
              <p className="mb-2">
                <i className="fas fa-envelope me-2"></i>
                contact@montresshop.com
              </p>
              <p className="mb-0">
                <i className="fas fa-clock me-2"></i>
                Lun - Ven: 9h00 - 18h00
              </p>
            </div>

            {/* Newsletter */}
            <div className="mt-4">
              <h6 className="fw-bold mb-2">Newsletter</h6>
              <p className="text-muted small mb-2">
                Inscrivez-vous pour recevoir nos offres exclusives
              </p>
              <div className="input-group input-group-sm">
                <input 
                  type="email" 
                  className="form-control" 
                  placeholder="Votre email" 
                  aria-label="Email newsletter"
                />
                <button className="btn btn-primary" type="button">
                  S'inscrire
                </button>
              </div>
            </div>
          </Col>
        </Row>

        <hr className="my-4 border-secondary" />

        {/* Bottom footer */}
        <Row className="align-items-center">
          <Col md={6} className="text-center text-md-start">
            <p className="text-muted mb-0">
              &copy; {currentYear} MontresShop. Tous droits réservés.
            </p>
          </Col>
          <Col md={6} className="text-center text-md-end">
            <Nav className="justify-content-center justify-content-md-end">
              <Nav.Link href="#" className="text-muted px-2 small">
                Confidentialité
              </Nav.Link>
              <Nav.Link href="#" className="text-muted px-2 small">
                Cookies
              </Nav.Link>
              <Nav.Link href="#" className="text-muted px-2 small">
                Mentions légales
              </Nav.Link>
            </Nav>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;