import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import { router } from 'front/route/router'
import AuthProvider from 'front/components/auth/authProvider'
import { CookiesProvider } from 'react-cookie'

createRoot(document.getElementById('root')!).render(
  <CookiesProvider defaultSetOptions={{ path: '/' }}>
    <AuthProvider>
      <RouterProvider
        router={router} future={{
          v7_startTransition: true
        }}
      />
    </AuthProvider>
  </CookiesProvider>
)
