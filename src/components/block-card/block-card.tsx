import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Trash } from 'lucide-react'

type BlockCardProps = {}

export default function BlockCard({}: BlockCardProps) {
  return (
    <Card>
      <CardContent className="bg-white py-8 px-10">
        <p className="text-center">Block</p>
      </CardContent>
      <CardFooter className="py-1 px-2 flex justify-end">
        <Button variant={'ghost'}>
          <Trash className="h-4 w-4 mr-2" />
          <span>Delete</span>
        </Button>
      </CardFooter>
    </Card>
  )
}
