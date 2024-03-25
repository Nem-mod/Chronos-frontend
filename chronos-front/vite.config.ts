import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        port: 4000,
    },
    preview: {
        port: 4000,
    },
    optimizeDeps: {
        exclude: ['js-big-decimal'],
    },
});
