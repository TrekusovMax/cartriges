import { Routes, Route, Navigate } from 'react-router-dom'
import { lazy } from 'react'
//import { ProtectedRoute } from './protected-route'
import { MainLayout } from '@/widgets/layout/main-layout'

const MainPage = lazy(() => import('@/pages/main-page'))
const OfficePage = lazy(() => import('@/pages/office'))
const PrinterPage = lazy(() => import('@/pages/printer-page'))
const PrintersListPage = lazy(() => import('@/pages/printers-list-page'))
const AddPrinter = lazy(() => import('@/pages/add-printer'))
const AddCartrige = lazy(() => import('@/pages/add-cartrige'))
const EditPage = lazy(() => import('@/pages/edit-printer'))
/* const UserProfile = lazy(() => import('@/pages/profile'))
const LoginForm = lazy(() => import('@/pages/login'))
const RegisterForm = lazy(() => import('@/pages/register'))
const PasswordForm = lazy(() => import('@/pages/password-form'))
const ForgotPassword = lazy(() => import('@/pages/forgot-password'))
const SitesEdit = lazy(() => import('@/pages/sites-edit')) */

export const RoutesProvider = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<MainPage />} />
      </Route>

      <Route path="/office" element={<MainLayout />}>
        <Route index element={<MainPage />} />
        <Route path=":office" element={<OfficePage />} />
        {/* <Route
          path=":office/printer/:id"
          element={<PrintersListPage />}
        /> */}
        <Route path=":office/:printer" element={<PrintersListPage />} />
      </Route>

      <Route path="/add-printer" element={<MainLayout />}>
        <Route index element={<AddPrinter />} />
      </Route>
      <Route path="/add-cartrige" element={<MainLayout />}>
        <Route index element={<AddCartrige />} />
      </Route>

      <Route path="/printer" element={<MainLayout />}>
        <Route index element={<Navigate to="/" />} />
        <Route path=":id" element={<PrinterPage />} />
        <Route path=":id/edit" element={<EditPage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Route>

      <Route path="*" element={<Navigate to="/" />} />
      {/*
      
            <Route path="/printer" element={<MainLayout />}>
        <Route index element={<PrinterPage />} />
      </Route>
      </Route>
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
