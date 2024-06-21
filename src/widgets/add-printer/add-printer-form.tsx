import { useEffect, useRef, useState } from 'react'
import { storage } from '@/shared/config/firebase/firebase-config'
import { InboxOutlined, PlusOutlined } from '@ant-design/icons'
import {
  Button,
  Divider,
  Flex,
  Form,
  Input,
  InputRef,
  Progress,
  Select,
  Space,
  Upload,
  message,
} from 'antd'
import { RcFile, UploadChangeParam, UploadFile } from 'antd/es/upload'
import { UploadTaskSnapshot, getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import { IPrinter } from '@/entities/printer/api/printer.api.types'
import { useAddPrinterMutation, useGetPrintersQuery } from '@/entities/printer/api'

type ProgressStatuses = 'normal' | 'exception' | 'active' | 'success'

export const AddPrinterForm = () => {
  const [progress, setProgress] = useState(0)
  const [showProgress, setShowProgress] = useState(false)
  const [showUploadList, setShowUploadList] = useState(true)
  const [uploadStatus, setUploadStatus] = useState<ProgressStatuses>('active')
  const [fileUpload, setFileUpload] = useState<File | null>(null)

  const [addPrinter] = useAddPrinterMutation()
  const { data } = useGetPrintersQuery()

  const [items, setItems] = useState<string[]>([])
  const [name, setName] = useState('')
  const inputRef = useRef<InputRef>(null)

  const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value)
  }

  const addItem = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    e.preventDefault()
    if (!name.trim().length) return
    if (items.indexOf(name.trim()) >= 0) {
      setName('')
      return
    }
    setItems([...items, name])
    setName('')
    setTimeout(() => {
      inputRef.current?.focus()
    }, 0)
  }

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IPrinter>()

  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e
    }
    return e?.fileList
  }
  useEffect(() => {
    if (data) {
      const dataKeys = Object.keys(data)
      const printerList = new Set<string>()

      dataKeys.map((k: string) => {
        printerList.add(data[k].title)
      })

      setItems(Array.from(printerList))
    }
  }, [data])

  const ipRegex =
    /^(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])$/

  const onFinish: SubmitHandler<IPrinter> = (data) => {
    if (fileUpload) {
      setShowProgress(true)
      const imageRef = ref(storage, `printers/ ${fileUpload.name}`)

      const uploadTask = uploadBytesResumable(imageRef, fileUpload)
      uploadTask.on(
        'state_changed',
        (snapshot: UploadTaskSnapshot) => {
          setProgress(Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100))

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
            addPrinter({
              title: data.title,
              image: downloadURL,
              ip: data.ip,
              office: data.office,
              serialNumber: data.serialNumber,
              xeroxNumber: data.xeroxNumber,
            })
          })
          setUploadStatus('success')
          onReset()

          message.success('Принтер добавлен')
        },
      )
    }
  }
  const onChange = (info: UploadChangeParam<UploadFile<any>>) => {
    const { status } = info.file
    setShowUploadList(true)
    if (status === 'removed') {
      setFileUpload(null)
    }
  }

  const onReset = () => {
    setShowProgress(false)
    setFileUpload(null)
    setShowUploadList(false)
    reset()
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

  return (
    <Form name="printerInfo" onFinish={handleSubmit(onFinish)}>
      <Flex vertical gap="middle" align="center" style={{ width: '100%' }}>
        <Form.Item
          name="printerImage"
          valuePropName="fileList"
          getValueFromEvent={normFile}
          style={{ width: 400 }}>
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
        </Form.Item>

        <Flex
          align="center"
          style={{
            width: '25%',
            display: showProgress ? 'flex' : 'none',
          }}>
          <Progress percent={progress} size="default" status={uploadStatus} />
        </Flex>
        <Flex align="center" justify="space-evenly" vertical style={{ width: 400 }}>
          <Form.Item
            label="Наименование"
            validateStatus={errors.title ? 'error' : ''}
            help={errors.title ? errors.title.message : ''}
            style={{ width: '100%' }}>
            <Controller
              name="title"
              control={control}
              defaultValue=""
              rules={{ required: 'Наименование не должно быть пустым' }}
              render={({ field }) => (
                <Select
                  {...field}
                  placeholder="Выберите МФУ или добавте новую"
                  dropdownRender={(menu) => (
                    <>
                      {menu}
                      <Divider style={{ margin: '8px 0' }} />
                      <Space style={{ padding: '0 8px 4px' }}>
                        <Input
                          style={{ width: '100%' }}
                          placeholder="Введите название"
                          ref={inputRef}
                          value={name}
                          onChange={onNameChange}
                          onKeyDown={(e) => e.stopPropagation()}
                        />
                      </Space>
                      <Button type="text" icon={<PlusOutlined />} onClick={addItem}>
                        Добавить МФУ
                      </Button>
                    </>
                  )}
                  options={items.map((item) => ({ label: item, value: item }))}
                />
              )}
            />
          </Form.Item>
          <Form.Item
            label="Серийный номер"
            validateStatus={errors.serialNumber ? 'error' : ''}
            help={errors.serialNumber ? errors.serialNumber.message : ''}
            style={{ width: '100%' }}>
            <Controller
              name="serialNumber"
              control={control}
              defaultValue=""
              rules={{ required: 'Номер не должен быть пустым' }}
              render={({ field }) => <Input {...field} />}
            />
          </Form.Item>
          <Form.Item
            label="Учётный номер Xerox"
            validateStatus={errors.xeroxNumber ? 'error' : ''}
            help={errors.xeroxNumber ? errors.xeroxNumber.message : ''}
            style={{ width: '100%' }}>
            <Controller
              name="xeroxNumber"
              control={control}
              defaultValue=""
              rules={{ required: 'Номер не должен быть пустым' }}
              render={({ field }) => <Input {...field} />}
            />
          </Form.Item>
          <Form.Item
            label="IP адрес"
            style={{ width: '100%' }}
            validateStatus={errors.ip ? 'error' : ''}
            help={errors.ip ? errors.ip.message : ''}>
            <Controller
              name="ip"
              control={control}
              defaultValue=""
              render={({ field }) => <Input {...field} onInput={onChangeIp} />}
              rules={{
                pattern: {
                  value: ipRegex,
                  message: 'Не корректный форма IP адреса',
                },
              }}
            />
          </Form.Item>
          <Form.Item
            label="Офис"
            validateStatus={errors.office ? 'error' : ''}
            help={errors.office ? errors.office.message : ''}
            style={{ width: '100%' }}>
            <Controller
              name="office"
              control={control}
              defaultValue=""
              rules={{ required: 'Офис не должен быть пустым' }}
              render={({ field }) => (
                <Select {...field}>
                  <Select.Option value="dmitrov">Дмитров</Select.Option>
                  <Select.Option value="sposad">Сергиев Посад</Select.Option>
                  <Select.Option value="taldom">Талдом</Select.Option>
                </Select>
              )}
            />
          </Form.Item>
        </Flex>
        <Flex align="center" justify="space-between">
          <Space>
            <Button
              disabled={fileUpload && !Object.keys(errors).length ? false : true}
              type="primary"
              htmlType="submit">
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
