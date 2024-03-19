import { Breadcrumb as AntdBreadcrumb } from 'antd'

export const Breadcrumb = () => {
  return (
    <AntdBreadcrumb
      style={{ padding: '16px' }}
      items={[
        { title: 'Home', href: '/' },
        { title: 'List', href: '/' },
        { title: 'App', href: '/' },
      ]}
    />
  )
}
