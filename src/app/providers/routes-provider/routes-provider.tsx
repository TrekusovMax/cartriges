import { Routes, Route, Navigate } from 'react-router-dom'
import { lazy, Suspense } from 'react'
//import { ProtectedRoute } from './protected-route'
import { MainLayout } from '@/widgets/layout/main-layout'
import { Loader } from '@/shared/ui/loader'

const MainPage = lazy(() => import('@/pages/main-page'))
const OfficePage = lazy(() => import('@/pages/office'))
const PrinterPage = lazy(() => import('@/pages/printer-page'))
const PrintersListPage = lazy(() => import('@/pages/printers-list-page'))
const AddPrinter = lazy(() => import('@/pages/add-printer'))
const EditPage = lazy(() => import('@/pages/edit-page'))
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
        <Route index element={<Suspense fallback={<Loader />}>{<MainPage />}</Suspense>} />
      </Route>

      <Route path="/office" element={<MainLayout />}>
        <Route index element={<Suspense fallback={<Loader />}>{<MainPage />}</Suspense>} />
        <Route
          path=":office"
          element={<Suspense fallback={<Loader />}>{<OfficePage />}</Suspense>}
        />
        {/* <Route
          path=":office/printer/:id"
          element={<Suspense fallback={<Loader />}>{<PrintersListPage />}</Suspense>}
        /> */}
        <Route
          path=":office/:printer"
          element={<Suspense fallback={<Loader />}>{<PrintersListPage />}</Suspense>}
        />
      </Route>

      <Route path="/add-item" element={<MainLayout />}>
        <Route index element={<Suspense fallback={<Loader />}>{<AddPrinter />}</Suspense>} />
      </Route>

      <Route path="/printer" element={<MainLayout />}>
        <Route index element={<Navigate to="/" />} />
        <Route path=":id" element={<Suspense fallback={<Loader />}>{<PrinterPage />}</Suspense>} />
        <Route
          path=":id/edit"
          element={<Suspense fallback={<Loader />}>{<EditPage />}</Suspense>}
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Route>

      <Route path="*" element={<Navigate to="/" />} />
      {/*
      
            <Route path="/printer" element={<MainLayout />}>
        <Route index element={<Suspense fallback={<Loader />}>{<PrinterPage />}</Suspense>} />
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
