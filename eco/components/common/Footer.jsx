import React from "react";

const Footer = () => {
  return (
    <footer className="bg-dark text-white mt-5 py-4">
      <div className="container">
        <div className="row">

          {/* Colonne 1 */}
          <div className="col-md-4 mb-3">
            <h5 className="fw-bold">🕐 MontresShop</h5>
            <p className="text-light mb-0">
              Les plus belles montres pour tous les styles.
            </p>
          </div>

          {/* Colonne 2 */}
          <div className="col-md-4 mb-3">
            <h5 className="fw-bold">Contact</h5>
            <p className="mb-1"><i className="bi bi-telephone me-2"></i> 01 23 45 67 89</p>
            <p className="mb-1"><i className="bi bi-envelope me-2"></i> @montres.com</p>
            <p className="mb-0"><i className="bi bi-geo-alt me-2"></i> sidi ifni</p>
          </div>

          {/* Colonne 3 */}
          <div className="col-md-4 mb-3">
            <h5 className="fw-bold">Suivez-nous</h5>
            <div className="d-flex gap-3 fs-4">
              <a href="#" className="text-white"><i className="bi bi-facebook"></i></a>
              <a href="#" className="text-white"><i className="bi bi-instagram"></i></a>
              <a href="#" className="text-white"><i className="bi bi-twitter"></i></a>
              <a href="#" className="text-white"><i className="bi bi-youtube"></i></a>
            </div>
          </div>

        </div>

        {/* Bordure */}
        <div className="text-center pt-3 border-top mt-3">
          <small className="text-secondary">
            © {new Date().getFullYear()} 🕐 MontresShop— Tous droits réservés.
          </small>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
