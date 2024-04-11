import { useGetPrintersQuery } from '@/entities/printer/api'

export const AddPrinter = () => {
  const { data } = useGetPrintersQuery()
  console.log(data?.items)

  return <div>add-prin</div>
}
