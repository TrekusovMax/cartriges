import { storage } from '@/shared/config/firebase/firebase-config'
import { InboxOutlined } from '@ant-design/icons'
import { Button, Form, Space, Upload, message } from 'antd'
import { RcFile, UploadChangeParam, UploadFile } from 'antd/es/upload'
import { ref, uploadBytes } from 'firebase/storage'
import { useState } from 'react'

export const AddPrinterForm = () => {
  const [fileUpload, setFileUpload] = useState<File | null>(null)
  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
  }
  const normFile = (e: any) => {
    console.log('Upload event:', e)
    if (Array.isArray(e)) {
      return e
    }
    return e?.fileList
  }
  const onFinish = () => {
    //console.log('Received values of form: ', values)
    if (fileUpload) {
      const imageRef = ref(storage, `printers/ ${fileUpload.name}`)

      uploadBytes(imageRef, fileUpload)
        .then((e) => {
          console.log(e)
          message.success('Image uploaded')
        })
        .catch((e) => message.error(e))
    }
  }
  const onSubmit = () => {}

  return (
    <Form
      name="validate_other"
      {...formItemLayout}
      onFinish={onFinish}
      initialValues={{
        'input-number': 3,
        'checkbox-group': ['A', 'B'],
        rate: 3.5,
        'color-picker': null,
      }}
      style={{ maxWidth: 600 }}
    >
      <Form.Item>
        <Form.Item
          name="dragger"
          valuePropName="fileList"
          getValueFromEvent={normFile}
          noStyle
        >
          <Upload.Dragger
            style={{ display: fileUpload?.size ? 'none' : '' }}
            name="uploadFile"
            type="select"
            action={import.meta.env.VITE_HOST}
            listType="picture"
            accept=".jpg,.jpeg,.png"
            beforeUpload={(file: RcFile) => {
              setFileUpload(file)
              return false
            }}
            onChange={(info: UploadChangeParam<UploadFile<any>>) => {
              const { status } = info.file

              if (status !== 'uploading') {
                console.log(info.file)
              }
              if (status === 'removed') {
                setFileUpload(null)
              }
            }}
          >
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">
              Нажмите или перетащите файлы для загрузки
            </p>
            <p className="ant-upload-hint">Можно загружать только один файл</p>
          </Upload.Dragger>
        </Form.Item>
      </Form.Item>
      <Form.Item wrapperCol={{ span: 12, offset: 4 }}>
        <Space>
          <Button type="primary" htmlType="submit" onClick={() => onSubmit}>
            Submit
          </Button>
          <Button htmlType="reset" onClick={() => setFileUpload(null)}>
            reset
          </Button>
        </Space>
      </Form.Item>
    </Form>
  )
}
