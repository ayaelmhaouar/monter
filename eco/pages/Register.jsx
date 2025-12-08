import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { Form, Button, Card, Alert, Container, Row, Col } from "react-bootstrap";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (password !== passwordConfirmation) {
      setError("Les mots de passe ne correspondent pas");
      setLoading(false);
      return;
    }

    const result = await register({
      name,
      email,
      password,
      password_confirmation: passwordConfirmation
    });

    if (result.success) {
      navigate("/");
    } else {
      setError(result.error);
    }

    setLoading(false);
  }

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6} lg={4}>
          <Card>
            <Card.Body>
              <h2 className="text-center mb-4">Inscription</h2>
{/* Si error n’est pas vide → afficher un message rouge. */}
              {error && <Alert variant="danger">{error}</Alert>}

              <Form onSubmit={handleSubmit}>

                <Form.Group className="mb-3">
                  <Form.Label>Nom complet</Form.Label>
                  <Form.Control
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Entrez votre nom"
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Entrez votre email"
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Mot de passe</Form.Label>
                  <Form.Control
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Entrez votre mot de passe"
                  />
                </Form.Group>

                {password.length > 0 && password.length < 4 && (
                  <Alert variant="warning" className="py-1">
                    Le mot de passe doit contenir au moins 4 caractères
                  </Alert>
                )}

                <Form.Group className="mb-3">
                  <Form.Label>Confirmation du mot de passe</Form.Label>
                  <Form.Control
                    type="password"
                    required
                    value={passwordConfirmation}
                    onChange={(e) => setPasswordConfirmation(e.target.value)}
                    placeholder="Confirmez votre mot de passe"
                  />
                </Form.Group>

                {passwordConfirmation.length > 0 &&
                  password !== passwordConfirmation && (
                    <Alert variant="warning" className="py-1">
                      La confirmation ne correspond pas
                    </Alert>
                )}

                <Button
                  variant="primary"
                  type="submit"
                  className="w-100"
                  disabled={loading}
                >
                  {loading ? "Inscription..." : "S'inscrire"}
                </Button>
              </Form>

              <div className="text-center mt-3">
                <Link to="/login">Déjà un compte ? Se connecter</Link>
              </div>

            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
