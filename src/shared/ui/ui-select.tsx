import { Select } from 'antd'

import { ControllerRenderProps } from 'react-hook-form'

export const UiSelect = ({ ...field }: { field: ControllerRenderProps }) => {
  return (
    <Select {...field}>
      {office?.length &&
        office.map((item) => (
          <Select.Option key={item} value={`${item}`}>
            {office && offices[item].name}
          </Select.Option>
        ))}
    </Select>
  )
}
