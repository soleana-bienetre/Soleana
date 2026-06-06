import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          // React core — partagé entre tous les lazy chunks sans duplication
          if (
            id.includes('node_modules/react/') ||
            id.includes('node_modules/react-dom/') ||
            id.includes('node_modules/react-router-dom/') ||
            id.includes('node_modules/scheduler/')
          ) {
            return 'vendor-react';
          }
          // Supabase — lourd et stable, isolé en chunk dédié
          if (id.includes('node_modules/@supabase/')) {
            return 'vendor-supabase';
          }
          // Lucide icons — tree-shaked par Rollup, groupé pour éviter duplication
          if (id.includes('node_modules/lucide-react/')) {
            return 'vendor-lucide';
          }
        },
      },
    },
  },
});
