import { useGetPrintersQuery } from '@/entities/printer/api'
import { IPrinter } from '@/entities/printer/api/printer.api.types'
import { isPrinter } from '@/shared/functions'
import { Loader } from '@/shared/ui/loader'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { Card, Flex, message, Popconfirm } from 'antd'
import Meta from 'antd/es/card/Meta'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'

export const PrinterPage = () => {
  const [items, setItems] = useState<IPrinter[] | IPrinter>([])
  const navigate = useNavigate()
  const location = useLocation()

  const { printer, office, id } = useParams()
  const { data: printerData } = useGetPrintersQuery()

  useEffect(() => {
    if (printerData) {
      if (id) {
        setItems(printerData[id])
      } else if (printer) {
        setItems(
          Object.values(printerData).filter(
            (item) => item.title === printer && item.office === office,
          ),
        )
      }
    }
  }, [printerData, office, printer])

  const onEdit = () => {
    navigate(`${location.pathname}/edit`, { state: { location: location.pathname } })
  }

  return (
    <>
      <Flex justify={'space-around'} align={'center'} wrap={'wrap'} style={{ padding: '0 50px' }}>
        {printerData ? (
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
                  onConfirm={() => message.error('МФУ удалено')}
                  okText="Да"
                  cancelText="Нет">
                  <DeleteOutlined
                    style={{ color: 'red' }}
                    key="delete"
                    onClick={() => console.log('delete')}
                  />
                  ,
                </Popconfirm>,
              ]}>
              <Meta title={items.title} description={items.description} />
              <Meta description={items.ip} />
            </Card>
          )
        ) : (
          <Loader />
        )}
      </Flex>
    </>
  )
}
