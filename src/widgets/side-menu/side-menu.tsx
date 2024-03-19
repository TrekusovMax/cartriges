import React from 'react'
import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons'
import { Menu } from 'antd'
import type { MenuProps } from 'antd'

export const SideMenu = () => {
  const items2: MenuProps['items'] = [UserOutlined, LaptopOutlined, NotificationOutlined].map(
    (icon, index) => {
      const key = String(index + 1)

      return {
        key: `sub${key}`,
        icon: React.createElement(icon),
        label: `subnav ${key}`,

        children: new Array(4).fill(null).map((_, j) => {
          const subKey = index * 4 + j + 1
          return {
            key: subKey,
            label: `option${subKey}`,
          }
        }),
      }
    },
  )
  return <Menu mode="inline" defaultOpenKeys={['sub']} style={{ height: '100%' }} items={items2} />
}
