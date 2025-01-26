import { SubmitHandler } from 'react-hook-form'
import type { UploadChangeParam, UploadFile } from 'antd/es/upload'
import { PrinterFields } from './types'
import { useCallback, useState } from 'react'

export const useFormAction = () => {
  const [checkedColorField, setCheckedColorField] = useState(false)

  const onFinish: SubmitHandler<PrinterFields> = (data) => {
    data.isColor = checkedColorField
    console.log(data)
  }

  const onChange = useCallback(
    (info: UploadChangeParam<UploadFile<any>>) => {
      const { status } = info.file
      // setShowUploadList(true)
      // imageSelected.current = false
      if (status === 'removed') {
        console.log('removed')

        //dispatch(fileRemove())
      }
    },
    [],
  )

  const onToggle = (value: React.SetStateAction<boolean>) => {
    setCheckedColorField(value)
  }

  return { onChange, onFinish, onToggle }
}
