import React, { FocusEvent, ClipboardEvent, KeyboardEvent } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

import ContentEditable, {
  ContentEditableEvent,
} from '@/components/content-editable'
import { cn } from '@/lib/utils'

const blockTextEditorVariants = cva(
  'relative block before:absolute before:inset-0 before:hidden before:overflow-hidden before:overflow-ellipsis before:whitespace-nowrap before:text-muted-foreground/70 before:content-[attr(data-placeholder)] empty:before:block focus:before:opacity-30 focus-visible:outline-none',
  {
    variants: {
      variant: {
        default: 'min-h-[1.5rem] text-base font-normal',
        title: 'min-h-[1.75rem] text-xl font-semibold text-foreground',
        description:
          'min-h-[1.5rem] text-base font-normal text-muted-foreground',
        answer:
          'min-h-[calc(2.5rem+2px)] border-b-2 border-b-primary/30 pb-2 text-2xl font-semibold  text-primary before:text-primary/30 focus:border-b-primary/70 focus:before:opacity-0',
        choice:
          'min-h-[1.5rem] text-base font-normal text-primary before:text-primary/50',
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
  onChange?: (event: ContentEditableEvent) => void
  placeholder?: string
  hasNoLineBreak?: boolean
}

export default function BlockTextEditor({
  value,
  setValue,
  onChange,
  variant,
  className,
  placeholder = 'Edit me...', // a hint of where it is
  hasNoLineBreak,
  ...props
}: BlockTextEditorProps) {
  /**
   * trim
   */
  const handleChange = (evt: ContentEditableEvent) => {
    const trim = (text: string) => {
      // no solo line break
      if (text === '<br>') {
        return ''
      }

      if (hasNoLineBreak) {
        return text.replace(/<br>/g, ' ')
      }

      return text
    }

    const trimmed = trim(evt.target.value)
    evt.target.value = trimmed

    // emit change
    setValue(trimmed)
    onChange && onChange(evt)
  }

  // const handleBlur = (evt: FocusEvent<HTMLElement>) => {
  //   // console.log(value) // or plainText: evt.currentTarget.textContent
  // }

  /**
   * only allowed paste plain text
   */
  const handlePaste = (evt: ClipboardEvent<HTMLElement>) => {
    evt.preventDefault()
    let text = evt.clipboardData.getData('text/plain')

    if (hasNoLineBreak) {
      const temp = document.createElement('div')
      temp.innerHTML = text
      text = temp.innerText
    }

    document.execCommand('insertText', false, text)
  }

  /**
   * prevent input line break
   */
  const handleKeyDown = (evt: KeyboardEvent<HTMLElement>) => {
    if (hasNoLineBreak && evt.key === 'Enter') {
      evt.preventDefault()
    }
  }

  return (
    <ContentEditable
      className={cn(blockTextEditorVariants({ variant, className }))}
      onPointerDown={(evt) => evt.stopPropagation()} // disable drawer actions
      tagName="span"
      // onBlur={handleBlur} // emit change to server
      {...props}
      data-placeholder={placeholder}
      html={value}
      onChange={handleChange}
      onPaste={handlePaste}
      onKeyDown={handleKeyDown}
    />
  )
}
