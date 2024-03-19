import { useParams } from 'react-router-dom'

export const MainPage = () => {
  const { office } = useParams()

  return <div>{office}</div>
}
