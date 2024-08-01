'use client'

import { useState, useRef, useEffect, ReactNode, KeyboardEvent } from 'react'

import { Button } from '@/components/ui/button'
import {
  BlockStatus,
  BlockTextEditor,
  ContentEditableEvent,
} from '@/components/block-common'

import DeleteChoiceButton from './delete-choice-button'
import { cn } from '@/utils/cn'
import { Check } from 'lucide-react'

type ChoiceProps = {
  status: BlockStatus
  value?: string
  onUpdate?: (arg0: { value: string }) => void
  shortcut?: string
  onDelete?: Function
  checked?: boolean
  disabled?: boolean
}

export default function Choice({
  status,
  value = '',
  onUpdate,
  shortcut,
  onDelete,
  checked,
  disabled,
}: ChoiceProps) {
  const [text, setText] = useState(value)
  const editorRef = useRef<HTMLDivElement>(null)
  const [state, setStateImp] = useState({
    focus: false,
    hover: false,
  })
  const isEditing = status === 'EDIT'

  /**
   * show the delete button only when editing and in certain states
   */
  const isDeleteButtonShown = isEditing && (state.focus || state.hover)

  const setState = (newState: Partial<typeof state>) => {
    isEditing &&
      setStateImp({
        ...state,
        ...newState,
      })
  }

  const handleFocus = () => {
    setState({ focus: true })
    editorRef.current?.focus()
  }
  const handleBlur = () => {
    setState({ focus: false })
    onUpdate && onUpdate({ value: text })
  }
  const handlePointerEnter = () => setState({ hover: true })
  const handlePointerLeave = () => setState({ hover: false })

  /**
   * set focus to editor upon create
   */
  useEffect(() => {
    isEditing && editorRef.current?.focus()
  }, [isEditing])

  /**
   * The value serves as both the initial value
   * and the server state that needs to be synchronized.
   */
  useEffect(() => {
    setText(value)
  }, [value])

  return (
    <Button
      as={'div'}
      variant={'outline'}
      className={cn(
        'relative flex h-full w-full min-w-[5em] items-start gap-2 hyphens-auto whitespace-normal break-words p-2 text-left text-primary ring-1 ring-ring hover:cursor-pointer hover:bg-primary/20 hover:text-primary',
        checked && 'bg-accent ring-2',
        disabled && 'opacity-50 hover:cursor-not-allowed',
      )}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
    >
      {isEditing && (
        <DeleteChoiceButton
          isHidden={!isDeleteButtonShown}
          onClick={() => onDelete && onDelete()}
        />
      )}

      <ChoiceShortcut checked={checked}>{shortcut}</ChoiceShortcut>
      <BlockTextEditor
        value={text}
        setValue={setText}
        variant={'choice'}
        className="max-w-[calc(100%-4rem)] flex-auto"
        placeholder="Choice"
        ref={editorRef}
        disabled={!isEditing}
        hasNoLineBreak
      />
      <span className="flex h-6 w-6 items-center justify-center self-center">
        {checked && <Check className={cn('h-6 w-6')} />}
      </span>
    </Button>
  )
}

const ChoiceShortcut = ({
  checked,
  children,
}: {
  checked?: boolean
  children?: ReactNode
}) => {
  return (
    <span
      className={cn(
        'flex h-6 w-6 items-center justify-center rounded-md border border-primary bg-accent',
        checked && 'bg-primary text-primary-foreground',
      )}
    >
      {children}
    </span>
  )
}
