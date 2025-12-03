import React, { useState, useEffect } from 'react';
import { Table, Card, Badge, Alert, Spinner, Form } from 'react-bootstrap';
import { adminService } from "/src/services/Admin";

const ContactManagement = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadContacts();
  }, []);

  const loadContacts = async () => {
    try {
      const response = await adminService.getContacts();
      setContacts(response.data);
    } catch (err) {
      setError('Erreur lors du chargement des messages');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (contactId, newStatus) => {
    try {
      await adminService.updateContactStatus(contactId, { status: newStatus });
      loadContacts(); // Recharger les messages
    } catch (err) {
      setError('Erreur lors de la mise à jour du statut');
    }
  };

  const getStatusVariant = (status) => {
    switch (status) {
      case 'resolved': return 'success';
      case 'in_progress': return 'warning';
      case 'new': return 'info';
      default: return 'secondary';
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
      <h4 className="mb-4">Gestion des Messages</h4>

      {error && <Alert variant="danger">{error}</Alert>}

      <Card>
        <Card.Body>
          <Table responsive>
            <thead>
              <tr>
                <th>Nom</th>
                <th>Email</th>
                <th>Sujet</th>
                <th>Message</th>
                <th>Date</th>
                <th>Statut</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map(contact => (
                <tr key={contact.id}>
                  <td>{contact.name}</td>
                  <td>{contact.email}</td>
                  <td>{contact.subject}</td>
                  <td>
                    <div style={{ maxWidth: '200px' }}>
                      {contact.message.substring(0, 50)}...
                    </div>
                  </td>
                  <td>{new Date(contact.created_at).toLocaleDateString()}</td>
                  <td>
                    <Badge bg={getStatusVariant(contact.status)}>
                      {contact.status}
                    </Badge>
                  </td>
                  <td>
                    <Form.Select
                      size="sm"
                      value={contact.status}
                      onChange={(e) => handleStatusChange(contact.id, e.target.value)}
                      style={{ width: 'auto' }}
                    >
                      <option value="new">Nouveau</option>
                      <option value="in_progress">En cours</option>
                      <option value="resolved">Résolu</option>
                    </Form.Select>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          {contacts.length === 0 && (
            <p className="text-center text-muted">Aucun message trouvé</p>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

export default ContactManagement;