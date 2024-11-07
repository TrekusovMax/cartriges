import { Breadcrumb as AntdBreadcrumb } from 'antd'
import { Link } from 'react-router-dom'

import { useGetOfficesQuery } from '@/entities/app/api'
import { useMatches } from 'react-router-dom'

import { IBreadcrumbProps } from '@/app/providers/routes-provider/types'
import { HomeFilled } from '@ant-design/icons'
import { ItemType } from 'antd/es/breadcrumb/Breadcrumb'
import { useMemo } from 'react'
import { renderCrumbs } from './renderCrumbs'

export const Breadcrumb = () => {
  const { data: offices } = useGetOfficesQuery()

  const matches = useMatches()

  let items: ItemType[] = [
    {
      href: '/',
      title: <HomeFilled />,
    },
  ]

  const params = useMemo(
    () => matches.filter((item) => Boolean(item.handle))[0]?.data as IBreadcrumbProps[],
    [matches],
  )

  items.push(...renderCrumbs(params, offices))

  const itemRender = (
    route: ItemType,
    //@ts-ignore
    params: any,
    routes: ItemType[],
    //@ts-ignore
    paths: string[],
  ): React.ReactNode => {
    const isLast = routes.indexOf(route) === routes.length - 1

    return isLast ? <span>{route.title}</span> : <Link to={route.href!}>{route.title}</Link>
  }

  return <AntdBreadcrumb style={{ padding: '16px' }} itemRender={itemRender} items={items} />
}
