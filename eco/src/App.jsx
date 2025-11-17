// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from '../pages/Home';
import Products from '../pages/Products';
import ProductDetail from '../pages/ProductDetail';
import Cart from '../pages/Cart';
import Login from '../pages/Login';
import Register from '../pages/Register';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <main style={{ marginTop: '80px' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/montres" element={<Products />} />
            <Route path="/montres/:category" element={<Products />} />
            <Route path="/produit/:id" element={<ProductDetail />} />
            <Route path="/panier" element={<Cart />} />
            <Route path="/connexion" element={<Login />} />
            <Route path="/inscription" element={<Register />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;