import api from "/src/services/Api";


// Données mockées garanties
const mockProducts = [
  {
    id: 1,
    name: "Montre Homme Classique",
    description: "Montre élégante en acier inoxydable avec bracelet en cuir véritable. Parfaite pour les occasions formelles.",
    price: 299.99,
    category: "homme",
    image: "montre-homme-1.jpg",
    stock: 15,
    is_active: true
  },
  {
    id: 2,
    name: "Montre Femme Élégante",
    description: "Montre délicate avec cadran en nacre et bracelet en acier. Élégance et sophistication.",
    price: 249.99,
    category: "femme",
    image: "montre-femme-1.jpg",
    stock: 8,
    is_active: true
  },
  {
    id: 3,
    name: "Montre Sport Professionnelle",
    description: "Montre sportive étanche avec chronographe et monitoring cardiaque. Idéale pour les activités intenses.",
    price: 399.99,
    category: "sport",
    image: "montre-sport-1.jpg",
    stock: 20,
    is_active: true
  },
  {
    id: 4,
    name: "Montre Homme Vintage",
    description: "Style rétro avec cadran noir et chiffres arabes. Pour les amateurs de design classique.",
    price: 349.99,
    category: "homme",
    image: "montre-homme-2.jpg",
    stock: 5,
    is_active: true
  },
  {
    id: 5,
    name: "Montre Femme Sport",
    description: "Montre sportive pour femme, légère et résistante. Parfaite pour les activités quotidiennes.",
    price: 179.99,
    category: "femme",
    image: "montre-femme-2.jpg",
    stock: 12,
    is_active: true
  },
  {
    id: 6,
    name: "Montre Sport Aventure",
    description: "Montre d'aventure avec altimètre, baromètre et boussole. Conçue pour les explorateurs.",
    price: 279.99,
    category: "sport",
    image: "montre-sport-2.jpg",
    stock: 10,
    is_active: true
  }
];

export const productService = {
  getAll: async () => {
    try {
      console.log('🔄 Tentative de connexion à l\'API...');
      const response = await api.get('/products');
      
      console.log('✅ API répond:', response.status);
      console.log('📋 Structure réponse:', response.data);
      
      // Gestion de différentes structures de réponse
      let productsData = [];
      
      if (response.data && response.data.data) {
        productsData = response.data.data;
      } else if (response.data && Array.isArray(response.data)) {
        productsData = response.data;
      } else if (response.data) {
        productsData = [response.data];
      }
      
      console.log('🎯 Produits extraits:', productsData.length);
      
      if (productsData.length > 0) {
        return {
          success: true,
          data: productsData
        };
      } else {
        console.log('⚠️ API retourne 0 produits, utilisation des données mockées');
        return {
          success: true,
          data: mockProducts
        };
      }
      
    } catch (error) {
      console.error('❌ Erreur API, utilisation des données mockées:', error.message);
      return {
        success: true, // On retourne true pour pouvoir afficher les mockées
        data: mockProducts,
        message: 'Utilisation de données de démonstration'
      };
    }
  },

  getById: async (id) => {
    try {
      const response = await api.get(`/products/${id}`);
      return {
        success: true,
        data: response.data.data || response.data
      };
    } catch (error) {
      // Fallback aux données mockées
      const product = mockProducts.find(p => p.id === parseInt(id));
      if (product) {
        return { success: true, data: product };
      }
      return {
        success: false,
        error: 'Produit non trouvé'
      };
    }
  },

  getByCategory: async (category) => {
    try {
      const response = await api.get(`/products/category/${category}`);
      return {
        success: true,
        data: response.data.data || response.data
      };
    } catch (error) {
      // Fallback aux données mockées
      const products = mockProducts.filter(p => p.category === category);
      return {
        success: true,
        data: products
      };
    }
  }
}; 
export default productService;