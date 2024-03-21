import { Routes, Route, Navigate } from 'react-router-dom'
import { lazy, Suspense } from 'react'
//import { ProtectedRoute } from './protected-route'
import { MainLayout } from '@/widgets/main-layout'

//import { Loader } from '@/shared/ui/loader'
const MainPage = lazy(() => import('@/pages/main-page'))
const OfficePage = lazy(() => import('@/pages/office'))
/* const UserProfile = lazy(() => import('@/pages/profile'))
const SitesNew = lazy(() => import('@/pages/sites-new'))
const LoginForm = lazy(() => import('@/pages/login'))
const RegisterForm = lazy(() => import('@/pages/register'))
const PasswordForm = lazy(() => import('@/pages/password-form'))
const ForgotPassword = lazy(() => import('@/pages/forgot-password'))
const SitesEdit = lazy(() => import('@/pages/sites-edit')) */

export const RoutesProvider = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route
          index
          element={<Suspense fallback={'Loading...' /* <Loader /> */}>{<MainPage />}</Suspense>}
        />
        <Route
          path=":office"
          element={<Suspense fallback={'Loading...' /* <Loader /> */}>{<OfficePage />}</Suspense>}
        />
      </Route>

      <Route path="*" element={<Navigate to="/" />} />
      {/*</Route>
             <Route
        path="/login"
        element={
          <Suspense>
            <LoginForm />
          </Suspense>
        }
      />
      <Route
        path="/register"
        element={
          <Suspense>
            <RegisterForm />
          </Suspense>
        }
      />
      <Route
        path="/forgot-password"
        element={
          <Suspense>
            <ForgotPassword />
          </Suspense>
        }
      /> */}
    </Routes>
  )
}
