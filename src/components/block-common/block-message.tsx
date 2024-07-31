type BlockMessageProps = {
  children: React.ReactNode
}

export default function BlockMessage({ children }: BlockMessageProps) {
  return <p className={'text-sm font-medium text-destructive'}>{children}</p>
}
