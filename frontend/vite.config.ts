import react from '@vitejs/plugin-react'
import {defineConfig, type Plugin} from 'vite'

// https://vite.dev/config/

function cleanAboutUrl(): Plugin {
  return {
    name: 'clean-about-url',
    configureServer(server) {
      server.middlewares.use((request, _response, next) => {
        if (request.url === '/about') {
          request.url = '/about.html';
        }

        next();
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), cleanAboutUrl()],
})
