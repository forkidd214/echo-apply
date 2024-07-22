type BlockMessageProrps = {
  children: React.ReactNode
}

export default function BlockMessage({ children }: BlockMessageProrps) {
  return <p className={'text-sm font-medium text-destructive'}>{children}</p>
}
