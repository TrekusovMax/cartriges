import { Button, Flex, Progress, Space } from 'antd'
import type { PrinterFields } from '../model/types'
import { useForm } from 'react-hook-form'

import { PrinterForm } from '@/entities/form'
import { UiInput } from '@/shared/ui/ui-input'
import { ipRegex } from '@/shared/lib/functions/CheckIp'

import { UiSwitch } from '@/shared/ui/ui-switch'
import { useFormAction } from '../model/use-form-action'
import { useOnChangeIp } from '../model/use-change-ip'
import { UiSelect } from '@/shared/ui/ui-select'

export const AddPrinterForm = ({ data }: { data: string[] }) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PrinterFields>()
  const { onChangeIp } = useOnChangeIp()
  const { onChange, onToggle, onFinish } = useFormAction()

  return (
    <PrinterForm
      name="addPrinterForm"
      onFinishAction={handleSubmit(onFinish)}>
      <Flex
        align="center"
        justify="space-evenly"
        vertical
        style={{ width: 500 }}>
        <UiInput
          label={'Серийный номер'}
          name={'serialNumber'}
          control={control}
          errors={errors.serialNumber?.message}
          rules={{ required: 'Номер не должен быть пустым' }}
        />
        <UiInput
          label={'Учётный номер Xerox'}
          name={'xeroxNumber'}
          control={control}
          errors={errors.xeroxNumber?.message}
          rules={{ required: 'Номер не должен быть пустым' }}
        />
        <UiInput
          label={'IP адрес'}
          name={'ip'}
          control={control}
          errors={errors.ip?.message}
          rules={{
            pattern: {
              value: ipRegex,
              message: 'Не корректный формат IP адреса',
            },
          }}
          onInput={onChangeIp}
        />
        <UiSelect
          label={'Офис'}
          name={'office'}
          control={control}
          errors={errors.office?.message}
          rules={{ required: 'Офис не может быть пустым' }}
          data={data}
        />
        <UiInput
          label={'Расположение'}
          name={'description'}
          control={control}
          errors={errors.description?.message}
          rules={{ required: 'Данное поле не может быть пустым' }}
        />

        <UiSwitch
          label={'Цвет'}
          name={'isColor'}
          control={control}
          errors={errors.isColor?.message}
          toggle={{ checked: 'Цветной', unchecked: 'Чёрно-белый' }}
          onChange={(e) => onToggle(e)}
        />
      </Flex>
      <Flex gap={30}>
        <Button type="primary" htmlType="submit">
          Добавить
        </Button>

        <Button htmlType="reset" onClick={() => reset()}>
          Сброс
        </Button>
      </Flex>
    </PrinterForm>
  )
}
