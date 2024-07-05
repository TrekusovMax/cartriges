import { useGetPrintersQuery } from '@/entities/printer/api'
import { Link, useParams } from 'react-router-dom'

import { Card, Flex } from 'antd'
import { useEffect, useState } from 'react'
import { IPrinter } from '@/entities/printer/api/printer.api.types'

const { Meta } = Card

export const Office = () => {
  const { office, printer } = useParams()
  const { data: printerData } = useGetPrintersQuery()

  if (!office) {
    // return <Navigate to={'/'} />
  }
  const [items, setItems] = useState<IPrinter[]>([])
  useEffect(() => {
    if (printerData) {
      if (office) {
        setItems(Object.values(printerData).filter((item) => item.office === office))
      } else if (printer) {
        setItems(Object.values(printerData).filter((item) => item.title === printer))
      }
    }
  }, [printerData, office, printer])

  return (
    <>
      <Flex justify={'space-between'} align={'center'} wrap={'wrap'} style={{ padding: '0 50px' }}>
        {items.length &&
          printerData &&
          items.map((elem, index) => (
            <Link to={Object.keys(printerData)[index]} key={index}>
              <Card
                hoverable
                style={{ width: 300, marginTop: 20 }}
                cover={<img alt="example" src={elem.image} height={400} />}>
                <Meta title={elem.title} description={elem.description} />
                <Meta description={elem.ip} />
              </Card>
            </Link>
          ))}
      </Flex>
    </>
  )
}
