import { useCallback, useState } from 'react'

import { Button, Flex, Form, Input, Progress, Select, Space, message } from 'antd'

import { useForm, Controller, SubmitHandler } from 'react-hook-form'
import { IPrinter } from '@/entities/printer/api/printer.api.types'
import { useAddPrinter } from '@/shared/hooks'
import { useGetOfficesQuery } from '@/entities/app/api'

import { UploadTaskSnapshot, getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { storage } from '@/shared/config/firebase/firebase-config'
import { AddPrinterSelect } from '@/shared/components'
import { AddPrinterImage } from '@/shared/ui/add-printer-image'
import { useAppDispatch, useAppSelector } from '@/app/providers/store-provider/store.types'
import { fileRemove, getImageLoaded } from '@/entities/printer/api/printer.slice'
import { UploadChangeParam, UploadFile } from 'antd/es/upload'
import { addPrinter } from '@/entities/printer/model'
import { ipRegex } from '@/shared/functions/CheckIp'

type ProgressStatuses = 'normal' | 'exception' | 'active' | 'success'

export const AddPrinterForm = () => {
  const dispatch = useAppDispatch()

  const { onChangeIp } = useAddPrinter()
  const [showUploadList, setShowUploadList] = useState(true)
  const [showProgress, setShowProgress] = useState(false)

  const [progress, setProgress] = useState(0)
  const [uploadStatus, setUploadStatus] = useState<ProgressStatuses>('active')

  const { data: offices } = useGetOfficesQuery()

  const fileUpload = useAppSelector((state) => getImageLoaded(state))

  const office = offices && Object.keys(offices)

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IPrinter>()

  const onChange = useCallback((info: UploadChangeParam<UploadFile<any>>) => {
    const { status } = info.file
    setShowUploadList(true)

    if (status === 'removed') {
      dispatch(fileRemove())
    }
  }, [])

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
            dispatch(
              addPrinter({
                title: data.title,
                image: downloadURL,
                ip: data.ip,
                office: data.office,
                serialNumber: data.serialNumber,
                xeroxNumber: data.xeroxNumber,
                description: data.description,
              }),
            )
          })
          setUploadStatus('success')
          onReset()

          message.success('Принтер добавлен')
        },
      )
    }
  }
  const onReset = () => {
    setShowProgress(false)
    dispatch(fileRemove())
    setShowUploadList(false)
    reset()
  }

  return (
    <Form name="printerInfo" onFinish={handleSubmit(onFinish)}>
      <Flex vertical gap="middle" align="center" style={{ width: '100%' }}>
        <AddPrinterImage
          showUploadList={showUploadList}
          setShowUploadList={setShowUploadList}
          onChange={onChange}
        />
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
            <AddPrinterSelect controllerName="title" control={control} />
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
                  {office?.length &&
                    office.map((item) => (
                      <Select.Option key={item} value={`${item}`}>
                        {office && offices[item].name}
                      </Select.Option>
                    ))}
                </Select>
              )}
            />
          </Form.Item>
          <Form.Item
            label="Расположение"
            validateStatus={errors.description ? 'error' : ''}
            help={errors.description ? errors.description.message : ''}
            style={{ width: '100%' }}>
            <Controller
              name="description"
              control={control}
              defaultValue=""
              rules={{ required: 'Поле не может быть пустым' }}
              render={({ field }) => <Input {...field} />}
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
