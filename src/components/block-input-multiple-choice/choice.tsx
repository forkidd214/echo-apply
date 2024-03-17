'use client'

import { useState, useRef, useEffect, ReactNode, KeyboardEvent } from 'react'

import { Button } from '@/components/ui/button'
import {
  BlockStatus,
  BlockTextEditor,
  ContentEditableEvent,
} from '@/components/block-common'

import DeleteChoiceButton from './delete-choice-button'

type ChoiceProps = {
  status: BlockStatus
  value?: string
  onSubmit?: (arg0: { value: string }) => void
  shortcut?: string
  onDelete?: Function
}

export default function Choice({
  status,
  value = '',
  onSubmit,
  shortcut,
  onDelete,
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
    onSubmit && onSubmit({ value: text })
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
      as={isEditing ? 'div' : undefined}
      variant={'outline'}
      className="relative flex h-full w-full min-w-[5em] items-start gap-2 hyphens-auto whitespace-normal break-words p-2 text-left text-primary ring-1 ring-ring hover:cursor-pointer hover:text-primary"
      onFocus={handleFocus}
      onBlur={handleBlur}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
    >
      {isEditing && (
        <DeleteChoiceButton
          isHidden={!isDeleteButtonShown}
          onDelete={onDelete}
        />
      )}

      <ChoiceShorcut>{shortcut}</ChoiceShorcut>
      <BlockTextEditor
        value={text}
        setValue={setText}
        variant={'choice'}
        className="max-w-[calc(100%-2rem)] flex-auto"
        placeholder="Choice"
        innerRef={editorRef}
        disabled={!isEditing}
        hasNoLineBreak
      />
    </Button>
  )
}

const ChoiceShorcut = ({ children }: { children?: ReactNode }) => {
  return (
    <span className="flex h-6 w-6 items-center justify-center rounded-md border border-primary bg-accent">
      {children}
    </span>
  )
}
