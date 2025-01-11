import { ComposeChildren } from '@/shared/lib/react'

export function AppProvider({ children }: { children: React.ReactNode }) {
  return <ComposeChildren>{children}</ComposeChildren>
}
