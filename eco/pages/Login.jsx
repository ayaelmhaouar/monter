import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '/src/services/Auth'
import { Form, Button, Alert, Container, Row, Col, Card } from 'react-bootstrap';

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await authService.login(form.email, form.password);

    if (response.success) {
      localStorage.setItem('token', response.data.access_token);
      navigate('/checkout'); // Redirige après connexion
    } else {
      setError(response.error);
    }
  };

  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <Card>
            <Card.Body>
              <h3 className="mb-4">Connexion</h3>
              {error && <Alert variant="danger">{error}</Alert>}
              <Form onSubmit={handleSubmit}>
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
                <Button type="submit" variant="primary" className="w-100">
                  Se connecter
                </Button>
              </Form>
              <div className="mt-3 text-center">
                <small>Pas encore de compte ? <a href="/register">S’inscrire</a></small>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
