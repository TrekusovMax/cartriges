import { Breadcrumb as AntdBreadcrumb } from 'antd'
import { Link } from 'react-router-dom'

import { useGetOfficesQuery } from '@/entities/app/api'
import { useMatches } from 'react-router-dom'

import { IBreadcrumbProps } from '@/app/providers/routes-provider/types'
import { HomeFilled } from '@ant-design/icons'
import { ItemType } from 'antd/es/breadcrumb/Breadcrumb'

export const Breadcrumb = () => {
  const { data } = useGetOfficesQuery()
  const matches = useMatches()

  const items: ItemType[] = [
    {
      href: '/',
      title: <HomeFilled />,
    },
  ]

  const params = matches.filter((item) => Boolean(item.handle))[0]?.data as IBreadcrumbProps
  if (params) {
    console.log(params.params)
    if ('params' in params) {
      const paths = params.to.split('/').slice(1)
      paths.pop()

      for (const href of paths) {
        items.push({ href: `/${href}`, title: params.title })
      }
      const section = params && Object.values(params.params as Object)[0]
      const officeName = data && data[section].name
      items.push({ title: officeName })
    } else {
      items.push({ href: params.to, title: params.title })
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
