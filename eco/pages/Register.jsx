// src/pages/Register.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Auth.css';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulation d'inscription
    console.log('Register attempt:', formData);
    
    // Ici vous intégrerez l'appel API Laravel
    localStorage.setItem('auth_token', 'fake-token');
    localStorage.setItem('user', JSON.stringify({ name: formData.name, email: formData.email }));
    
    alert('Inscription réussie !');
    window.location.href = '/';
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <h2>Inscription</h2>
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label>Nom complet</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
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
          <div className="form-group">
            <label>Confirmer le mot de passe</label>
            <input
              type="password"
              name="password_confirmation"
              value={formData.password_confirmation}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="auth-btn">
            S'inscrire
          </button>
        </form>
        <p className="auth-link">
          Déjà un compte ? <Link to="/connexion">Se connecter</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;