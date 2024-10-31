import { IBreadcrumbProps } from '@/app/providers/routes-provider/types'
import { Params } from 'react-router-dom'

export const getOfficeCrumbs = (params: Params, request: Request): IBreadcrumbProps | Params => {
  return {
    title: 'Офисы',
    to: request.url.replace(import.meta.env.VITE_HOST, ''),
    params,
  }
}
