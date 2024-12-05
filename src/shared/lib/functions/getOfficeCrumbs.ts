import { IBreadcrumbProps } from '@/widgets/layout/breadcrumb/model/types'
import { breadcrumbsTitle } from '@/widgets/layout/breadcrumb/model/breadcrumbsTitle'
import { Params } from 'react-router-dom'

export const getOfficeCrumbs = (params: Params): IBreadcrumbProps[] => {
  const crumbs = []

  for (let [key, value] of Object.entries(params)) {
    crumbs.push({
      title: breadcrumbsTitle[key],
      to: `/${key}`,
      params: value,
    })
  }

  return crumbs
}
