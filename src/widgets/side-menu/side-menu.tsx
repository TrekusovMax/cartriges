import React, { useEffect, useState } from 'react'
import { PrinterOutlined } from '@ant-design/icons'
import { Menu } from 'antd'
import type { MenuProps } from 'antd'
import { useGetOfficesQuery } from '@/entities/app/api'
import { useParams } from 'react-router-dom'

export const SideMenu = () => {
  const [menuItems, setMenuItems] = useState<MenuProps['items']>([])
  const [openMenuIndex, setOpenMenuIndex] = useState<string[]>([])
  const { data } = useGetOfficesQuery()
  const { office } = useParams()

  useEffect(() => {
    if (data) {
      const menuValues = data && Object.values(data).map((item) => item.name)
      const items: MenuProps['items'] = menuValues!.map((item, index) => {
        return {
          key: `${item}`,
          label: `${item}`,
          children: new Array(4).fill(null).map((_, j) => {
            const subKey = index * 4 + j + 1
            return {
              key: subKey,
              label: `option${subKey}`,
              icon: React.createElement(PrinterOutlined),
            }
          }),
          onTitleClick: (title) => {
            if (title.key === menuValues[index]) {
              setOpenMenuIndex([menuValues[index]])
            } /*  else {
              return
            } */
          },
        }
      })
      setMenuItems(items)
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
