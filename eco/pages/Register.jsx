import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { authService } from '/src/services/Auth'

import { Form, Button, Alert, Card, Container, Row, Col } from 'react-bootstrap';

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Mettre à jour les champs du formulaire
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Soumettre le formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (form.password !== form.password_confirmation) {
      setError("Les mots de passe ne correspondent pas !");
      return;
    }

    const response = await authService.register(form);

    if (response.success) {
      setSuccess("Inscription réussie ! Vous êtes maintenant connecté.");
      localStorage.setItem('token', response.data.access_token);
      navigate('/checkout'); // redirige après inscription
    } else {
      setError(response.error || 'Erreur lors de l’inscription');
    }
  };

  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <Card>
            <Card.Body>
              <h3 className="mb-4">Créer un compte</h3>

              {error && <Alert variant="danger">{error}</Alert>}
              {success && <Alert variant="success">{success}</Alert>}

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Nom complet</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Mot de passe</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Confirmation du mot de passe</Form.Label>
                  <Form.Control
                    type="password"
                    name="password_confirmation"
                    value={form.password_confirmation}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Button type="submit" variant="primary" className="w-100">
                  S'inscrire
                </Button>
              </Form>

              <div className="mt-3 text-center">
                <small>
                  Déjà un compte ? <a href="/login">Connectez-vous</a>
                </small>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
