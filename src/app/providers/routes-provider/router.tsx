import MainPage from '@/pages/main-page'
import { Loader } from '@/shared/ui/loader'
import { MainLayout } from '@/widgets/layout/main-layout'
import { Suspense } from 'react'

import { createBrowserRouter, redirect } from 'react-router-dom'
import { IBreadcrumbProps } from './types'
import { getOfficeCrumbs } from '@/shared/functions/getOfficeCrumbs'
import { getPrinterCrumbs } from '@/shared/functions/getPrinterCrumbs'

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
        loader: (): IBreadcrumbProps => {
          return { to: '/office', title: 'Офисы' }
        },
        handle: { crumb: (data: IBreadcrumbProps) => data },
      },
      {
        path: ':office',
        lazy: () =>
          import('@/pages/office').then((res) => ({
            Component: res.default,
          })),
        loader: ({ params }) => {
          return getOfficeCrumbs(params)
        },
        handle: { crumb: (data: IBreadcrumbProps) => data },
      },
      {
        path: ':office/:printer',
        lazy: () =>
          import('@/pages/printers-list-page').then((res) => ({
            Component: res.default,
          })),
        loader: ({ params }) => {
          return getOfficeCrumbs(params)
        },
        handle: { crumb: (data: IBreadcrumbProps) => data },
      },
      {
        path: ':office/:printer/:id',
        lazy: () =>
          import('@/pages/printer-page').then((res) => ({
            Component: res.default,
          })),
        loader: ({ params }) => {
          return getPrinterCrumbs(params)
        },
        handle: { crumb: (data: IBreadcrumbProps) => data },
      },
      {
        path: ':office/:printer/:id/edit',
        lazy: () =>
          import('@/pages/edit-page').then((res) => ({
            Component: res.default,
          })),
        loader: ({ params }) => {
          return getPrinterCrumbs(params)
        },
        handle: { crumb: (data: IBreadcrumbProps) => data },
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
        loader: ({ params }) => {
          return getPrinterCrumbs(params)
        },
        handle: { crumb: (data: IBreadcrumbProps) => data },
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
        loader: (): IBreadcrumbProps => {
          return { to: '/add-printer', title: 'Добавить МФУ' }
        },
        handle: { crumb: (data: IBreadcrumbProps) => data },
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
        loader: (): IBreadcrumbProps => {
          return { to: '/add-cartrige', title: 'Добавить картридж' }
        },
        handle: { crumb: (data: IBreadcrumbProps) => data },
      },
    ],
  },
])
