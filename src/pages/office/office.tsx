import { useParams } from 'react-router-dom'

export const Office = () => {
  const { office, printer } = useParams()
  if (!office) {
    // return <Navigate to={'/'} />
  }

  return (
    <>
      <div>{office}</div>
      <div>{printer}</div>
    </>
  )
}
