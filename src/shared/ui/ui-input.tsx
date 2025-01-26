import React, { InputHTMLAttributes } from 'react'
import { Form, Input } from 'antd'
import { Control, Controller, RegisterOptions } from 'react-hook-form'
import type { InputFields } from '../model/types'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  name: InputFields
  errors?: string
  control: Control<any>
  rules?: RegisterOptions
  onInput?: React.ChangeEventHandler<HTMLInputElement>
}

export const UiInput = ({
  label,
  name,
  rules,
  onInput,
  errors,
  control,
  style,
}: InputProps) => {
  return (
    <Form.Item
      label={label}
      style={{
        width: '100%',
      }}
      validateStatus={errors ? 'error' : ''}
      help={errors}>
      <Controller
        name={name}
        control={control}
        defaultValue=""
        render={({ field }) => (
          <Input style={style ?? {}} {...field} onInput={onInput} />
        )}
        rules={rules}
      />
    </Form.Item>
  )
}
