import { useAppDispatch } from '@/app/providers/store-provider/store.types'
import { useGetPrintersQuery } from '@/entities/printer/api'
import { IPrinter } from '@/entities/printer/api/printer.api.types'
import { deletePrinter } from '@/entities/printer/model'
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
  const dispatch = useAppDispatch()

  const { id } = useParams()
  const { data: printerData } = useGetPrintersQuery()

  useEffect(() => {
    if (printerData) {
      if (id) {
        const data = printerData[id]
        if (data) {
          setItems(data ?? undefined)
        }
      }
    }
  }, [printerData])

  //console.log(items)
  const onEdit = () => {
    navigate(`${location.pathname}/edit`, { state: { location: location.pathname } })
  }

  return (
    <>
      <Flex justify={'space-around'} align={'center'} wrap={'wrap'} style={{ padding: '0 50px' }}>
        {printerData && id ? (
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
                    dispatch(deletePrinter(id))
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
          <Loader />
        )}
      </Flex>
    </>
  )
}
