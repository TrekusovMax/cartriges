import { useGetPrintersQuery } from '@/entities/printer/api'
import { AddPrinterForm } from '@/widgets/add-printer'

export const AddPrinter = () => {
  const { data } = useGetPrintersQuery()
  //console.log(data?.items)

  return <AddPrinterForm />
}
