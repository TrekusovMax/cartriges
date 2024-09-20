import { useGetPrintersQuery } from '@/entities/printer/api'
import { IPrinter } from '@/entities/printer/api/printer.api.types'
import { PlusOutlined } from '@ant-design/icons'
import { Button, Divider, Input, InputRef, Select, Space } from 'antd'
import { useEffect, useRef, useState } from 'react'
import { Controller } from 'react-hook-form'
import type { Control } from 'react-hook-form'

type params = {
  controllerName: keyof IPrinter
  control: Control<IPrinter, any>
  value?: string
}

export const AddPrinterSelect = ({ controllerName, control, value }: params) => {
  const inputRef = useRef<InputRef>(null)
  const [items, setItems] = useState<string[]>([])
  const [name, setName] = useState('')
  const { data: printers } = useGetPrintersQuery()

  useEffect(() => {
    if (printers) {
      const dataKeys = Object.keys(printers)
      const printerList = new Set<string>()

      dataKeys.map((k: string) => {
        printerList.add(printers[k].title)
      })

      setItems(Array.from(printerList))
    }
  }, [printers])

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
  return (
    <Controller
      name={controllerName}
      control={control}
      defaultValue={value}
      rules={{ required: 'Наименование не должно быть пустым' }}
      render={({ field }) => (
        <Select
          {...field}
          placeholder="Выберите МФУ или добавте новую"
          dropdownRender={(menu) => (
            <>
              {menu}
              {!value ? (
                <>
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
              ) : (
                <></>
              )}
            </>
          )}
          options={items.map((item) => ({ label: item, value: item }))}
        />
      )}
    />
  )
}
