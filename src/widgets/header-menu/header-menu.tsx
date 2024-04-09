import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu } from 'antd'

import type { MenuProps } from 'antd'

interface IHeaderMenu {
  title: string
  path: string
}

export const HeaderMenu = () => {
  const [menuItems, setMenuItems] = useState<MenuProps['items']>([])
  const headerData: IHeaderMenu[] = [
    { title: 'Добавить элемент', path: '/add-item' },
    { title: 'Отчёт', path: '/report' },
    { title: 'Настройки', path: '/settings' },
  ]

  useEffect(() => {
    const menuTitle = Object.values(headerData).map((item) => item.title)
    const menuPath = Object.values(headerData).map((item) => item.path)

    const items: MenuProps['items'] = menuTitle.map((key, i) => ({
      key,
      label: (
        <Link to={`${menuPath[i]}`} rel="noopener noreferrer">
          {key}
        </Link>
      ),
    }))

    setMenuItems(items)
  }, [])

  return (
    <>
      <Menu theme="dark" mode="horizontal" items={menuItems} style={{ flex: 1, minWidth: 0 }} />
    </>
  )
}
