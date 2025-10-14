import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()],
    build: {
<<<<<<< Current (Your changes)
        outDir: 'dist',
        assetsDir: 'assets'
=======
        rollupOptions: {
            input: './index.html',
        },
>>>>>>> Incoming (Background Agent changes)
    },
    base: './'
});