import dynamic from 'next/dynamic'

const MediaQuery = dynamic(() => import('react-responsive'), {
  ssr: false,
})

const BREAKPOINT = '1024px'

function MobileView({ children }: { children: React.ReactNode }) {
  return <MediaQuery maxWidth={BREAKPOINT}>{children}</MediaQuery>
}

function DesktopView({ children }: { children: React.ReactNode }) {
  return <MediaQuery minWidth={BREAKPOINT}>{children}</MediaQuery>
}

export { MobileView, DesktopView }
