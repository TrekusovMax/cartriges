import { useState } from 'react'
import { storage } from '@/shared/config/firebase/firebase-config'
import { InboxOutlined } from '@ant-design/icons'
import { Button, Flex, Form, Input, Progress, Select, Space, Upload, message } from 'antd'
import { RcFile, UploadChangeParam, UploadFile } from 'antd/es/upload'
import { UploadTaskSnapshot, getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'

type ProgressStatuses = 'normal' | 'exception' | 'active' | 'success'

export const AddPrinterForm = () => {
  const [progress, setProgress] = useState(0)
  const [showProgress, setShowProgress] = useState(false)
  const [uploadStatus, setUploadStatus] = useState<ProgressStatuses>('active')
  const [fileUpload, setFileUpload] = useState<File | null>(null)

  const normFile = (e: any) => {
    console.log('Upload event:', e)
    if (Array.isArray(e)) {
      return e
    }
    return e?.fileList
  }

  const onFinish = () => {
    if (fileUpload) {
      setShowProgress(true)
      const imageRef = ref(storage, `printers/ ${fileUpload.name}`)

      const uploadTask = uploadBytesResumable(imageRef, fileUpload)
      uploadTask.on(
        'state_changed',
        (snapshot: UploadTaskSnapshot) => {
          setProgress(Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100))

          //console.log('Upload is ' + progress + '% done')
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused')
              break
            case 'running':
              console.log('Upload is running')
              break
          }
        },
        () => {
          setUploadStatus('exception')
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            message.success('Image uploaded')
            console.log('File available at', downloadURL)
          })
          setUploadStatus('success')
        },
      )
    }
  }
  const onChange = (info: UploadChangeParam<UploadFile<any>>) => {
    const { status } = info.file

    if (status === 'removed') {
      setFileUpload(null)
    }
  }

  const onReset = () => {
    setShowProgress(false)
    setFileUpload(null)
  }

  return (
    <Form name="printerInfo" onFinish={onFinish}>
      <Flex vertical gap="middle" align="center" style={{ width: '100%' }}>
        <Form.Item>
          <Form.Item
            name="printerImage"
            valuePropName="fileList"
            getValueFromEvent={normFile}
            noStyle>
            <Upload.Dragger
              style={{ display: fileUpload?.size ? 'none' : '', width: '100%' }}
              name="uploadFile"
              type="select"
              action={import.meta.env.VITE_HOST}
              listType="picture"
              accept=".jpg,.jpeg,.png"
              beforeUpload={(file: RcFile) => {
                setFileUpload(file)
                return false
              }}
              onChange={(info) => onChange(info)}>
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">Нажмите или перетащите файлы для загрузки</p>
              <p className="ant-upload-hint">Можно загружать только один файл</p>
            </Upload.Dragger>
          </Form.Item>
        </Form.Item>
        <Flex
          align="center"
          style={{
            width: '25%',
            display: showProgress ? 'flex' : 'none',
          }}>
          <Progress percent={progress} size="default" status={uploadStatus} />
        </Flex>
        <Flex align="center" justify="space-evenly" vertical>
          <Form.Item label="Наименование" style={{ width: 350 }}>
            <Input />
          </Form.Item>
          <Form.Item label="Серийный номер" style={{ width: 350 }}>
            <Input />
          </Form.Item>
          <Form.Item label="Учётный номер Xerox" style={{ width: 350 }}>
            <Input />
          </Form.Item>
          <Form.Item label="IP адрес" style={{ width: 350 }}>
            <Input />
          </Form.Item>

          <Form.Item label="Офис">
            <Select style={{ width: 300 }}>
              <Select.Option value="dmitrov">Дмитров</Select.Option>
              <Select.Option value="sposad">Сергиев Посад</Select.Option>
              <Select.Option value="taldom">Талдом</Select.Option>
            </Select>
          </Form.Item>
        </Flex>
        <Flex align="center" justify="space-between">
          <Space>
            <Button disabled={fileUpload ? false : true} type="primary" htmlType="submit">
              Добавить
            </Button>
            <Button htmlType="reset" onClick={onReset}>
              Сброс
            </Button>
          </Space>
        </Flex>
      </Flex>
    </Form>
  )
}
