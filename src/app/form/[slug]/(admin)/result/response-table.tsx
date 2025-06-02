'use client'

import React from 'react'
import { useParams } from 'next/navigation'

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { cn } from '@/utils/cn'
import { useResponseList } from '@/lib/use-response'
import { useBlockList } from '@/lib/use-block'

type ResponseTableProps = {}

export default function ResponseTable({}: ResponseTableProps) {
  const { slug } = useParams()
  const formId = typeof slug === 'string' ? slug : slug[0]

  const { data: blocks } = useBlockList(formId)
  const { data: responses } = useResponseList(formId)

  return (
    <Table className="rounded-md bg-white">
      <TableHeader className="">
        <TableRow className="divide-x">
          <TableHead className="min-w-[200px] whitespace-nowrap">
            Response Time
          </TableHead>

          {blocks?.map((b) => (
            <TableHead key={b.id} className="whitespace-wrap min-w-max">
              {b.title || '...'}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody className="space-y-4">
        {responses?.map((response) => (
          <TableRow key={`form-row-${response.id}`} className="divide-x">
            <TableCell>
              {new Date(response.submitted_at).toLocaleString()}
            </TableCell>

            {blocks?.map((block) => {
              const answer = response.response_answers.find(
                (a) => a.block_id === block.id,
              )

              return (
                <TableCell
                  key={answer?.id ?? `no-answer-${response.id}-${block.id}`}
                  className={cn(
                    'whitespace-wrap min-w-max',
                    !answer && 'text-muted',
                  )}
                >
                  {answer ? JSON.stringify(answer.value) : 'Empty'}
                </TableCell>
              )
            })}
          </TableRow>
        ))}
      </TableBody>

      <TableCaption>A list of your responses.</TableCaption>
    </Table>
  )
}
