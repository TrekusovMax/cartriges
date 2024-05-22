import { useState } from 'react'
import { storage } from '@/shared/config/firebase/firebase-config'
import { InboxOutlined } from '@ant-design/icons'
import { Button, Flex, Form, Progress, Space, Upload, message } from 'antd'
import { RcFile, UploadChangeParam, UploadFile } from 'antd/es/upload'
import { UploadTaskSnapshot, getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'

type ProgressStatuses = 'normal' | 'exception' | 'active' | 'success'

export const AddPrinterForm = () => {
  const [progress, setProgress] = useState(0)
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
    //console.log('Received values of form: ', values)
    if (fileUpload) {
      const imageRef = ref(storage, `printers/ ${fileUpload.name}`)

      const uploadTask = uploadBytesResumable(imageRef, fileUpload)
      uploadTask.on(
        'state_changed',
        (snapshot: UploadTaskSnapshot) => {
          setProgress((snapshot.bytesTransferred / snapshot.totalBytes) * 100)

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
      /* .then((e) => {
          console.log(e)
          message.success('Image uploaded')
        })
        .catch((e) => message.error(e)) */
    }
  }
  const onSubmit = () => {}

  return (
    <Form name="validate_other" onFinish={onFinish}>
      <Flex vertical gap="middle" align="center" style={{ width: '100%' }}>
        <Form.Item>
          <Form.Item name="dragger" valuePropName="fileList" getValueFromEvent={normFile} noStyle>
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
              onChange={(info: UploadChangeParam<UploadFile<any>>) => {
                const { status } = info.file

                if (status !== 'uploading') {
                  console.log(info.file)
                }
                if (status === 'removed') {
                  setFileUpload(null)
                }
              }}>
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">Нажмите или перетащите файлы для загрузки</p>
              <p className="ant-upload-hint">Можно загружать только один файл</p>
            </Upload.Dragger>
          </Form.Item>
        </Form.Item>
        <Flex align="center" style={{ width: '25%' }}>
          <Progress percent={progress} size="default" status={uploadStatus} />
        </Flex>
        <Flex align="center" justify="space-between">
          <Space>
            <Button type="primary" htmlType="submit" onClick={() => onSubmit}>
              Submit
            </Button>
            <Button htmlType="reset" onClick={() => setFileUpload(null)}>
              reset
            </Button>
          </Space>
        </Flex>
      </Flex>
    </Form>
  )
}
