
import React from "react";
import { useParams, Link } from "react-router-dom";

// Utilise les mêmes produits que dans ProductList
const allProducts = [
  {
      id: 1,name: "Montre Classique Homme",  price: 299.99, image: "/public/f.jpg", category: "femme",brand: "TimeLux"
    },
    {
      id: 2,name: "Montre Élégante Femme",price: 249.99, image: "/public/men.jpg", category: "homme", brand: "Elegance"
    },
    {
      id: 3,name: "Montre Sport Étanche",price: 199.99, image: "/public/s.jpg",category: "sport",brand: "AquaSport"
    },
    {
      id: 4, name: "Montre de Luxe Or",price: 8999.99,image: "/public/feem.jpg",  category: "homme",brand: "Rolex"
    },
    {
      id: 5,name: "Smartwatch Connectée", price: 399.99, image: "/public/sp.jpg",category: "sport",brand: "TimeLux"
    },
    {
      id: 6,  name: "Montre Business", price: 389.99,  image: "/public/w.jpg",category: "homme", brand: "Executive"
    },
    {
      id: 7, name: "Montre Rose Or Femme", price: 349.99,image: "/public/hom.jpg",category: "femme", brand: "RoseGold"
    },
    {
      id: 8, name: "Chronographe Running",price: 289.99,   image: "/public/sportt.jpg", category: "sport",brand: "RunPro"
    },
    {
      id: 9, name: "Montre Vintage Homme", price: 459.99, image: "/public/h1.jpg",category: "homme",brand: "VintageCo"
    },
    {
      id: 10, name: "Montre Diamant Femme", price: 1299.99, image: "/public/f1.jpg", category: "femme",brand: "Diamond"
    },
    {
      id: 11,name: "Montre Fitness GPS",price: 229.99,image: "/public/s1.jpg",category: "sport",brand: "FitTech"
    },
    {
      id: 12,  name: "Montre Cuir Homme",  price: 179.99, image: "/public/h1.jpg",category: "homme",brand: "LeatherStyle"
    }
];


const ProductDetail = () => {
  const { id } = useParams();
  const product = allProducts.find((p) => p.id === parseInt(id));

  // Fonction d'ajout au panier
  const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const existing = cart.find((item) => item.id === product.id);

    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Produit ajouté au panier !");
  };

  if (!product) {
    return (
      <div className="container text-center my-5">
        <h2>Produit introuvable</h2>
        <Link to="/" className="btn btn-primary mt-3">Retour</Link>
      </div>
    );
  }

  

  return (
    <div className="container py-5">

      {/* Détails du produit */}
      <div className="row g-4">

        {/* Image */}
        <div className="col-md-6">
          <img 
            src={product.image} 
            alt={product.name}
            className="img-fluid rounded shadow"
          />
        </div>

        {/* Infos texte */}
        <div className="col-md-6">
          <h2>{product.name}</h2>
          <h4 className="text-primary">{product.price} €</h4>

          <p className="mt-3"><strong>Marque :</strong> {product.brand}</p>
          <p><strong>Catégorie :</strong> {product.category}</p>

          {/* Description + note */}
          <p className="mt-4">
            Cette montre est conçue pour offrir un équilibre parfait entre style et performance.
            Idéale pour un usage quotidien, elle combine élégance et robustesse.
          </p>

          <div className="text-warning mb-2" style={{ fontSize: "22px" }}>
            ⭐⭐⭐⭐☆
          </div>

          {/* Caractéristiques */}
          <ul className="list-group mb-4">
            <li className="list-group-item">✔ Garantie : 2 ans</li>
            <li className="list-group-item">✔ Étanchéité : 30m</li>
            <li className="list-group-item">✔ Bracelet : Cuir / Silicone</li>
            <li className="list-group-item">✔ Livraison rapide 48h</li>
          </ul>

          {/* Boutons */}
          <button className="btn btn-primary btn-lg w-100" onClick={addToCart}>
            <i className="bi bi-cart-plus me-2"></i> Ajouter au panier
          </button>

          <Link to="/" className="btn btn-outline-secondary w-100 mt-3">
            Retour aux produits
          </Link>
        </div>
      </div>

        </div>
     
  );
};
export default ProductDetail;
