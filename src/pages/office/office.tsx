import { useGetPrintersQuery } from '@/entities/printer/api'
import { Link, useNavigate, useParams } from 'react-router-dom'

import { Card, Flex, message, Popconfirm } from 'antd'
import { useEffect, useState } from 'react'
import { IPrinter } from '@/entities/printer/api/printer.api.types'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'

const { Meta } = Card

export const Office = () => {
  const { office, printer } = useParams()
  const { data: printerData } = useGetPrintersQuery()
  const navigate = useNavigate()
  const [items, setItems] = useState<IPrinter[]>([])
  useEffect(() => {
    if (printerData) {
      if (office) {
        const elems = Object.values(printerData) /* .map((elem, index) => [
          { ...elem, id: printerData[index] },
        ]) */
        console.log(elems)
        console.log(printerData)
        setItems(Object.values(printerData).filter((item) => item.office === office))
      } else if (printer) {
        setItems(Object.values(printerData).filter((item) => item.title === printer))
      }
    }
  }, [printerData, office, printer])
  const onEdit = () => {
    navigate(`${location.pathname}/edit`, { state: { location: location.pathname } })
  }
  console.log(items)

  return (
    <>
      <Flex justify={'space-between'} align={'center'} wrap={'wrap'} style={{ padding: '0 50px' }}>
        {printerData &&
          items.map((elem, index) => (
            <Link
              to={`${import.meta.env.VITE_HOST}/printer/${items[index].serialNumber}`}
              key={index}>
              <Card
                hoverable
                style={{ width: 300, marginTop: 20 }}
                cover={<img alt="example" src={elem.image} height={400} />}
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
                <Meta title={elem.title} description={elem.description} />
                <Meta description={elem.ip} />
              </Card>
            </Link>
          ))}
      </Flex>
    </>
  )
}
