import { IPrinter } from '@/entities/printer/api/types'
import { ipRegex } from '@/shared/lib/functions/CheckIp'
import { useOnChangeIp } from '@/shared/lib/hooks/useOnChangeIp'
import {
  Button,
  Card,
  Flex,
  Form,
  Image,
  Input,
  Select,
  Space,
  Switch,
  message,
} from 'antd'
import { useState } from 'react'
import { useForm, Controller, SubmitHandler } from 'react-hook-form'
import {
  Link,
  useLocation,
  useNavigate,
  useParams,
} from 'react-router-dom'
import { Col, Row, Popconfirm } from 'antd'
import { isPrinter } from '@/shared/lib/functions'
import { useOfficesList } from '@/features/office'
import { usePrinter } from '@/features/printer'
import { usePrinterUpdate } from '@/features/printer/model/use-printer-update'

export const EditPrinterForm = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const [checkedField, setCheckedField] = useState(false)

  const { data: offices } = useOfficesList()
  const { data: printerData } = usePrinter(id ?? '')
  const { updatePrinter } = usePrinterUpdate(id ?? '')

  const { onChangeIp } = useOnChangeIp()

  if (!id || printerData == null) {
    return (
      <Flex
        vertical
        justify={'center'}
        align={'center'}
        wrap={'wrap'}
        style={{ padding: '0 50px', fontWeight: 'bold' }}>
        <strong>
          <h2>МФУ не найдено.</h2>
        </strong>
        <h3>
          <Link to={''} onClick={() => navigate(-1)}>
            Назад
          </Link>
        </h3>
      </Flex>
    )
  }

  const officeTitle = Object.keys(offices)

  const onFinish: SubmitHandler<IPrinter> = async (editData) => {
    if (id) {
      editData.isColor = checkedField
      editData.id = id

      await updatePrinter(editData)
        .then(() => {
          message.success('Данные изменены')
          navigate(location.state.location)
        })
        .catch((e) => {
          message.error('Ошибка при изменении данных')
          console.error(e)
        })
    }
  }

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IPrinter>()

  return (
    printerData &&
    isPrinter(printerData) && (
      <Row justify="space-evenly">
        <Col span={4}>
          <Card style={{ width: 350 }}>
            <Image
              preview={false}
              alt={printerData.title}
              src={printerData.image}
            />
            <Card.Meta
              title={printerData.title}
              style={{ textAlign: 'center', marginTop: '15px' }}
            />
          </Card>
        </Col>

        <Col span={12}>
          <Form name="printerInfo" onFinish={handleSubmit(onFinish)}>
            <Flex
              vertical
              gap="middle"
              align="center"
              style={{ width: '100%' }}>
              <Flex
                align="center"
                justify="space-evenly"
                vertical
                style={{ width: 400 }}>
                <Form.Item
                  label="Серийный номер"
                  validateStatus={errors.serialNumber ? 'error' : ''}
                  help={
                    errors.serialNumber ? errors.serialNumber.message : ''
                  }
                  style={{ width: '100%' }}>
                  <Controller
                    name="serialNumber"
                    control={control}
                    defaultValue={printerData.serialNumber}
                    rules={{ required: 'Номер не должен быть пустым' }}
                    render={({ field }) => <Input {...field} />}
                  />
                </Form.Item>
                <Form.Item
                  label="Учётный номер Xerox"
                  validateStatus={errors.xeroxNumber ? 'error' : ''}
                  help={
                    errors.xeroxNumber ? errors.xeroxNumber.message : ''
                  }
                  style={{ width: '100%' }}>
                  <Controller
                    name="xeroxNumber"
                    control={control}
                    defaultValue={printerData.xeroxNumber}
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
                    defaultValue={printerData.ip}
                    render={({ field }) => (
                      <Input {...field} onInput={onChangeIp} />
                    )}
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
                    defaultValue={printerData.office}
                    rules={{ required: 'Офис не должен быть пустым' }}
                    render={({ field }) => (
                      <Select {...field}>
                        {officeTitle?.length &&
                          officeTitle.map((item) => (
                            <Select.Option key={item} value={`${item}`}>
                              {offices && offices[item]?.name}
                            </Select.Option>
                          ))}
                      </Select>
                    )}
                  />
                </Form.Item>
                <Form.Item
                  label="Расположение"
                  validateStatus={errors.description ? 'error' : ''}
                  help={
                    errors.description ? errors.description.message : ''
                  }
                  style={{ width: '100%' }}>
                  <Controller
                    name="description"
                    control={control}
                    defaultValue={printerData.description}
                    rules={{ required: 'Поле не может быть пустым' }}
                    render={({ field }) => <Input {...field} />}
                  />
                </Form.Item>
                <Form.Item
                  label="Цвет"
                  validateStatus={errors.serialNumber ? 'error' : ''}
                  help={
                    errors.serialNumber ? errors.serialNumber.message : ''
                  }
                  style={{ width: '100%' }}>
                  <Controller
                    name="isColor"
                    control={control}
                    render={() => (
                      <Switch
                        defaultChecked={
                          !!(printerData && printerData.isColor)
                        }
                        checkedChildren="Цветной"
                        unCheckedChildren="Чёрно-белый"
                        onChange={(e) => {
                          setCheckedField(e)
                        }}
                      />
                    )}
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
                      //dispatch(deletePrinter(id))
                      message.error('МФУ удалено')
                      navigate(import.meta.env.BASE_URL)
                    }}
                    okText="Да"
                    cancelText="Нет">
                    <Button
                      type="primary"
                      style={{ backgroundColor: 'red' }}
                      htmlType="button">
                      Удалить
                    </Button>
                  </Popconfirm>
                  <Button
                    htmlType="button"
                    onClick={() => navigate(location.state.location)}>
                    Отмена
                  </Button>
                </Space>
              </Flex>
            </Flex>
          </Form>
        </Col>
      </Row>
    )
  )
}
