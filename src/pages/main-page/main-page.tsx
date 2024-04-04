import { useGetOfficesQuery } from '@/entities/app/api'
import { OfficeCard } from '@/widgets/office-card'

import { Flex } from 'antd'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export const MainPage = () => {
  const { data } = useGetOfficesQuery()

  const [offices, setOffices] = useState<string[]>([])

  useEffect(() => {
    if (data) {
      setOffices(Object.keys(data))
    }
  }, [data])

  return (
    <div>
      {
        <Flex gap="middle" align="stretch" vertical>
          <Flex style={{ width: '100%', height: 200 }} justify="space-evenly" align="flex-start">
            {data &&
              offices.map((office) => (
                <Link to={`/${office}`} key={office}>
                  <OfficeCard
                    title={data[office].name}
                    imgSrc={data[office].image}
                    description={data[office].address}
                  />
                </Link>
              ))}
          </Flex>
        </Flex>
      }
    </div>
  )
}
