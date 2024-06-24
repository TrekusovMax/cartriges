import { useGetPrintersQuery } from '@/entities/printer/api'
import { useParams } from 'react-router-dom'

export const Office = () => {
  const { office, printer } = useParams()
  const { data: printerData } = useGetPrintersQuery()
  if (!office) {
    // return <Navigate to={'/'} />
  }
  console.log(
    printerData &&
      Object.values(printerData).filter((item) => item.title === printer && item.office === office),
  )

  return (
    <>
      <div>{office}</div>
      <div>{printer}</div>
    </>
  )
}
