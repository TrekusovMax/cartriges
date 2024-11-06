import { IBreadcrumbProps } from '@/app/providers/routes-provider/types'
import { Params } from 'react-router-dom'

export const getOfficeCrumbs = (params: Params, request: Request): IBreadcrumbProps[] => {
  const titles: Record<any, string> = {
    office: 'Офисы',
    printer: 'МФУ',
  }
  const crumbs = []

  for (let [key, value] of Object.entries(params)) {
    crumbs.push({
      title: titles[key],
      to: `/${key}`,
      params: value,
    })
  }

  return crumbs /* {
    title: 'Офисы',
    to: request.url.replace(import.meta.env.VITE_HOST, ''),
    params,
  } */
}
