import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cartItemsCount, setCartItemsCount] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    setIsLoggedIn(!!token);
    
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCartItemsCount(cart.length);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    window.location.href = '/';
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          <span className="logo-icon">⌚</span>
          TimeLux
        </Link>

        <div className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
          <Link to="/" className="nav-link" onClick={() => setIsMenuOpen(false)}>
            Accueil
          </Link>
          <div className="nav-dropdown">
            <span className="nav-link">Montres</span>
            <div className="dropdown-content">
              <Link to="/montres/homme" onClick={() => setIsMenuOpen(false)}>Homme</Link>
              <Link to="/montres/femme" onClick={() => setIsMenuOpen(false)}>Femme</Link>
              <Link to="/montres/sport" onClick={() => setIsMenuOpen(false)}>Sport</Link>
              <Link to="/montres/luxe" onClick={() => setIsMenuOpen(false)}>Luxe</Link>
            </div>
          </div>
          <Link to="/nouveautes" className="nav-link" onClick={() => setIsMenuOpen(false)}>
            Nouveautés
          </Link>
          <Link to="/promotions" className="nav-link" onClick={() => setIsMenuOpen(false)}>
            Promotions
          </Link>
        </div>

        <div className="nav-actions">
          <div className="user-actions">
            {isLoggedIn ? (
              <div className="user-dropdown">
                <button className="user-btn">
                  👤 Mon compte
                </button>
                <div className="dropdown-content">
                  <Link to="/mon-compte">Profil</Link>
                  <Link to="/mes-commandes">Mes commandes</Link>
                  <button onClick={handleLogout}>Déconnexion</button>
                </div>
              </div>
            ) : (
              <div className="auth-buttons">
                <Link to="/connexion" className="login-btn">Connexion</Link>
                <Link to="/inscription" className="register-btn">Inscription</Link>
              </div>
            )}

            <Link to="/panier" className="cart-btn">
              🛒
              {cartItemsCount > 0 && (
                <span className="cart-badge">{cartItemsCount}</span>
              )}
            </Link>
          </div>

          <button className="mobile-menu-btn" onClick={toggleMenu}>
            {isMenuOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;