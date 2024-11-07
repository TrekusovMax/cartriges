import { IBreadcrumbProps } from '@/app/providers/routes-provider/types'
import { breadcrumbsTitle } from '@/widgets/layout/breadcrumb/breadcrumbsTitle'
import { Params } from 'react-router-dom'

export const getPrinterCrumbs = (params: Params): IBreadcrumbProps[] => {
  const crumbs = []

  for (let [key, value] of Object.entries(params)) {
    breadcrumbsTitle[key] &&
      crumbs.push({
        title: breadcrumbsTitle[key],
        to: `/${key}`,
        params: value,
        printer: value,
      })
  }

  return crumbs
}
