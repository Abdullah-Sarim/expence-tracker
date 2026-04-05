import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {ThemeProvider} from 'next-themes'
import { AuthProvider } from './context/Authcontextprovider.tsx'
import { TransactionProvider } from './context/Transactioncontextprovider.tsx'
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <TransactionProvider>
     <ThemeProvider attribute="class"
      defaultTheme="system"
      enableSystem
      >
    <App />
    </ThemeProvider>
    </TransactionProvider>
    </AuthProvider>
  </StrictMode>,
)
