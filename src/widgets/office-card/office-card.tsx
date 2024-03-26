import { Card } from 'antd'
import { ICard } from './office-card.types'

export const OfficeCard = ({ title, imgSrc, description }: ICard) => {
  const { Meta } = Card
  return (
    <Card hoverable style={{ width: 350 }} cover={<img alt="example" src={imgSrc} />}>
      <Meta style={{ textAlign: 'center' }} title={title} description={description} />
    </Card>
  )
}
