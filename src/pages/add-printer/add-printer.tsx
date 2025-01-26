import { AddPrinterForm } from '@/features/form'
import { useOfficesList } from '@/features/office'
import { usePrintersList } from '@/features/printer'

export const AddPrinter = () => {
  const { data: officeData } = useOfficesList()
  const { data: printerData } = usePrintersList()
  const offises = Object.values(officeData).map((office) => office.name)

  return <AddPrinterForm data={offises} />
}
