import { officesListQuery } from '@/entities/office/queries'
import { printersListQuery } from '@/entities/printer/queries'

import { useQueryClient } from '@tanstack/react-query'
import { ReactNode, useEffect } from 'react'

export function AppLoader({ children }: { children?: ReactNode }) {
  const queryClient = useQueryClient()

  /* useEffect(() => {
    Promise.all([
      queryClient.prefetchQuery({
        ...printersListQuery(),
      }),
      queryClient.prefetchQuery({
        ...officesListQuery(),
      }),
      /* queryClient.prefetchQuery({
        ...sessionQuery(),
      }),
      queryClient.prefetchQuery({
        ...usersListQuery(),
      }),
      queryClient.prefetchQuery({
        ...tasksListQuery(),
      }), 
    ])
  }, [queryClient]) */

  return <>{children}</>
}
