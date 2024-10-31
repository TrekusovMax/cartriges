import { Params } from 'react-router-dom'

export interface IBreadcrumbProps {
  to: string
  title: string
  params?: Params<string>
}
