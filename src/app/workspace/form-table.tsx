'use client'

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import FormOptionButton from './form-option-button'
import { cn } from '@/utils/cn'
import { useFormList } from '@/lib/use-form'
import { useRouter } from 'next/navigation'

type FormTableProps = {}

export default function FormTable({}: FormTableProps) {
  const router = useRouter()
  const { data: forms } = useFormList()

  return (
    <Table>
      <TableHeader className="[&_tr]:border-b-0">
        <TableRow>
          <TableHead className="min-w-max">Form</TableHead>
          <TableHead>Responses</TableHead>
          <TableHead>Completion</TableHead>
          <TableHead>Updated</TableHead>
          <TableHead className="text-right"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="space-y-4">
        {forms?.map((form) => (
          <TableRow
            key={form.id}
            className={cn(
              'border-b-8 border-muted drop-shadow-sm [&_td:first-child]:rounded-l [&_td:last-child]:rounded-r [&_td]:bg-background',
            )}
          >
            <TableCell
              role="link"
              onClick={() => router.push(`/form/${form.id}/create`)}
              className="w-max max-w-md truncate font-medium hover:cursor-pointer"
            >
              {form.name}
            </TableCell>
            <TableCell className="whitespace-nowrap">
              {form.responses}
            </TableCell>
            <TableCell className="whitespace-nowrap">
              {(form.completion * 100).toFixed() + '%'}
            </TableCell>
            <TableCell className="whitespace-nowrap">
              {form.updated_at?.slice(0, 10)}
            </TableCell>
            <TableCell className="text-right">
              <FormOptionButton formId={form.id} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>

      <TableCaption>A list of your forms.</TableCaption>
    </Table>
  )
}
