type BlockThumnailPaneProps = {
  children?: React.ReactNode
}

export default function BlockThumnailPane({
  children,
}: BlockThumnailPaneProps) {
  return <div className="space-y-1">{children}</div>
}
