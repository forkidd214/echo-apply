import { Card, CardDescription, CardHeader } from '@/components/ui/card'
import { useBlockRead } from '@/lib/use-block'

type BlockThumnailCardProps = {
  id: string
}

export default function BlockThumnailCard({ id }: BlockThumnailCardProps) {
  const { data: block } = useBlockRead(id)

  if (!block) return null

  return (
    <Card>
      <CardHeader>
        <CardDescription>
          <span>{block.index}</span>
          <span> . </span>
          <span>{block.title}</span>
        </CardDescription>
      </CardHeader>
    </Card>
  )
}
