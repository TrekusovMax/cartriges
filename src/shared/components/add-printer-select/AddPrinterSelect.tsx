import { DBOffices, IPrinter } from '@/entities/printer/api/printer.api.types'
import { PlusOutlined } from '@ant-design/icons'
import { Button, Divider, Input, InputRef, Select, Space } from 'antd'
import React, { useEffect, useRef, useState } from 'react'
import { Controller } from 'react-hook-form'
import type { Control } from 'react-hook-form'

type params = {
  controllerName: keyof IPrinter
  control: Control<IPrinter, any>
  printers: DBOffices | undefined
  showImage?: (val: string) => void
}

export const AddPrinterSelect = ({ controllerName, control, printers, showImage }: params) => {
  const inputRef = useRef<InputRef>(null)
  const [items, setItems] = useState<string[]>([])
  const [name, setName] = useState('')

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
      defaultValue=""
      rules={{ required: 'Наименование не должно быть пустым' }}
      render={({ field }) => (
        <Select
          {...field}
          onSelect={(val) => {
            showImage!(val)
            setName('')
          }}
          placeholder="Выберите МФУ или добавте новую"
          dropdownRender={(menu) => (
            <>
              {menu}

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
            </>
          )}
          options={items.map((item) => ({ label: item, value: item }))}
        />
      )}
    />
  )
}
