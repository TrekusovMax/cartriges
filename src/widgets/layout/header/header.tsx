import { Layout } from 'antd'
import { HeaderMenu } from '../../header-menu'
import { Link } from 'react-router-dom'

export const Header = () => {
  return (
    <Layout.Header style={{ display: 'flex', alignItems: 'center' }}>
      <Link to="/">
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
      </Link>
      <HeaderMenu />
    </Layout.Header>
  )
}
