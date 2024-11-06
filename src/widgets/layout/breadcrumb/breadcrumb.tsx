import { Breadcrumb as AntdBreadcrumb } from 'antd'
import { Link } from 'react-router-dom'

import { useGetOfficesQuery } from '@/entities/app/api'
import { useMatches } from 'react-router-dom'

import { IBreadcrumbProps } from '@/app/providers/routes-provider/types'
import { HomeFilled } from '@ant-design/icons'
import { ItemType } from 'antd/es/breadcrumb/Breadcrumb'
import { useMemo } from 'react'

export const Breadcrumb = () => {
  const { data } = useGetOfficesQuery()
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

  if (!params) {
    items.push({ href: '/', title: 'Офисы' })
  }

  if (params && data) {
    if (!Array.isArray(params)) {
      const param: IBreadcrumbProps = params
      items.push({ href: param.to, title: param.title })
    } else {
      for (const param of params) {
        let index = param.params as string
        if ('params' in param) {
          const elem = params.filter((el) => data[el.params as string])
          if (elem.length === 1 && elem[0].params) {
            const href = elem[0].params as string
            if (data[index]) {
              items.push({ href: param.to, title: param.title })
            } else {
              data[href] && items.push({ href, title: data[href].name })
            }
          }

          items = items.filter((el, i) => el.href !== undefined && i !== items.length)
          const lastItem = data[index] ? data[index].name : (param.params as string)
          items.push({ title: lastItem })
        }
      }
    }
  }

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
