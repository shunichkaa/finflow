import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './Budgets/theme/theme.ts'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)