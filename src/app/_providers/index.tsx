import { ReactNode } from 'react'
import ReactQueryProviders from './react-query-provider'

export default function Providers({ children }: { children: ReactNode }) {
  return <ReactQueryProviders>{children}</ReactQueryProviders>
}
