import { useGetPrintersQuery } from '@/entities/printer/api'
import { Link, useParams } from 'react-router-dom'

import { Card, Flex } from 'antd'
import { useEffect, useState } from 'react'
import { DBOffices, IPrinter } from '@/entities/printer/api/printer.api.types'

const { Meta } = Card

export const Office = () => {
  const { office, printer } = useParams()
  const { data: printerData } = useGetPrintersQuery()

  const [items, setItems] = useState<IPrinter[]>([])
  useEffect(() => {
    if (printerData) {
      const pData: DBOffices = JSON.parse(JSON.stringify(printerData))
      Object.keys(printerData).map((key) => {
        pData[key].id = key
      })
      if (office) {
        setItems(Object.values(pData).filter((item) => item.office === office))
      } else if (printer) {
        setItems(Object.values(pData).filter((item) => item.title === printer))
      }
    }
  }, [printerData, office, printer])

  // console.log(items)

  return (
    <>
      <Flex justify={'space-around'} align={'center'} wrap={'wrap'} style={{ padding: '0 50px' }}>
        {printerData &&
          items.map((elem, index) => (
            <Link to={`${import.meta.env.VITE_HOST}/printer/${items[index].id}`} key={index}>
              <Card
                hoverable
                style={{ width: 300, marginTop: 20 }}
                cover={<img alt={elem.title} src={elem.image} height={400} />}>
                <Meta title={elem.title} description={elem.description} />
                <Meta description={elem.ip} />
              </Card>
            </Link>
          ))}
      </Flex>
    </>
  )
}
