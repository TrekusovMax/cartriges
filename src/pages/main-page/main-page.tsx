import { Flex } from 'antd'
import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'

import { OfficeCard } from '@/widgets/office-card'
import { officesListQuery } from '@/entities/office/queries'
import { ROUTER_PATHS } from '@/shared/constants/routes'
import { Loader } from '@/shared/ui/loader'

export const MainPage = () => {
  const { data: offices, isLoading } = useQuery({
    ...officesListQuery(),
    initialData: {},
  })

  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <Flex gap="middle" align="stretch" vertical>
          <Flex style={{ width: '100%', height: 200 }} justify="space-evenly" align="flex-start">
            {Object.keys(offices).map((office) => (
              <Link to={`${ROUTER_PATHS.OFFICES}/${office}`} key={office}>
                <OfficeCard
                  title={offices[office].name}
                  imgSrc={offices[office].image}
                  description={offices[office].address}
                />
              </Link>
            ))}
          </Flex>
        </Flex>
      )}
    </div>
  )
}
