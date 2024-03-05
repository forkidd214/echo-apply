import React, { FocusEvent } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

import ContentEditable, {
  ContentEditableEvent,
} from '@/components/content-editable'
import { cn } from '@/lib/utils'

const blockTextEditorVariants = cva(
  'relative before:absolute before:inset-0 before:hidden before:overflow-hidden before:overflow-ellipsis before:whitespace-nowrap before:text-muted-foreground/70 before:content-[attr(data-placeholder)] empty:before:block focus:before:opacity-30 focus-visible:outline-none',
  {
    variants: {
      variant: {
        default: 'min-h-[1rem] text-base font-normal',
        title: 'min-h-[1.75rem] text-xl font-semibold text-foreground',
        description: 'min-h-[1rem] text-base font-normal text-muted-foreground',
        answer:
          'min-h-[calc(2.5rem+2px)] border-b-2 border-b-primary/30 pb-2 text-2xl font-semibold  text-primary before:text-primary/30 focus:border-b-primary/70 focus:before:opacity-0',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

export interface BlockTextEditorProps
  extends Omit<
      React.ComponentProps<typeof ContentEditable>,
      'html' | 'onChange'
    >,
    VariantProps<typeof blockTextEditorVariants> {
  value: string
  setValue: (newValue: string) => void
  // onChange: (event: ContentEditableEvent) => void
  placeholder?: string
}

export default function BlockTextEditor({
  value,
  setValue,
  // onChange,
  variant,
  className,
  placeholder = 'Edit me...', // a hint of where it is
  ...props
}: BlockTextEditorProps) {
  const handleChange = (evt: ContentEditableEvent) => {
    setValue(evt.target.value)
    // onChange(evt)
  }

  const handleBlur = (evt: FocusEvent<HTMLElement>) => {
    // console.log(value) // or plainText: evt.currentTarget.textContent
  }

  return (
    <ContentEditable
      className={cn(blockTextEditorVariants({ variant, className }))}
      onPointerDown={(evt) => evt.stopPropagation()} // disable drawer actions
      tagName="p"
      {...props}
      data-placeholder={placeholder}
      html={value}
      onBlur={handleBlur}
      onChange={handleChange}
    />
  )
}
