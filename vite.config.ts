import { defineConfig } from 'vite'
import { TanStackRouterVite } from '@tanstack/router-vite-plugin'
import react from "@vitejs/plugin-react-swc";
import { lingui } from "@lingui/vite-plugin";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react({
    plugins: [["@lingui/swc-plugin", {}]],
  }),
    lingui(),
    TanStackRouterVite(),
  ],
  resolve: {
  }
})