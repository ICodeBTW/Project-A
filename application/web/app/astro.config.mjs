// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  output: "static",
  server: {host:true},
  integrations: [react()],
  build: {
    assets: '_astro'
  },

  vite: {
    plugins: [tailwindcss()],
    define: {
      __API_URL__: JSON.stringify(process.env.API_URL || 'http://localhost:4321')
    }
  }
});