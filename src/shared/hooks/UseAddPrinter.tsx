import { useState } from 'react'

import { UploadChangeParam, UploadFile } from 'antd/es/upload'

export const useAddPrinter = () => {
  const [fileUpload, setFileUpload] = useState<File | null>(null)
  const [showUploadList, setShowUploadList] = useState(true)

  const onChange = (info: UploadChangeParam<UploadFile<any>>) => {
    const { status } = info.file
    setShowUploadList(true)
    if (status === 'removed') {
      setFileUpload(null)
    }
  }
  const onChangeIp: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    let value = e.target.value

    // Удаляем все символы, кроме цифр и точек
    value = value.replace(/[^0-9.]/g, '')

    // Разбиваем строку на части, разделенные точками
    const parts = value.split('.').slice(0, 4)

    // Ограничиваем каждую часть до 3 цифр
    for (let i = 0; i < parts.length; i++) {
      if (parts[i].length > 3) {
        parts[i] = parts[i].slice(0, 3)
      }
    }

    // Соединяем части обратно в строку
    value = parts.join('.')

    // Обновляем значение поля ввода
    e.target.value = value
  }

  return {
    onChange,
    onChangeIp,
    showUploadList,
    fileUpload,
    setFileUpload,
    setShowUploadList,
  }
}
