import { InboxOutlined } from '@ant-design/icons'
import { Upload } from 'antd'
import { RcFile, UploadChangeParam, UploadFile } from 'antd/es/upload'
import { useState } from 'react'

interface IParams {
  fileUpload: File | null
  setFileUpload: React.Dispatch<React.SetStateAction<File | null>>
}

export const UploadDragger = ({ fileUpload, setFileUpload }: IParams) => {
  const [showUploadList, setShowUploadList] = useState(true)

  const onChange = (info: UploadChangeParam<UploadFile<any>>) => {
    const { status } = info.file
    setShowUploadList(true)
    if (status === 'removed') {
      setFileUpload(null)
    }
  }
  return (
    <Upload.Dragger
      maxCount={1}
      style={{ display: fileUpload?.size ? 'none' : '' }}
      name="uploadFile"
      type="select"
      action={import.meta.env.VITE_HOST}
      listType="picture"
      accept=".jpg,.jpeg,.png,.webp"
      beforeUpload={(file: RcFile) => {
        setFileUpload(file)
        return false
      }}
      onRemove={() => {
        setShowUploadList(false)
      }}
      showUploadList={showUploadList}
      onChange={(info) => onChange(info)}>
      <p className="ant-upload-drag-icon">
        <InboxOutlined />
      </p>
      <p className="ant-upload-text">Нажмите или перетащите файлы для загрузки</p>
      <p className="ant-upload-hint">Можно загружать только один файл</p>
    </Upload.Dragger>
  )
}
