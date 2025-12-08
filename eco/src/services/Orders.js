import api from '/src/services/Api';

export const orderService = {
  create: async (orderData) => {
    try {
      const response = await api.post('/api/orders', orderData);
      return { success: true, data: response.data };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Erreur de création de commande' 
      };
    }
  },

  getAll: async () => {
    try {
      const response = await api.get('/api/orders');
      return { success: true, data: response.data };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Erreur de chargement des commandes' 
      };
    }
  },

  getById: async (id) => {
    try {
      const response = await api.get(`/api/orders/${id}`);
      return { success: true, data: response.data };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Erreur de chargement de la commande' 
      };
    }
  }
};