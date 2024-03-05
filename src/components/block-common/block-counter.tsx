import { ArrowRight } from 'lucide-react'

type BlockCounterProps = {
  value: number
}

export default function BlockCounter({ value }: BlockCounterProps) {
  return (
    <div className="flex h-6 w-6 items-center justify-center text-primary">
      <span>{value}</span>
      <ArrowRight strokeWidth={3} className="h-3 w-3" />
    </div>
  )
}
