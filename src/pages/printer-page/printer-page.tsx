import { isPrinter } from '@/shared/lib/functions'

import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { Card, Flex, message, Popconfirm } from 'antd'
import Meta from 'antd/es/card/Meta'

import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import { printerByIdQuery } from '@/entities/printer/queries'
import { useQuery } from '@tanstack/react-query'

export const PrinterPage = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { id } = useParams()

  const { data: items, isLoading } = useQuery({
    ...printerByIdQuery(id!),
    initialData: {},
  })

  const onEdit = () => {
    navigate(`${location.pathname}/edit`, { state: { location: location.pathname } })
  }

  return (
    <>
      {!isLoading && (
        <Flex justify={'space-around'} align={'center'} wrap={'wrap'} style={{ padding: '0 50px' }}>
          {items && id ? (
            isPrinter(items) && (
              <Card
                hoverable
                style={{ width: 300, marginTop: 20 }}
                cover={<img alt="example" src={items.image} height={400} />}
                actions={[
                  <EditOutlined style={{ color: 'green' }} key="edit" onClick={onEdit} />,
                  <Popconfirm
                    title="Подтвердите удаление"
                    description="Вы действительно хотите удалить МФУ?"
                    onConfirm={() => {
                      //dispatch(deletePrinter(id))
                      message.error('МФУ удалено')
                      navigate(-1)
                    }}
                    okText="Да"
                    cancelText="Нет">
                    <DeleteOutlined style={{ color: 'red' }} key="delete" />,
                  </Popconfirm>,
                ]}>
                <Meta title={items.title} description={items.description} />
                <Meta description={items.ip} />
              </Card>
            )
          ) : (
            <>
              <h3>
                МФУ не найдено.{' '}
                <strong>
                  <Link to={''} onClick={() => navigate(-1)}>
                    Назад
                  </Link>
                </strong>
              </h3>
            </>
          )}
        </Flex>
      )}
    </>
  )
}
