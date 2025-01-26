import { Flex, Form } from 'antd'

export const PrinterForm = ({
  children,
  name,
  onFinishAction,
}: {
  children: React.ReactNode
  name: string
  onFinishAction: (payload?: any) => void
}) => {
  return (
    <Form
      name={name}
      onFinish={onFinishAction}
      layout="horizontal"
      labelAlign="left"
      labelCol={{ flex: '1 0 auto' }}
      wrapperCol={{ flex: '0 1 300px' }}>
      <Flex vertical gap="middle" align="center">
        {children}
      </Flex>
    </Form>
  )
}
