import { useGetPrintersQuery } from '@/entities/printer/api'
import { DBOffices, IPrinter } from '@/entities/printer/api/printer.api.types'
import { isPrinter, isPrintersArray } from '@/shared/functions'
import { Loader } from '@/shared/ui/loader'

import { Card, Flex } from 'antd'
import Meta from 'antd/es/card/Meta'
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

export const PrintersListPage = () => {
  const [items, setItems] = useState<IPrinter[] | IPrinter>([])

  const { printer, office, id } = useParams()
  const { data: printerData } = useGetPrintersQuery()

  useEffect(() => {
    if (printerData) {
      const pData: DBOffices = JSON.parse(JSON.stringify(printerData))
      Object.keys(printerData).map((key) => {
        pData[key].id = key
      })

      if (id) {
        console.log(id)

        setItems(printerData[id])
      } else if (printer) {
        setItems(
          Object.values(pData).filter((item) => item.title === printer && item.office === office),
        )
      }
    }
  }, [printerData, office, printer])

  return (
    <>
      <Flex justify={'space-around'} align={'center'} wrap={'wrap'} style={{ padding: '0 50px' }}>
        {printerData ? (
          isPrintersArray(items) &&
          items.map((elem, index) => (
            <Link to={`${import.meta.env.VITE_HOST}/printer/${items[index].id}`} key={index}>
              <Card
                hoverable
                style={{ width: 300, marginTop: 20 }}
                cover={<img alt="example" src={elem.image} height={400} />}>
                <Meta title={elem.title} description={elem.description} />
                <Meta description={elem.ip} />
              </Card>
            </Link>
          ))
        ) : (
          <Loader />
        )}
        {printerData ? (
          isPrinter(items) && (
            <Card
              hoverable
              style={{ width: 300, marginTop: 20 }}
              cover={<img alt="example" src={items.image} height={400} />}>
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
