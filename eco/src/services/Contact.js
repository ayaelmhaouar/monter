import api from '/src/services/Api';

export const contactService = {
  // Envoyer un message de contact
  send: async (contactData) => {
    try {
      const response = await api.post('/contact', contactData);
      return { 
        success: true, 
        data: response.data.data || response.data,
        message: response.data.message || 'Message envoyé avec succès'
      };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Erreur d\'envoi du message',
        errors: error.response?.data?.errors || null
      };
    }
  },

  // Récupérer les messages de contact (admin)
  getAll: async () => {
    try {
      const response = await api.get('/admin/contacts');
      return { 
        success: true, 
        data: response.data.data || response.data 
      };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Erreur de chargement des messages' 
      };
    }
  },

  // Mettre à jour le statut d'un message (admin)
  updateStatus: async (id, statusData) => {
    try {
      const response = await api.put(`/admin/contacts/${id}/status`, statusData);
      return { 
        success: true, 
        data: response.data.data || response.data 
      };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Erreur de mise à jour du statut' 
      };
    }
  },

  // Supprimer un message (admin)
  delete: async (id) => {
    try {
      const response = await api.delete(`/admin/contacts/${id}`);
      return { 
        success: true, 
        data: response.data 
      };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Erreur de suppression du message' 
      };
    }
  }
};