import React, { useEffect, useState } from 'react'
import { PrinterOutlined } from '@ant-design/icons'
import { Menu } from 'antd'
import type { MenuProps } from 'antd'
import { useGetOfficesQuery } from '@/entities/app/api'
import { Link, useParams } from 'react-router-dom'

export const SideMenu = () => {
  const [menuItems, setMenuItems] = useState<MenuProps['items']>([])
  const [openMenuIndex, setOpenMenuIndex] = useState<string[]>([])
  const { data } = useGetOfficesQuery()
  const { office } = useParams()

  useEffect(() => {
    if (data) {
      const menuValues = data && Object.values(data).map((item) => item.name)
      const menuKeys = data && Object.keys(data)

      const items: MenuProps['items'] = menuValues.map((item, index) => {
        return {
          key: `${item}`,
          label: `${item}`,
          children: new Array(4).fill(null).map((_, j) => {
            const subKey = index * 4 + j + 1
            return {
              key: subKey,
              label: (
                <Link
                  to={`${import.meta.env.VITE_HOST}/office/${
                    menuKeys[index]
                  }/${j}`}>{`option${subKey}`}</Link>
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
        setOpenMenuIndex([data[office].name])
      } else {
        setOpenMenuIndex([])
      }
    }
  }, [data, office])

  const openMenuKey = office && data ? data[office].name : ''

  return (
    <Menu
      mode="inline"
      openKeys={openMenuIndex.length ? openMenuIndex : [openMenuKey]}
      style={{ height: '100%' }}
      items={menuItems}
    />
  )
}
