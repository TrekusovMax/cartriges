import { useParams } from 'react-router-dom'

export const Office = () => {
  const { office } = useParams()
  return <div>{office}</div>
}
