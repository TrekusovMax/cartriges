import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Card, Flex } from 'antd'
import Meta from 'antd/es/card/Meta'

import { Printers, IPrinter } from '@/entities/printer/api/types'
import { isPrinter, isPrintersArray } from '@/shared/lib/functions'
import { usePrintersList } from '@/features/printer'

export const PrintersListPage = () => {
  const [items, setItems] = useState<IPrinter[] | IPrinter>([])

  const { printer, office } = useParams()
  const { data: printerData } = usePrintersList()

  useEffect(() => {
    const pData: Printers = JSON.parse(JSON.stringify(printerData))
    Object.keys(printerData).map((key) => {
      pData[key].id = key
    })

    if (printer) {
      setItems(
        Object.values(pData).filter(
          (item) => item.title === printer && item.office === office,
        ),
      )
    }
  }, [office, printer])

  return (
    <>
      <Flex
        justify={'space-around'}
        align={'center'}
        wrap={'wrap'}
        style={{ padding: '0 50px' }}>
        {isPrintersArray(items) &&
          items.map((elem, index) => (
            <Link to={`${items[index].id}`} key={index}>
              <Card
                hoverable
                style={{ width: 300, marginTop: 20 }}
                cover={
                  <img alt="example" src={elem.image} height={400} />
                }>
                <Meta title={elem.title} description={elem.description} />
                <Meta description={elem.ip} />
              </Card>
            </Link>
          ))}
        {isPrinter(items) && (
          <Card
            hoverable
            style={{ width: 300, marginTop: 20 }}
            cover={<img alt="example" src={items.image} height={400} />}>
            <Meta title={items.title} description={items.description} />
            <Meta description={items.ip} />
          </Card>
        )}
      </Flex>
    </>
  )
}
