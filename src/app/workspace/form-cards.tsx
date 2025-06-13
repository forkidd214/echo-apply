'use client'

import { useRouter } from 'next/navigation'

import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { useFormList } from '@/lib/use-form'
import FormOptionButton from './form-option-button'

type FormCardsProps = {}

export default function FormCards({}: FormCardsProps) {
  const router = useRouter()
  const { data: forms } = useFormList({ withResponses: true })

  return (
    <div className="space-y-4">
      {forms?.map((form) => (
        <Card
          key={`form-card-${form.id}`}
          className="divide-y-2 divide-solid bg-card"
        >
          <CardContent
            className="flex cursor-pointer truncate p-6 font-medium"
            onClick={() => router.push(`/form/${form.id}/create`)}
          >
            {form.name}
          </CardContent>
          <CardFooter className="flex justify-between py-1 pl-6 pr-2 text-sm text-muted-foreground">
            <div>
              <span className="font-medium">{form.responses?.length ?? 0}</span>
              <span> responses</span>
            </div>
            <FormOptionButton formId={form.id} />
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
