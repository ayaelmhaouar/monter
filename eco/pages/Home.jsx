import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
  return (
    <div className="home">
   <section
  className="hero"
  style={{
    backgroundImage: "url('/hero.jpg')",
  }}
>
  <div className="hero-content">
    <h1 className="title-hero">
      MONTRE
    </h1>
    <p>Découvrez l'élégance du temps</p>
    <p>Des montres modernes, classiques et luxueuses pour tous les styles.</p>
    <Link to="/montres" className="cta-button">
      Découvrir la collection
    </Link>
  </div>
</section>

   <section className="about-simple">
  <div className="about-container">
    <h2>À propos de </h2>
    <p>
      est votre boutique en ligne dédiée aux montres élégantes et de qualité.
      Que vous cherchiez une montre classique, sportive ou luxueuse, nous avons la pièce parfaite pour vous.
      Notre mission : vous offrir style et fiabilité à chaque tic-tac.
    </p>
    <div className="about-features">
      <div className="feature-item">
        <div className="feature-icon">🕐</div>
        <h3>Précision</h3>
        <p>Des mouvements suisses de haute précision</p>
      </div>
      <div className="feature-item">
        <div className="feature-icon">💎</div>
        <h3>Qualité</h3>
        <p>Matériaux premium et finitions impeccables</p>
      </div>
      <div className="feature-item">
        <div className="feature-icon">🚚</div>
        <h3>Livraison</h3>
        <p>Livraison rapide et sécurisée partout</p>
      </div>
    </div>
  </div>
</section>

      {/* --- CATEGORIES --- */}
      <section className="categories">
        <h2>Nos Catégories</h2>

        <div className="categories-grid">
          {/* HOMME */}
          <Link to="/montres/homme" className="category-card">
            <div
              className="category-image"
              style={{
                backgroundImage: "url('/homme.jpg')",
              }}
            ></div>
            <h3>Montres Homme</h3>
          </Link>

          {/* FEMME */}
          <Link to="/montres/femme" className="category-card">
            <div
              className="category-image"
              style={{
                backgroundImage: "url('/Famme.jpg')",
              }}
            ></div>
            <h3>Montres Femme</h3>
          </Link>

          {/* SPORT */}
          <Link to="/montres/sport" className="category-card">
            <div
              className="category-image"
              style={{
                backgroundImage: "url(/sport.jpg')",
              }}
            ></div>
            <h3>Montres Sport</h3>
          </Link>
        </div>
      </section>

      {/* --- NEW ARRIVALS --- */}
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
