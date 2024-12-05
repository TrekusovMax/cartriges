import { officesListQuery } from '@/entities/office/queries'
import { printersListQuery } from '@/entities/printer/queries'
import { Loader } from '@/shared/ui/loader'
import { useQueryClient } from '@tanstack/react-query'
import { ReactNode, useEffect, useState } from 'react'

export function AppLoader({ children }: { children?: ReactNode }) {
  const queryClient = useQueryClient()

  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(true)

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
      }), */
    ]).finally(() => {
      setIsLoading(false)
    })
  }, [queryClient])

  if (isLoading) {
    return <Loader />
  }

  return <>{children}</>
}
