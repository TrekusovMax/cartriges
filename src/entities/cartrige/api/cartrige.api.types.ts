export type cartrigeType = 'Тонер' | 'Картридж' | 'Контейнер отработаного тонера'
export enum Color {
  BLACK = 'чёрный',
  YELLOW = 'жёлтый',
  CYAN = 'синий',
  MAGENTA = 'красный',
}
export interface ICartrige {
  id?: string
  printer: string
  code: string
  type: cartrigeType
  color?: Color | 'чёрный'
}
