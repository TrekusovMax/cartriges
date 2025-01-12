import { useInvaliatePrintersList } from '@/entities/printer/queries'
import { printersApi } from '@/shared/api/modules/printer'
import { useMutation } from '@tanstack/react-query'
import { PrinterData } from './types'

export const usePrinterUpdate = (id: string) => {
  const invalidateList = useInvaliatePrintersList(id)

  const updatePrinterMutation = useMutation({
    mutationFn: printersApi.updatePrinter,
    onSuccess: async () => {
      await invalidateList()
    },
  })
  const updatePrinter = async (data: PrinterData) => {
    const { mutateAsync: update } = updatePrinterMutation
    try {
      await update({ ...data, id })
    } catch (error: any) {
      throw new Error(error)
    }
  }

  return { updatePrinter }
}
