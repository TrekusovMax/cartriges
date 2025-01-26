import { Form, Select } from 'antd'
import { Controller, RegisterOptions, Control } from 'react-hook-form'
import type { SelectField } from '../model/types'
import { SelectHTMLAttributes } from 'react'

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string
  name: SelectField
  data: string[]
  errors?: string
  control: Control<any>
  rules?: RegisterOptions
}

export const UiSelect = ({
  label,
  control,
  name,
  errors,
  data,
  rules,
  style,
}: SelectProps) => {
  return (
    <Form.Item
      label={label}
      validateStatus={errors ? 'error' : ''}
      help={errors}
      style={{ width: '100%' }}>
      {
        <Controller
          name={name}
          control={control}
          defaultValue=""
          rules={rules}
          render={({ field }) => (
            <Select {...field} style={style ?? {}}>
              {data?.length &&
                data.map((item) => (
                  <Select.Option key={item} value={`${item}`}>
                    {item}
                  </Select.Option>
                ))}
            </Select>
          )}
        />
      }
    </Form.Item>
  )
}
