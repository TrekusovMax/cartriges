import React, { useEffect, useState } from 'react'
import { PrinterOutlined } from '@ant-design/icons'
import { Menu } from 'antd'
import type { MenuProps } from 'antd'
import { useGetOfficesQuery } from '@/entities/app/api'
import { Link, useParams } from 'react-router-dom'
import { useGetPrintersQuery } from '@/entities/printer/api'

interface IMenuItems {
  [key: string]: string[]
}

export const SideMenu = () => {
  const [menuItems, setMenuItems] = useState<MenuProps['items']>([])
  const [openMenuIndex, setOpenMenuIndex] = useState<string[]>([])
  const { data: officeData } = useGetOfficesQuery()
  const { data: printerData } = useGetPrintersQuery()
  const { office } = useParams()
  const sideMenuItems: IMenuItems = {}

  useEffect(() => {
    if (officeData && printerData) {
      const printerDataValues = printerData && Object.values(printerData)
      const menuKeys = officeData && Object.keys(officeData)
      const menuValues = Object.values(officeData).map((i) => i.name)

      menuKeys.map((item) => {
        sideMenuItems[officeData[item].name] = []
        printerDataValues.map((printer) => {
          if (printer.office === item) {
            sideMenuItems[officeData[item].name] = [
              ...sideMenuItems[officeData[item].name],
              printer.title,
            ]
          }
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
                  to={`${import.meta.env.VITE_HOST}/office/${menuKeys[index]}/${
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
      if (office) {
        setOpenMenuIndex([officeData[office].name])
      } else {
        setOpenMenuIndex([])
      }
    }
  }, [officeData, office, printerData])

  const openMenuKey = office && officeData ? officeData[office].name : ''

  return (
    <Menu
      mode="inline"
      openKeys={openMenuIndex.length ? openMenuIndex : [openMenuKey]}
      style={{ height: '100%' }}
      items={menuItems}
    />
  )
}
