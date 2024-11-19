import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import { router } from 'front/route/router'
import AuthProvider from 'front/components/auth/authProvider'

console.info('import.meta.env.VITE_API_URL', import.meta.env.VITE_API_URL)
createRoot(document.getElementById('root')!).render(
  <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>
)
