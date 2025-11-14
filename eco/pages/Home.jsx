import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home">
      <section className="hero">
        <div className="hero-content">
          <h1>TimeLux - L'Excellence Horlogère</h1>
          <p>Découvrez notre collection exclusive de montres de luxe</p>
          <Link to="/montres" className="cta-button">
            Découvrir la collection
          </Link>
        </div>
      </section>

      <section className="categories">
        <h2>Nos Catégories</h2>
        <div className="categories-grid">
          <Link to="/montres/homme" className="category-card">
            <div className="category-image homme">⌚</div>
            <h3>Montres Homme</h3>
          </Link>
          <Link to="/montres/femme" className="category-card">
            <div className="category-image femme">⌚</div>
            <h3>Montres Femme</h3>
          </Link>
          <Link to="/montres/sport" className="category-card">
            <div className="category-image sport">⌚</div>
            <h3>Montres Sport</h3>
          </Link>
          <Link to="/montres/luxe" className="category-card">
            <div className="category-image luxe">⌚</div>
            <h3>Montres de Luxe</h3>
          </Link>
        </div>
      </section>

      <section className="new-arrivals">
        <h2>Nouveautés</h2>
        <div className="products-grid">
          <div className="product-placeholder">
            <p>Nouveaux modèles à venir...</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;