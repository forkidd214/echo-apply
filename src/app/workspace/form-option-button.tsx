'use client'

import { useRouter } from 'next/navigation'

import OptionButton from '@/components/option-button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import copyFormLink from '@/lib/copy-form-link'
import { useFormDelete } from '@/lib/use-form'

type FormOptionButtonProps = {
  formId: string
}

export default function FormOptionButton({ formId }: FormOptionButtonProps) {
  const router = useRouter()
  const { mutate: deleteForm } = useFormDelete()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <OptionButton as={'span'} className="bg-transparent" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onSelect={() => router.push(`/form/${formId}/create`)}
        >
          Open
        </DropdownMenuItem>
        <DropdownMenuItem
          onSelect={() => {
            copyFormLink(formId)
          }}
        >
          Copy link
        </DropdownMenuItem>
        <DropdownMenuSeparator />

        <DropdownMenuItem onSelect={() => router.push(`/form/${formId}/share`)}>
          Share
        </DropdownMenuItem>
        <DropdownMenuItem
          onSelect={() => router.push(`/form/${formId}/result`)}
        >
          Result
        </DropdownMenuItem>
        <DropdownMenuSeparator />

        <DropdownMenuItem
          className="text-destructive focus:text-destructive"
          onSelect={() => {
            deleteForm(formId)
          }}
        >
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
