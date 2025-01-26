import { create } from 'zustand'

interface PrinterStore {
  fileUpload: boolean

  showProgress: boolean
  setShowProgress: (value: boolean) => void
}

export const usePrinterStore = create<PrinterStore>((set, get) => ({
  fileUpload: false,
  showProgress: false,
  setShowProgress: (value: boolean) => set({ showProgress: value }),
}))
