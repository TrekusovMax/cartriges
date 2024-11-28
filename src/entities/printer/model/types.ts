import { ReactNode } from 'react'
import { ControllerRenderProps, FieldPath, FieldValues } from 'react-hook-form'

import type { Control, FieldErrors, UseFormHandleSubmit, UseFormReset } from 'react-hook-form'

type FormControl<T extends FieldValues> = {
  control: Control<T, any>
  handleSubmit: UseFormHandleSubmit<T, T | undefined>
  reset: UseFormReset<T>
  errors: FieldErrors<T>
}

type ProgressStatuses = 'normal' | 'exception' | 'active' | 'success'

export interface PrinterFormProps<T extends FieldValues, TName extends FieldPath<T>> {
  formControl: FormControl<T>
  showImage: boolean
  showProgress: boolean
  imgUrl: string
  imageSelected: React.MutableRefObject<boolean>
  progress: number
  uploadStatus: ProgressStatuses
  AddPrinterSelect?: () => ReactNode
  setShowImage: (value: React.SetStateAction<boolean>) => void
  AddPrinterImage: () => ReactNode
  onFinish: (data: T) => void
  fileUpload: File | null
  UiSelect?: (field: ControllerRenderProps) => React.ReactElement
  setCheckedColorField: (value: React.SetStateAction<boolean>) => void
  renderDataSelect: ({ field }: { field: ControllerRenderProps<T, TName> }) => React.ReactElement
}
