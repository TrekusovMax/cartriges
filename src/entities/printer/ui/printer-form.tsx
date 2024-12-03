import { Button, Flex, Form, Input, Progress, Space, Switch } from 'antd'

import { Controller } from 'react-hook-form'
import { IPrinter } from '../api/printer.api.types'

import { PrinterCardImg } from '@/shared/ui/printer-card-img'
import { useOnChangeIp } from '@/shared/lib/hooks/useOnChangeIp'
import { ipRegex } from '@/shared/lib/functions/CheckIp'
import { PrinterFormProps } from '../model/types'

export const PrinterForm = ({
  formControl,
  showImage,
  showProgress,
  fileUpload,
  imgUrl,
  imageSelected,
  progress,
  uploadStatus,
  AddPrinterSelect,
  setShowImage,
  onFinish,
  AddPrinterImage,
  setCheckedColorField,
  renderDataSelect,
}: PrinterFormProps<IPrinter, 'office'>) => {
  const { onChangeIp } = useOnChangeIp()
  const { control, handleSubmit, reset, errors } = formControl

  return (
    <Form name="printerInfo" onFinish={handleSubmit(onFinish)}>
      <Flex vertical gap="middle" align="center" style={{ width: '100%' }}>
        {!showImage ? (
          <AddPrinterImage />
        ) : (
          <PrinterCardImg
            imgUrl={imgUrl}
            onClick={() => {
              setShowImage(false)
              imageSelected.current = false
            }}
          />
        )}
        <Flex
          align="center"
          style={{
            width: '25%',
            display: showProgress ? 'flex' : 'none',
          }}>
          <Progress percent={progress} size="default" status={uploadStatus} />
        </Flex>
        <Flex align="center" justify="space-evenly" vertical style={{ width: 400 }}>
          {AddPrinterSelect && (
            <Form.Item
              label="Наименование"
              validateStatus={errors.title ? 'error' : ''}
              help={errors.title ? errors.title.message : ''}
              style={{ width: '100%' }}>
              <AddPrinterSelect />
            </Form.Item>
          )}
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
              render={({ field }) => renderDataSelect({ field })}
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
          <Form.Item
            label="Цвет"
            validateStatus={errors.serialNumber ? 'error' : ''}
            help={errors.serialNumber ? errors.serialNumber.message : ''}
            style={{ width: '100%' }}>
            <Controller
              name="isColor"
              control={control}
              render={() => (
                <Switch
                  defaultChecked={false}
                  checkedChildren="Цветной"
                  unCheckedChildren="Чёрно-белый"
                  onChange={(e) => {
                    setCheckedColorField(e)
                  }}
                />
              )}
            />
          </Form.Item>
        </Flex>
        <Flex align="center" justify="space-between">
          <Space>
            <Button
              disabled={
                (fileUpload || imageSelected.current) && !Object.keys(errors).length ? false : true
              }
              type="primary"
              htmlType="submit">
              Добавить
            </Button>
            <Button htmlType="reset" onClick={() => reset}>
              Сброс
            </Button>
          </Space>
        </Flex>
      </Flex>
    </Form>
  )
}
