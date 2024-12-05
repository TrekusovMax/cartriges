import { IBreadcrumbProps } from '@/widgets/layout/breadcrumb/model/types'
import { breadcrumbsTitle } from '@/widgets/layout/breadcrumb/model/breadcrumbsTitle'
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
