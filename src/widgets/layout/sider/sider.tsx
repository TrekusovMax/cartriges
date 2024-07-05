import { Layout, theme } from 'antd'
import { SideMenu } from '../side-menu'

export const Sider = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken()
  return (
    <Layout.Sider style={{ background: colorBgContainer, height: '100%' }} width={300}>
      <SideMenu />
    </Layout.Sider>
  )
}
