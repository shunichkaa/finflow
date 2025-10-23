import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
    plugins: [
        react({
            jsxRuntime: 'automatic'
        })
    ],
    build: {
        outDir: 'dist',
        sourcemap: false,
        rollupOptions: {
            output: {
                manualChunks: {
                    'react-vendor': ['react', 'react-dom', 'react/jsx-runtime'],
                    'mui': ['@mui/material', '@mui/icons-material', '@emotion/react', '@emotion/styled'],
                    'router': ['react-router-dom'],
                    'supabase': ['@supabase/supabase-js']
                }
            }
        }
    },
    server: {
        port: 5173
    },
    base: '/',
    optimizeDeps: {
        include: ['react', 'react-dom', 'react/jsx-runtime']
    },
    resolve: {
        dedupe: ['react', 'react-dom']
    }
})