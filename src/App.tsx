import React from 'react'
import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons'
import type { MenuProps } from 'antd'
import { Breadcrumb, Layout, Menu, theme } from 'antd'
import { child, get, getDatabase, ref } from 'firebase/database'

const { Header, Content, Footer, Sider } = Layout

const items1: MenuProps['items'] = ['1', '2', '3'].map((key) => ({
  key,
  label: `nav ${key}`,
}))

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

const App: React.FC = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken()

  const dbRef = ref(getDatabase())
  get(child(dbRef, `offices/`))
    .then((snapshot) => {
      console.log(snapshot.val())
      if (snapshot.exists()) {
        console.log(snapshot.val())
      } else {
        console.log('No data available')
      }
    })
    .catch((error) => {
      console.error(error)
    })

  return (
    <Layout
      style={{
        width: '100svw',
        height: '100svh',
        display: 'flex',
        justifyContent: 'space-between',
      }}>
      <Header style={{ display: 'flex', alignItems: 'center' }}>
        <div
          style={{
            width: 120,
            minWidth: 120,
            height: 32,
            background: 'rgba(255, 255, 255, 0.2)',
            borderRadius: 6,
            marginInlineEnd: 24,
          }}
        />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['2']}
          items={items1}
          style={{ flex: 1, minWidth: 0 }}
        />
      </Header>
      <Content style={{ padding: '0 48px' }}>
        <Breadcrumb
          style={{ padding: '16px' }}
          items={[
            { title: 'Home', href: '/' },
            { title: 'List', href: '/' },
            { title: 'App', href: '/' },
          ]}
        />

        <Layout
          style={{
            padding: '24px 0',
            background: colorBgContainer,
            borderRadius: 10,
            height: 'calc(98% - 40px)',
          }}>
          <Sider style={{ background: colorBgContainer, height: '100%' }} width={200}>
            <Menu
              mode="inline"
              defaultSelectedKeys={['1']}
              defaultOpenKeys={['sub']}
              style={{ height: '100%' }}
              items={items2}
            />
          </Sider>
          <Content style={{ padding: '0 24px', minHeight: 280 }}>Content</Content>
        </Layout>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        Ant Design ©{new Date().getFullYear()} Created by Ant UED
      </Footer>
    </Layout>
  )
}

export default App

