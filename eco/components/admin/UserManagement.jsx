import React, { useState, useEffect } from 'react';
import { Table, Card, Button, Alert, Spinner, Badge } from 'react-bootstrap';
import { adminService } from "/src/services/Admin";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const response = await adminService.getUsers();
      setUsers(response.data);
    } catch (err) {
      setError('Erreur lors du chargement des utilisateurs');
    } finally {
      setLoading(false);
    }
  };

  const handleToggleUser = async (userId) => {
    try {
      await adminService.toggleUser(userId);
      loadUsers(); // Recharger la liste
    } catch (err) {
      setError('Erreur lors de la modification de l\'utilisateur');
    }
  };

  if (loading) {
    return (
      <div className="text-center py-5">
        <Spinner animation="border" role="status" />
      </div>
    );
  }

  return (
    <div>
      <h4 className="mb-4">Gestion des Utilisateurs</h4>

      {error && <Alert variant="danger">{error}</Alert>}

      <Card>
        <Card.Body>
          <Table responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nom</th>
                <th>Email</th>
                <th>Rôle</th>
                <th>Inscrit le</th>
                <th>Statut</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    <Badge bg={user.is_admin ? 'primary' : 'secondary'}>
                      {user.is_admin ? 'Admin' : 'Utilisateur'}
                    </Badge>
                  </td>
                  <td>{new Date(user.created_at).toLocaleDateString()}</td>
                  <td>
                    <Badge bg={user.is_active ? 'success' : 'danger'}>
                      {user.is_active ? 'Actif' : 'Inactif'}
                    </Badge>
                  </td>
                  <td>
                    <Button
                      variant={user.is_active ? 'outline-danger' : 'outline-success'}
                      size="sm"
                      onClick={() => handleToggleUser(user.id)}
                    >
                      {user.is_active ? 'Désactiver' : 'Activer'}
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          {users.length === 0 && (
            <p className="text-center text-muted">Aucun utilisateur trouvé</p>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

export default UserManagement;