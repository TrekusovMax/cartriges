import { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { QueryErrorResetBoundary } from '@tanstack/react-query'
import { Flex, Spin } from 'antd'

export const Loader = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary
          onReset={reset}
          fallbackRender={({ resetErrorBoundary }) => (
            <div>
              Произошла ошибка!
              <button onClick={() => resetErrorBoundary()}>
                Попробовать снова
              </button>
            </div>
          )}>
          <Suspense
            fallback={
              <Flex justify="center" align="center">
                <Spin size="large" />
              </Flex>
            }>
            {children}
          </Suspense>
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  )
}
