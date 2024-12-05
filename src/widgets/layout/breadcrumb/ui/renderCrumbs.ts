import { IBreadcrumbProps } from '@/widgets/layout/breadcrumb/model/types'
import { IOffices } from '@/entities/app/model/app.types'
import { ItemType } from 'antd/es/breadcrumb/Breadcrumb'

export const renderCrumbs = (
  params: IBreadcrumbProps[],
  office: IOffices | undefined,
): ItemType[] => {
  let items: ItemType[] = []
  if (!params) {
    items.push({ href: '/', title: 'Офисы' })
  }

  if (params && office) {
    if (!Array.isArray(params)) {
      const param: IBreadcrumbProps = params
      items.push({ href: param.to, title: param.title })
    } else {
      for (const param of params) {
        let index = param.params as string
        //Добавление элементов для офиса
        if ('params' in param) {
          const elem = params.filter((el) => office[el.params as string])

          if (elem.length === 1 && elem[0].params) {
            const href = elem[0].params as string
            if (office[index]) {
              items.push({ href: param.to, title: param.title })
            } else {
              office[href] && items.push({ href, title: office[href].name })
            }
          }

          items = items.filter((el, i) => el.href !== undefined && i !== items.length)
          const lastItem = office[index] ? office[index].name : (param.params as string)
          items.push({ title: lastItem })
        }
      }
    }
  }
  return items
}
