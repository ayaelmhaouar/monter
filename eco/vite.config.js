
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react({
    include: ['**/*.js', '**/*.jsx'], // Inclure les fichiers .js
  })],
  esbuild: {
    loader: 'jsx', // Traiter les .js comme JSX
    include: /src\/.*\.js$/, // Inclure tous les .js dans src
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'] // Résoudre les extensions
  }
})