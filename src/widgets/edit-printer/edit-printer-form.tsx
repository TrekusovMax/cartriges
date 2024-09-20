import { useAppDispatch } from '@/app/providers/store-provider/store.types'
import { useGetOfficesQuery } from '@/entities/app/api'
import { useFindPrinterQuery } from '@/entities/printer/api'
import { IPrinter } from '@/entities/printer/api/printer.api.types'
import { ipRegex } from '@/shared/functions/CheckIp'
import { useAddPrinter } from '@/shared/hooks'
import { Button, Card, Flex, Form, Image, Input, Select, Space, message } from 'antd'
import { useEffect, useState } from 'react'
import { useForm, Controller, SubmitHandler } from 'react-hook-form'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { Col, Row, Popconfirm } from 'antd'
import { deletePrinter, editPrinter } from '@/entities/printer/model'
import { Loader } from '@/shared/ui/loader'

export const EditPrinterForm = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useAppDispatch()
  const { onChangeIp } = useAddPrinter()

  const [data, setData] = useState<IPrinter>()
  const { data: offices } = useGetOfficesQuery()
  const { data: printerData, refetch } = useFindPrinterQuery(id!)

  const office = offices && Object.keys(offices)

  useEffect(() => {
    printerData && setData(printerData)
  }, [printerData])

  const onFinish: SubmitHandler<IPrinter> = (editData) => {
    if (id) {
      dispatch(editPrinter({ printer: editData, id: id }))
        .then(() => {
          message.success('Данные изменены')
          refetch()
          navigate(location.state.location)
        })
        .catch(() => {
          message.error('Ошибка при изменении данных')
        })
    }
  }

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IPrinter>()

  return data && id ? (
    <Row justify="space-evenly">
      <Col span={4}>
        <Card style={{ width: 350 }}>
          <Image preview={false} alt={data.title} src={data.image} />
          <Card.Meta title={data.title} style={{ textAlign: 'center' }} />
        </Card>
      </Col>

      <Col span={12}>
        <Form name="printerInfo" onFinish={handleSubmit(onFinish)}>
          <Flex vertical gap="middle" align="center" style={{ width: '100%' }}>
            <Flex align="center" justify="space-evenly" vertical style={{ width: 400 }}>
              <Form.Item
                label="Серийный номер"
                validateStatus={errors.serialNumber ? 'error' : ''}
                help={errors.serialNumber ? errors.serialNumber.message : ''}
                style={{ width: '100%' }}>
                <Controller
                  name="serialNumber"
                  control={control}
                  defaultValue={data.serialNumber}
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
                  defaultValue={data.xeroxNumber}
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
                  defaultValue={data.ip}
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
                  defaultValue={data.office}
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
                  defaultValue={data.description}
                  rules={{ required: 'Поле не может быть пустым' }}
                  render={({ field }) => <Input {...field} />}
                />
              </Form.Item>
            </Flex>
            <Flex align="center" justify="space-between">
              <Space>
                <Button
                  disabled={!Object.keys(errors).length ? false : true}
                  type="primary"
                  style={{ backgroundColor: 'green' }}
                  htmlType="submit">
                  Изменить
                </Button>
                <Popconfirm
                  title="Подтвердите удаление"
                  description="Вы действительно хотите удалить МФУ?"
                  onConfirm={() => {
                    dispatch(deletePrinter(id))
                    message.error('МФУ удалено')
                    navigate(location.state.location)
                  }}
                  okText="Да"
                  cancelText="Нет">
                  <Button type="primary" style={{ backgroundColor: 'red' }} htmlType="button">
                    Удалить
                  </Button>
                </Popconfirm>
                <Button htmlType="button" onClick={() => navigate(location.state.location)}>
                  Отмена
                </Button>
              </Space>
            </Flex>
          </Flex>
        </Form>
      </Col>
    </Row>
  ) : (
    <Loader />
  )
}
