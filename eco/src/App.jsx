
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from '../src/Components/Navbar';
import Home from '../pages/Home';
import Products from '../pages/Products';
import Cart from '../pages/Cart';jjjjjj
import Login from '../pages/Login';
import Register from '../pages/Register';
import { AuthProvider } from '../context/AuthContext';
// import ErrorBoundary from '../components/ErrorBoundary';
import './App.css';

function App() {
  return (
    // <ErrorBoundary>
      <Router>
        <AuthProvider>
          <div className="App">
            <Navbar />
            <main style={{ marginTop: '80px' }}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/montres" element={<Products />} />
                <Route path="/montres/:category" element={<Products />} />
                <Route path="/panier" element={<Cart />} />
                <Route path="/connexion" element={<Login />} />
                <Route path="/inscription" element={<Register />} />
                <Route path="/nouveautes" element={<Products />} />
                <Route path="/promotions" element={<Products />} />
              </Routes>
            </main>
          </div>
        </AuthProvider>
      </Router>
    {/* </ErrorBoundary> */}
  );
}

export default App;
