import React, { useEffect, useState } from 'react'
import { Menu } from 'antd'
import type { MenuProps } from 'antd'
import { PrinterOutlined } from '@ant-design/icons'
import { Link, useParams } from 'react-router-dom'

import { ROUTER_PATHS } from '@/shared/constants/routes'
import { useOfficesList } from '@/features/office'
import { usePrintersList } from '@/features/printer'

interface IMenuItems {
  [key: string]: string[]
}

export const SideMenu = () => {
  const { data: officeData } = useOfficesList()
  const { data: printerData } = usePrintersList()

  const { office } = useParams()

  const [menuItems, setMenuItems] = useState<MenuProps['items']>([])
  const [openMenuIndex, setOpenMenuIndex] = useState<string[]>([])

  const sideMenuItems: IMenuItems = {}
  let openMenuKey = ''

  useEffect(() => {
    const menuKeys = Object.keys(officeData)
    const menuValues = Object.values(officeData).map((i) => i.name)
    if (printerData) {
      const printerDataValues = Object.values(printerData)
      menuKeys.map((item) => {
        sideMenuItems[officeData[item].name] = []
        const subMenu = new Set<string>()
        printerDataValues.map((printer) => {
          if (printer.office === item) {
            subMenu.add(printer.title)
          }
          sideMenuItems[officeData[item].name] = Array.from(subMenu)
        })
      })
      const printersCount = Object.keys(printerData).length
      const items: MenuProps['items'] = menuValues.map((item, index) => {
        const printersInOfficeCount = Object.keys(
          sideMenuItems[item],
        ).length

        return {
          key: `${item}`,
          label: `${item}`,
          children: new Array(printersInOfficeCount)
            .fill(null)
            .map((_, j) => {
              const subKey = index * printersCount + j + 1
              return {
                key: subKey,
                label: (
                  <Link
                    to={`${
                      import.meta.env.VITE_HOST + ROUTER_PATHS.OFFICES
                    }/${menuKeys[index]}/${sideMenuItems[item][j]}`}>
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
      if (office && officeData[office]?.name) {
        setOpenMenuIndex([officeData[office].name])
      } else {
        setOpenMenuIndex([])
      }
    } else {
      const items: MenuProps['items'] = menuValues.map((item, index) => {
        return {
          key: `${item}`,
          label: (
            <Link
              to={`${import.meta.env.VITE_HOST + ROUTER_PATHS.OFFICES}/${
                menuKeys[index]
              }`}>
              {item}
            </Link>
          ),
        }
      })
      setMenuItems(items)
    }
  }, [officeData, office, printerData.data])

  openMenuKey =
    (office && officeData.data && officeData[office]?.name) || ''

  return (
    <>
      {printerData ? (
        <Menu
          mode="inline"
          openKeys={openMenuIndex.length ? openMenuIndex : [openMenuKey]}
          style={{ height: '100%' }}
          items={menuItems}
        />
      ) : (
        <Menu
          mode="inline"
          style={{ height: '100%', border: 'none' }}
          items={menuItems}
        />
      )}
    </>
  )
}
