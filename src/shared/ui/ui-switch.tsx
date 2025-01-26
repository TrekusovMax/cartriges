import { Form, Switch } from 'antd'
import { Control, Controller } from 'react-hook-form'
import { SwitchChangeEventHandler } from 'antd/es/switch'
import type { SwitchField } from '../model/types'

interface InputProps {
  label: string
  name: SwitchField
  errors?: string
  control: Control<any>
  onChange?: SwitchChangeEventHandler
  toggle: {
    checked: string
    unchecked: string
  }
}

export const UiSwitch = ({
  label,
  name,
  toggle,
  onChange,
  errors,
  control,
}: InputProps) => {
  return (
    <Form.Item
      label={label}
      style={{ width: '100%' }}
      validateStatus={errors ? 'error' : ''}
      help={errors}>
      <Controller
        name={name}
        control={control}
        defaultValue=""
        render={() => (
          <Switch
            defaultChecked={false}
            checkedChildren={toggle.checked}
            unCheckedChildren={toggle.unchecked}
            onChange={onChange}
          />
        )}
      />
    </Form.Item>
  )
}
