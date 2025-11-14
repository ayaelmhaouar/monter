// src/pages/Login.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Auth.css';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulation de connexion
    console.log('Login attempt:', formData);
    
    // Ici vous intégrerez l'appel API Laravel
    localStorage.setItem('auth_token', 'fake-token');
    localStorage.setItem('user', JSON.stringify({ name: 'Utilisateur', email: formData.email }));
    
    alert('Connexion réussie !');
    window.location.href = '/';
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <h2>Connexion</h2>
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Mot de passe</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="auth-btn">
            Se connecter
          </button>
        </form>
        <p className="auth-link">
          Pas de compte ? <Link to="/inscription">S'inscrire</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;