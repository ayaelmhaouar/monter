
import api from '/src/services/Api';

export const adminService = {
  // Dashboard
  getDashboardStats: async () => {
    const response = await api.get('/admin/dashboard');
    return response.data;
  },

  getRecentOrders: async () => {
    const response = await api.get('/admin/orders?limit=5');
    return response.data;
  },

  // Products
  getProducts: async () => {
    const response = await api.get('/admin/products');
    return response.data;
  },

  createProduct: async (productData) => {
    const response = await api.post('/admin/products', productData);
    return response.data;
  },

  updateProduct: async (id, productData) => {
    const response = await api.put(`/admin/products/${id}`, productData);
    return response.data;
  },

  deleteProduct: async (id) => {
    const response = await api.delete(`/admin/products/${id}`);
    return response.data;
  },

  // Orders
  getOrders: async () => {
    const response = await api.get('/admin/orders');
    return response.data;
  },

  updateOrderStatus: async (id, statusData) => {
    const response = await api.put(`/admin/orders/${id}/status`, statusData);
    return response.data;
  },

  // Users
  getUsers: async () => {
    const response = await api.get('/admin/users');
    return response.data;
  },

  toggleUser: async (id) => {
    const response = await api.put(`/admin/users/${id}/toggle`);
    return response.data;
  },

  // Contacts
  getContacts: async () => {
    const response = await api.get('/admin/contacts');
    return response.data;
  },

  updateContactStatus: async (id, statusData) => {
    const response = await api.put(`/admin/contacts/${id}/status`, statusData);
    return response.data;
  }
};