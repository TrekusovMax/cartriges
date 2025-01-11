import { Flex } from 'antd'
import { Link } from 'react-router-dom'
import { OfficeCard } from '@/widgets/office-card'
import { ROUTER_PATHS } from '@/shared/constants/routes'
import { useOfficesList } from '@/features/office'

export const MainPage = () => {
  const { data: offices } = useOfficesList()
  return (
    <div>
      <Flex gap="middle" align="stretch" vertical>
        <Flex
          style={{ width: '100%', height: 200 }}
          justify="space-evenly"
          align="flex-start">
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
    </div>
  )
}
