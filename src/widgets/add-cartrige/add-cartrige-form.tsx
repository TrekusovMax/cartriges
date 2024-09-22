import { useEffect, useState } from 'react'
import { Button, Flex, Form, Input, Select, Space, message } from 'antd'
import { useForm, Controller, SubmitHandler } from 'react-hook-form'

import { useGetPrintersQuery } from '@/entities/printer/api'

import { useAppDispatch } from '@/app/providers/store-provider/store.types'
import { Color, ICartrige, type cartrigeType } from '@/entities/cartrige/api/cartrige.api.types'
import { addCartrige } from '@/entities/cartrige/model'

export const AddCartrigeForm = () => {
  const dispatch = useAppDispatch()

  const [items, setItems] = useState<string[]>([])
  const { data: printers } = useGetPrintersQuery()

  const tonerColor: Color[] = [Color.BLACK, Color.CYAN, Color.YELLOW, Color.MAGENTA]

  const cartrigeType: cartrigeType[] = ['Тонер', 'Картридж', 'Контейнер отработаного тонера']

  const [cartrige, setCartrige] = useState<cartrigeType>('Тонер')

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ICartrige>()

  const onFinish: SubmitHandler<ICartrige> = (data) => {
    if (cartrige !== 'Тонер') delete data.color
    dispatch(addCartrige(data)).then(() => {
      message.success('Добавлен новый картридж')
    })
  }
  const onReset = () => {
    reset()
  }

  useEffect(() => {
    if (printers) {
      const dataKeys = Object.keys(printers)
      const printerList = new Set<string>()

      dataKeys.map((k: string) => {
        printerList.add(printers[k].title)
      })

      setItems(Array.from(printerList).sort((a, b) => a.localeCompare(b)))
    }
  }, [printers])

  return (
    <Form name="add-cartrige-form" onFinish={handleSubmit(onFinish)}>
      <Flex vertical gap="middle" align="center" style={{ width: '100%' }}>
        <Flex align="center" justify="space-evenly" vertical style={{ width: 400 }}>
          <Form.Item
            label="МФУ"
            validateStatus={errors.printer ? 'error' : ''}
            help={errors.printer ? errors.printer.message : ''}
            style={{ width: '100%' }}>
            <Controller
              name="printer"
              control={control}
              defaultValue=""
              rules={{ required: 'Наименование не должно быть пустым' }}
              render={({ field }) => (
                <Select
                  {...field}
                  placeholder="Выберите МФУ"
                  dropdownRender={(menu) => <>{menu}</>}
                  options={Object.values(items).map((item) => ({ label: item, value: item }))}
                />
              )}
            />
          </Form.Item>
          <Form.Item
            label="Код картриджа"
            validateStatus={errors.code ? 'error' : ''}
            help={errors.code ? errors.code.message : ''}
            style={{ width: '100%' }}>
            <Controller
              name="code"
              control={control}
              defaultValue=""
              rules={{ required: 'Код не должен быть пустым' }}
              render={({ field }) => <Input {...field} />}
            />
          </Form.Item>

          <Form.Item
            label="Тип"
            validateStatus={errors.type ? 'error' : ''}
            help={errors.type ? errors.type.message : ''}
            style={{ width: '100%' }}>
            <Controller
              name="type"
              control={control}
              defaultValue={'Тонер'}
              rules={{ required: 'Тип не должен быть пустым' }}
              render={({ field }) => (
                <Select {...field} onSelect={(value) => setCartrige(value)}>
                  {cartrigeType.map((item) => (
                    <Select.Option key={item} value={`${item}`}>
                      {item}
                    </Select.Option>
                  ))}
                </Select>
              )}
            />
          </Form.Item>
          {cartrige === 'Тонер' && (
            <Form.Item
              label="Цвет"
              validateStatus={errors.type ? 'error' : ''}
              help={errors.type ? errors.type.message : ''}
              style={{ width: '100%' }}>
              <Controller
                name="color"
                control={control}
                defaultValue="чёрный"
                rules={{ required: 'Цвет не должен быть пустым' }}
                render={({ field }) => (
                  <Select {...field}>
                    {tonerColor.map((item) => (
                      <Select.Option key={item} value={`${item}`}>
                        {item}
                      </Select.Option>
                    ))}
                  </Select>
                )}
              />
            </Form.Item>
          )}
        </Flex>
        <Flex align="center" justify="space-between">
          <Space>
            <Button
              disabled={!Object.keys(errors).length ? false : true}
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
