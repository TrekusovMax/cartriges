import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu } from 'antd'
import { useGetOfficesQuery } from '@/entities/app/api'
import type { MenuProps } from 'antd'

export const HeaderMenu = () => {
  const [menuItems, setMenuItems] = useState<MenuProps['items']>([])
  const { data } = useGetOfficesQuery()

  useEffect(() => {
    if (data) {
      const menuValues = Object.values(data).map((item) => item.name)
      const menuKeys = Object.keys(data)
      const items: MenuProps['items'] = menuValues.map((key, i) => ({
        key,
        label: (
          <Link to={`${menuKeys[i]}`} rel="noopener noreferrer">
            {key}
          </Link>
        ),
      }))

      setMenuItems(items)
    }
  }, [data])

  return (
    <>
      {data && (
        <Menu theme="dark" mode="horizontal" items={menuItems} style={{ flex: 1, minWidth: 0 }} />
      )}
    </>
  )
}
