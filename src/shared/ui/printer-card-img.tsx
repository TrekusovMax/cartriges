import { CloseCircleOutlined } from '@ant-design/icons'
import { Badge, Card, Image } from 'antd'

export const PrinterCardImg = ({ imgUrl, onClick }: { imgUrl: string; onClick: () => void }) => {
  return (
    <Badge
      count={
        <CloseCircleOutlined style={{ color: '#f5222d', cursor: 'pointer' }} onClick={onClick} />
      }>
      <Card style={{ width: 240 }}>
        <Image preview={false} src={imgUrl} />
      </Card>
    </Badge>
  )
}
