import { Suspense } from 'react'
import { createBrowserRouter, redirect, RouterProvider } from 'react-router-dom'

import { IBreadcrumbProps } from '@/widgets/layout/breadcrumb/model/types'
import MainPage from '@/pages/main-page'
import { MainLayout } from '@/widgets/layout/main-layout'
import { getOfficeCrumbs } from '@/shared/lib/functions/getOfficeCrumbs'
import { getPrinterCrumbs } from '@/shared/lib/functions/getPrinterCrumbs'
import { ROUTER_PATHS } from '@/shared/constants/routes'
import { Loader } from '@/shared/ui/loader'

const router = createBrowserRouter([
  {
    path: ROUTER_PATHS.HOME,
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
    path: ROUTER_PATHS.OFFICES,
    element: <MainLayout />,
    children: [
      {
        index: true,
        lazy: () =>
          import('@/pages/main-page').then((res) => ({
            Component: res.default,
          })),
        loader: (): IBreadcrumbProps => {
          return { to: ROUTER_PATHS.OFFICES, title: 'Офисы' }
        },
        handle: { crumb: (data: IBreadcrumbProps) => data },
      },
      {
        path: `${ROUTER_PATHS.OFFICE}`,
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
        path: `${ROUTER_PATHS.OFFICE}/${ROUTER_PATHS.PRINTER}`,
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
        path: `${ROUTER_PATHS.OFFICE}/${ROUTER_PATHS.PRINTER}/:id`,
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
        path: `${ROUTER_PATHS.OFFICE}/${ROUTER_PATHS.PRINTER}/:id/edit`,
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
    path: ROUTER_PATHS.PRINTERS,
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
    path: ROUTER_PATHS.ADD_PRINTER,
    element: <MainLayout />,
    children: [
      {
        index: true,
        lazy: () =>
          import('@/pages/add-printer').then((res) => ({
            Component: res.default,
          })),
        loader: (): IBreadcrumbProps => {
          return { to: ROUTER_PATHS.ADD_PRINTER, title: 'Добавить МФУ' }
        },
        handle: { crumb: (data: IBreadcrumbProps) => data },
      },
    ],
  },
  {
    path: ROUTER_PATHS.ADD_CARTRIGE,
    element: <MainLayout />,
    children: [
      {
        index: true,
        lazy: () =>
          import('@/pages/add-cartrige').then((res) => ({
            Component: res.default,
          })),
        loader: (): IBreadcrumbProps => {
          return { to: ROUTER_PATHS.ADD_CARTRIGE, title: 'Добавить картридж' }
        },
        handle: { crumb: (data: IBreadcrumbProps) => data },
      },
    ],
  },
])

export const AppRouter = () => {
  return <RouterProvider router={router} />
}
