import { ReactNode } from 'react'
import ReactQueryProviders from './react-query-provider'
import FormProvider  from './form-provider'

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <ReactQueryProviders>
      <FormProvider>{children}</FormProvider>
    </ReactQueryProviders>
  )
}
