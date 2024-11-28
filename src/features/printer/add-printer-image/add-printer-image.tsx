import { useAppDispatch, useAppSelector } from '@/app/providers/store-provider/store.types'
import { getImageLoaded, uploadFile } from '@/entities/printer/api/printer.slice'
import { InboxOutlined } from '@ant-design/icons'
import { Form, Upload } from 'antd'
import { RcFile, UploadChangeParam, UploadFile } from 'antd/es/upload'
import { memo } from 'react'

interface Props {
  onChange: (info: UploadChangeParam<UploadFile<any>>) => void
  showUploadList: boolean
  setShowUploadList: React.Dispatch<React.SetStateAction<boolean>>
}

export const AddPrinterImage = memo(({ onChange, showUploadList, setShowUploadList }: Props) => {
  const dispatch = useAppDispatch()
  const fileUpload = useAppSelector((state) => getImageLoaded(state))

  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e
    }
    return e?.fileList
  }
  return (
    <Form.Item
      name="printerImage"
      valuePropName="fileList"
      getValueFromEvent={normFile}
      style={{ width: 400 }}>
      <Upload.Dragger
        maxCount={1}
        style={{ display: fileUpload ? 'none' : '' }}
        name="uploadFile"
        type="select"
        action={import.meta.env.VITE_HOST}
        listType="picture"
        accept=".jpg,.jpeg,.png,.webp"
        beforeUpload={(file: RcFile) => {
          dispatch(uploadFile(file))
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
    </Form.Item>
  )
})
