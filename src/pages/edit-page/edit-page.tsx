import { useLocation, useNavigate } from 'react-router-dom'

export const EditPage = () => {
  const navigate = useNavigate()
  const location = useLocation()

  console.log(location.state)

  return <div>{location.pathname}</div>
}
