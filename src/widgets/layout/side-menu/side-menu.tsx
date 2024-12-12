import React, { useEffect, useState } from 'react'
import { Menu } from 'antd'
import type { MenuProps } from 'antd'
import { PrinterOutlined } from '@ant-design/icons'
import { Link, useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'

import { officesListQuery } from '@/entities/office/queries'
import { printersListQuery } from '@/entities/printer/queries'
import { ROUTER_PATHS } from '@/shared/constants/routes'

interface IMenuItems {
  [key: string]: string[]
}

export const SideMenu = () => {
  const officeData = useQuery({
    ...officesListQuery(),
    initialData: {},
  })
  const printerData = useQuery({
    ...printersListQuery(),
    initialData: {},
  })
  const { office } = useParams()

  const [isLoading, setIsloading] = useState(true)
  const [menuItems, setMenuItems] = useState<MenuProps['items']>([])
  const [openMenuIndex, setOpenMenuIndex] = useState<string[]>([])

  const sideMenuItems: IMenuItems = {}
  let openMenuKey = ''

  useEffect(() => {
    setIsloading(officeData.isLoading && printerData.isLoading)

    if (officeData.data) {
      const menuKeys = Object.keys(officeData.data)
      const menuValues = Object.values(officeData.data).map((i) => i.name)
      if (printerData.data) {
        const printerDataValues = Object.values(printerData.data)
        menuKeys.map((item) => {
          sideMenuItems[officeData.data[item].name] = []
          const subMenu = new Set<string>()
          printerDataValues.map((printer) => {
            if (printer.office === item) {
              subMenu.add(printer.title)
            }
            sideMenuItems[officeData.data[item].name] = Array.from(subMenu)
          })
        })
        const printersCount = Object.keys(printerData).length
        const items: MenuProps['items'] = menuValues.map((item, index) => {
          const printersInOfficeCount = Object.keys(sideMenuItems[item]).length

          return {
            key: `${item}`,
            label: `${item}`,
            children: new Array(printersInOfficeCount).fill(null).map((_, j) => {
              const subKey = index * printersCount + j + 1
              return {
                key: subKey,
                label: (
                  <Link
                    to={`${import.meta.env.VITE_HOST + ROUTER_PATHS.OFFICES}/${menuKeys[index]}/${
                      sideMenuItems[item][j]
                    }`}>
                    {sideMenuItems[item][j]}
                  </Link>
                ),
                icon: React.createElement(PrinterOutlined),
              }
            }),
            onTitleClick: (title) => {
              if (title.key === menuValues[index]) {
                setOpenMenuIndex([menuValues[index]])
              }
            },
          }
        })
        setMenuItems(items)
        if (office && officeData.data[office]?.name) {
          setOpenMenuIndex([officeData.data[office].name])
        } else {
          setOpenMenuIndex([])
        }
      } else {
        const items: MenuProps['items'] = menuValues.map((item, index) => {
          return {
            key: `${item}`,
            label: (
              <Link to={`${import.meta.env.VITE_HOST + ROUTER_PATHS.OFFICES}/${menuKeys[index]}`}>
                {item}
              </Link>
            ),
          }
        })
        setMenuItems(items)
      }
    }
  }, [officeData.data, office, printerData.data])

  openMenuKey = (office && officeData.data && officeData.data[office]?.name) || ''

  return (
    <>
      {!isLoading ? (
        <Menu
          mode="inline"
          openKeys={openMenuIndex.length ? openMenuIndex : [openMenuKey]}
          style={{ height: '100%' }}
          items={menuItems}
        />
      ) : (
        <Menu mode="inline" style={{ height: '100%', border: 'none' }} items={menuItems} />
      )}
    </>
  )
}
