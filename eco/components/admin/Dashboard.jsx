import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Card, Table, Spinner, Alert } from 'react-bootstrap';
import { adminService } from '/src/services/Admin';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      const [statsData, ordersData] = await Promise.all([
        adminService.getDashboardStats(),
        adminService.getRecentOrders()
      ]);

      setStats(statsData.data);
      setRecentOrders(ordersData.data);
    } catch (err) {
      setError('Erreur lors du chargement des données');
      console.error('Dashboard error:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Chargement...</span>
        </Spinner>
      </div>
    );
  }

  return (
    <div>
      {error && <Alert variant="danger">{error}</Alert>}

      {/* Statistics Cards */}
      <Row className="mb-4">
        <Col md={3} className="mb-3">
          <Card className="stat-card">
            <Card.Body>
              <div className="d-flex justify-content-between">
                <div>
                  <Card.Title className="text-primary">{stats?.total_orders || 0}</Card.Title>
                  <Card.Text>Commandes</Card.Text>
                </div>
                <div className="stat-icon">📦</div>
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col md={3} className="mb-3">
          <Card className="stat-card">
            <Card.Body>
              <div className="d-flex justify-content-between">
                <div>
                  <Card.Title className="text-success">{stats?.total_products || 0}</Card.Title>
                  <Card.Text>Produits</Card.Text>
                </div>
                <div className="stat-icon">🛍️</div>
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col md={3} className="mb-3">
          <Card className="stat-card">
            <Card.Body>
              <div className="d-flex justify-content-between">
                <div>
                  <Card.Title className="text-info">{stats?.total_users || 0}</Card.Title>
                  <Card.Text>Utilisateurs</Card.Text>
                </div>
                <div className="stat-icon">👥</div>
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col md={3} className="mb-3">
          <Card className="stat-card">
            <Card.Body>
              <div className="d-flex justify-content-between">
                <div>
                  <Card.Title className="text-warning">{stats?.total_revenue || 0} €</Card.Title>
                  <Card.Text>Chiffre d'affaires</Card.Text>
                </div>
                <div className="stat-icon">💰</div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Recent Orders */}
      <Row>
        <Col>
          <Card>
            <Card.Header>
              <h5 className="mb-0">Commandes récentes</h5>
            </Card.Header>
            <Card.Body>
              {recentOrders.length > 0 ? (
                <Table responsive>
                  <thead>
                    <tr>
                      <th>N° Commande</th>
                      <th>Client</th>
                      <th>Date</th>
                      <th>Montant</th>
                      <th>Statut</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentOrders.map(order => (
                      <tr key={order.id}>
                        <td>
                          <Link to={`/admin/orders/${order.id}`}>
                            #{order.id}
                          </Link>
                        </td>
                        <td>{order.user?.name || 'N/A'}</td>
                        <td>{new Date(order.created_at).toLocaleDateString()}</td>
                        <td>{order.total_amount} €</td>
                        <td>
                          <span className={`badge bg-${getStatusVariant(order.status)}`}>
                            {order.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              ) : (
                <p className="text-center text-muted">Aucune commande récente</p>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

const getStatusVariant = (status) => {
  switch (status) {
    case 'delivered': return 'success';
    case 'shipped': return 'info';
    case 'processing': return 'warning';
    case 'pending': return 'secondary';
    case 'cancelled': return 'danger';
    default: return 'secondary';
  }
};

export default Dashboard;