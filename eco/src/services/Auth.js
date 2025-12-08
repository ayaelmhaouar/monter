import api from "./Api";

export const authService = {
  // Connexion
  login: async (email, password) => {
    try {
      const response = await api.post('/api/login', { email, password });
      return { 
        success: true, 
        data: response.data 
      };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Erreur de connexion',
        errors: error.response?.data?.errors || null
      };
    }
  },

  // Inscription
  register: async (userData) => {
    try {
      const response = await api.post('/api/register', userData);
      return { 
        success: true, 
        data: response.data 
      };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Erreur d\'inscription',
        errors: error.response?.data?.errors || null
      };
    }
  },

  // Déconnexion
  logout: async () => {
    try {
      const response = await api.post('/api/logout');
      return { 
        success: true, 
        data: response.data 
      };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Erreur de déconnexion' 
      };
    }
  },

  // Récupérer le profil utilisateur
  getProfile: async () => {
    try {
      const response = await api.get('/api/user');
      return { 
        success: true, 
        data: response.data 
      };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Erreur de chargement du profil' 
      };
    }
  },

  // Mettre à jour le profil
  updateProfile: async (userData) => {
    try {
      const response = await api.put('/api/user/profile', userData);
      return { 
        success: true, 
        data: response.data 
      };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Erreur de mise à jour du profil' 
      };
    }
  },

  // Changer le mot de passe
  changePassword: async (passwordData) => {
    try {
      const response = await api.put('/api/user/password', passwordData);
      return { 
        success: true, 
        data: response.data 
      };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Erreur de changement de mot de passe' 
      };
    }
  }
};
