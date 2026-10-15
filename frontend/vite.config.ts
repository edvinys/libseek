import react from '@vitejs/plugin-react'
import {defineConfig, type Plugin} from 'vite'

// https://vite.dev/config/

function cleanAboutUrl(): Plugin {
  return {
    name: 'clean-about-url',
  };
}

export default defineConfig({
  plugins: [react(), cleanAboutUrl()],
})
