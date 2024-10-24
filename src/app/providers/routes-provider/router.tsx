import MainPage from '@/pages/main-page'
import { Loader } from '@/shared/ui/loader'
import { MainLayout } from '@/widgets/layout/main-layout'
import { Suspense } from 'react'
import { createBrowserRouter, redirect } from 'react-router-dom'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<Loader />}>
            <MainPage />
          </Suspense>
        ),
      },
      {
        path: '*',
        loader: () => redirect('/'),
      },
    ],
  },
  {
    path: '/office',
    element: <MainLayout />,
    children: [
      {
        index: true,
        lazy: () =>
          import('@/pages/main-page').then((res) => ({
            Component: res.default,
          })),
      },
      {
        path: ':office',
        lazy: () =>
          import('@/pages/office').then((res) => ({
            Component: res.default,
          })),
      },
      {
        path: ':office/:printer',
        lazy: () =>
          import('@/pages/printers-list-page').then((res) => ({
            Component: res.default,
          })),
      },
    ],
  },
  {
    path: '/printer',
    element: <MainLayout />,
    children: [
      {
        index: true,
        lazy: () =>
          import('@/pages/main-page').then((res) => ({
            Component: res.default,
          })),
      },
      {
        path: ':id',
        lazy: () =>
          import('@/pages/printer-page').then((res) => ({
            Component: res.default,
          })),
      },
      {
        path: ':id/edit',
        lazy: () =>
          import('@/pages/edit-page').then((res) => ({
            Component: res.default,
          })),
      },
      {
        path: '*',
        loader: () => redirect('/'),
      },
    ],
  },
  {
    path: '/add-printer',
    element: <MainLayout />,
    children: [
      {
        index: true,
        lazy: () =>
          import('@/pages/add-printer').then((res) => ({
            Component: res.default,
          })),
      },
    ],
  },
  {
    path: '/add-cartrige',
    element: <MainLayout />,
    children: [
      {
        index: true,
        lazy: () =>
          import('@/pages/add-cartrige').then((res) => ({
            Component: res.default,
          })),
      },
    ],
  },
])
