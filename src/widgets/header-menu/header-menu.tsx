import { LegacyRef, RefObject, useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu } from 'antd'

import type { MenuProps, MenuRef } from 'antd'

interface IHeaderMenu {
  title: string
  path: string
}

export const HeaderMenu = () => {
  const location = useLocation()
  let currMenuItem = useRef() as LegacyRef<MenuRef> & RefObject<MenuRef>

  const [menuItems, setMenuItems] = useState<MenuProps['items']>([])

  const headerData: IHeaderMenu[] = [
    { title: 'Добавить МФУ', path: '/add-printer' },
    { title: 'Добавить картридж', path: '/add-cartrige' },
    { title: 'Отчёт', path: '/report' },
    { title: 'Настройки', path: '/settings' },
  ]

  const menuTitle = Object.values(headerData).map((item) => item.title)
  const menuPath = Object.values(headerData).map((item) => item.path)
  const [menuIndex, SetMenuIndex] = useState<number | null>(null)
  useEffect(() => {
    const items: MenuProps['items'] = menuTitle.map((key, i) => ({
      key,
      label: (
        <Link to={`${menuPath[i]}`} rel="noopener noreferrer">
          {key}
        </Link>
      ),
      onClick: () => {},
      className: headerData[i].path === location.pathname ? 'ant-menu-item-selected' : '',
    }))

    setMenuItems(items)

    //удаление синий заливки на неактивной кнопке меню
    if (currMenuItem.current && currMenuItem.current.menu) {
      if (menuPath.indexOf(location.pathname) < 0) {
        for (let i of currMenuItem.current.menu.list.children) {
          SetMenuIndex(null)
          i.classList.remove('ant-menu-item-selected')
        }
      } else {
        SetMenuIndex(menuPath.indexOf(location.pathname))

        for (let i of currMenuItem.current.menu.list.children) {
          const menuItem = i.getElementsByTagName('a')[0]?.getAttribute('href')
          if (menuItem == location.pathname) {
            i.classList.add('ant-menu-item-selected')
          }
        }
      }
    }
  }, [location.pathname, menuIndex])

  return (
    <>
      <Menu
        onMouseOverCapture={(e) => {
          console.log(e)

          return null
        }}
        ref={currMenuItem}
        theme="dark"
        mode="horizontal"
        items={menuItems}
        style={{ flex: 1, minWidth: 0, color: 'white' }}
      />
    </>
  )
}
