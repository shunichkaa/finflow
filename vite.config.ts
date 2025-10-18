import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
    plugins: [react()],
    build: {
        outDir: 'dist',
        sourcemap: false,
        rollupOptions: {
            output: {
                manualChunks: {
                    vendor: ['react', 'react-dom'],
                    mui: ['@mui/material', '@mui/icons-material'],
                    router: ['react-router-dom'],
                    supabase: ['@supabase/supabase-js']
                }
            }
        }
    },
    server: {
        port: 5173
    },
    base: './',
    define: {
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
    }
})