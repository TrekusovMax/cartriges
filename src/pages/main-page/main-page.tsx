import { useGetOfficesQuery } from '@/entities/app/api'
import { IOffices } from '@/entities/app/model/app.types'
import { useGetPrintersQuery } from '@/entities/printer/api'
import { OfficeCard } from '@/widgets/office-card'
import { ICard } from '@/widgets/office-card/office-card.types'
import { Flex } from 'antd'
import { useEffect, useState } from 'react'

type OfficeType = {
  name: string
  image: string
}
export const MainPage = () => {
  const { data } = useGetOfficesQuery()
  const [offices, setOffices] = useState<OfficeType[]>([])
  useEffect(() => {
    if (data) {
      const officeData: OfficeType[] = Object.values(data)

      setOffices(officeData)
    }

    //offices && setSrcImg(offices[office].image)
  }, [data])
  console.log(offices)

  return (
    <div>
      {
        <Flex gap="middle" align="start" vertical>
          <Flex justify={'center'} align={'center'}>
            {offices.map((office) => (
              <OfficeCard key={office.name} title={office.name} imgSrc={office.image} />
            ))}
          </Flex>
        </Flex>
      }
    </div>
  )
}
