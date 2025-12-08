import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { AuthProvider } from '../context/AuthContext';
import { CartProvider } from '../context/CartContext';

import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import Contact from '../components/contact/Contact';

import Home from '../pages/Home';
import Products from '../pages/Products';
import Register from '../pages/Register';
import Login from '../pages/Login';
import ProductDetail from '../pages/ProductDetail';


import Cart from '../components/cart/Cart';
import Checkout from '../components/orders/Checkout';



import ProductList from '../components/products/ProductList';


// Admin Components
import AdminLayout from '../components/admin/AdminLayout';
import Dashboard from '../components/admin/Dashboard';
import ProductManagement from '../components/admin/ProductManagement';
import OrderManagement from '../components/admin/OrderManagement';
import UserManagement from '../components/admin/UserManagement';
import ContactManagement from '../components/admin/ContactManagement';

import 'bootstrap/dist/css/bootstrap.min.css';
import "../styles/App.css";

function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <div className="App d-flex flex-column min-vh-100">

            <Navbar />

            <div className="flex-grow-1">
              <Routes>

                {/* Public Routes */}
                 
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<Products />} />
               <Route path="/montres/:category" element={<Products />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/contact" element={<Contact />} />

                {/* Admin Routes */}
                <Route path="/admin" element={<AdminLayout />}>
                  <Route path="dashboard" element={<Dashboard />} />
                  <Route path="products" element={<ProductManagement />} />
                  <Route path="orders" element={<OrderManagement />} />
                  <Route path="users" element={<UserManagement />} />
                  <Route path="messages" element={<ContactManagement />} />
                </Route>

              </Routes>
            </div>

            <Footer />

          </div>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
