'use client'

import { useRouter } from 'next/navigation'

import OptionButton from '@/components/option-button'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

type FormTableProps = {
  forms?: any[]
}

export default function FormTable({ forms = [] }: FormTableProps) {
  const router = useRouter()

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
        {forms.map((form) => (
          <TableRow
            key={form.id}
            role="link"
            onClick={() => router.push(`/form/${form.id}/create`)}
            className="border-b-8 border-muted drop-shadow-sm hover:cursor-pointer [&_td:first-child]:rounded-l [&_td:last-child]:rounded-r [&_td]:bg-background [&_td]:hover:bg-background/80"
          >
            <TableCell className="w-max max-w-md truncate font-medium">
              {form.name}
            </TableCell>
            <TableCell className="whitespace-nowrap">
              {form.responses ?? '0'}
            </TableCell>
            <TableCell className="whitespace-nowrap">
              {form.completion ?? '0%'}
            </TableCell>
            <TableCell className="whitespace-nowrap">
              {form.updated_at.slice(0, 10)}
            </TableCell>
            <TableCell className="text-right">
              <OptionButton />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>

      <TableCaption>A list of your forms.</TableCaption>
    </Table>
  )
}
