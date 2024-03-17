import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { child, get, getDatabase, ref } from 'firebase/database'
import { Menu } from 'antd'
import type { MenuProps } from 'antd'

interface menuItems {
  name: string
}

export const HeaderMenu = () => {
  const [menuItems, setMenuItems] = useState<menuItems[]>([])

  useEffect(() => {
    const dbRef = ref(getDatabase())
    get(child(dbRef, `offices/`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          setMenuItems(snapshot.val())
        } else {
          console.log('No data available')
        }
      })
      .catch((error) => {
        console.error(error)
      })
  }, [])

  const menuValues = Object.values(menuItems).map((item) => item.name)
  const items: MenuProps['items'] = menuValues.map((key) => ({
    key,
    label: (
      <Link to="https://ant.design" rel="noopener noreferrer">
        {key}
      </Link>
    ),
  }))

  return (
    <Menu
      theme="dark"
      mode="horizontal"
      defaultSelectedKeys={['1']}
      items={items}
      style={{ flex: 1, minWidth: 0 }}
    />
  )
}
