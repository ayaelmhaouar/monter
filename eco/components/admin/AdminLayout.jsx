import React, { useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Container, Row, Col, Nav, Card, Button } from 'react-bootstrap';

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  // Vérifier si l'utilisateur est admin
  if (!user || !user.is_admin) {
    return (
      <Container className="my-5">
        <Card className="text-center">
          <Card.Body>
            <h3>Accès refusé</h3>
            <p>Vous n'avez pas les permissions nécessaires pour accéder à cette page.</p>
            <Button onClick={() => navigate('/')}>Retour à l'accueil</Button>
          </Card.Body>
        </Card>
      </Container>
    );
  }

  const menuItems = [
    { path: '/admin', label: 'Dashboard', icon: '📊' },
    { path: '/admin/products', label: 'Produits', icon: '🛍️' },
    { path: '/admin/orders', label: 'Commandes', icon: '📦' },
    { path: '/admin/users', label: 'Utilisateurs', icon: '👥' },
    { path: '/admin/contacts', label: 'Messages', icon: '✉️' }
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <div className={`admin-sidebar ${sidebarOpen ? 'open' : 'closed'}`}>
        <div className="sidebar-header">
          <h5>🛠️ Administration</h5>
          <button 
            className="sidebar-toggle"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? '◀' : '▶'}
          </button>
        </div>
        
        <Nav className="flex-column">
          {menuItems.map(item => (
            <Nav.Link
              key={item.path}
              as={Link}
              to={item.path}
              className={location.pathname === item.path ? 'active' : ''}
            >
              <span className="menu-icon">{item.icon}</span>
              {sidebarOpen && <span className="menu-label">{item.label}</span>}
            </Nav.Link>
          ))}
        </Nav>

        <div className="sidebar-footer">
          <Button 
            variant="outline-danger" 
            size="sm" 
            onClick={handleLogout}
            className="w-100"
          >
            {sidebarOpen ? 'Déconnexion' : '🚪'}
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className={`admin-content ${sidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
        <div className="admin-header">
          <h4>Administration - {menuItems.find(item => item.path === location.pathname)?.label || 'Dashboard'}</h4>
          <div className="user-info">
            <span>👤 {user.name}</span>
          </div>
        </div>
        
        <div className="admin-main">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;