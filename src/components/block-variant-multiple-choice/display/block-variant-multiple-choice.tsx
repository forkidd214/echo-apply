'use client'

import { useFormContext } from 'react-hook-form'

import { BlockMessage, BlockStatus } from '@/components/block-common'
import { cn } from '@/utils/cn'

import Choice from './choice'
import AddChoiceButton from './add-choice-button'
import useMultipleChoice from './use-multiple-choice'
import { useBlockRead } from '@/lib/use-block'
import { Attributes } from '../types'

type BlockVariantMultipleChoiceProps = {
  id: string
  status: BlockStatus
}

export default function BlockVariantMultipleChoice({
  id: blockId,
  status,
}: BlockVariantMultipleChoiceProps) {
  const { choices, addChoice, updateChoice, deleteChoice } =
    useMultipleChoice(blockId)
  const isEditing = status === 'EDIT'
  const { getFieldState } = useFormContext()

  return (
    <>
      <div
        className={cn(
          'isolate grid gap-2',
          'grid-cols-[repeat(auto-fill,minmax(max(10em,30%),1fr))] text-base',
        )}
      >
        {choices.map(({ id, value }, index) => (
          <ChoiceFormField
            key={id}
            blockId={blockId}
            status={status}
            id={id}
            value={value}
            renderChoice={(props) => (
              <Choice
                status={status}
                value={value}
                shortcut={getShortcutByIndex(index)}
                onDelete={() => deleteChoice(id)}
                onUpdate={(newChoice) =>
                  updateChoice({
                    id,
                    ...newChoice,
                  })
                }
                {...props}
              />
            )}
          />
        ))}

        {isEditing && <AddChoiceButton onClick={addChoice} />}
      </div>
      {getFieldState(blockId).error && (
        <BlockMessage>{getFieldState(blockId)?.error?.message}</BlockMessage>
      )}
    </>
  )
}

const getShortcutByIndex = (index: number) => {
  const SHORT_CUTS = 'ABCDEFGHIJK'
  return SHORT_CUTS[index % SHORT_CUTS.length]
}

const ChoiceFormField = ({
  blockId,
  id,
  value,
  status,
  renderChoice,
}: {
  blockId: string
  id: string
  value: string
  status: BlockStatus
  renderChoice: (props?: {
    checked?: boolean
    disabled?: boolean
  }) => React.ReactNode
}) => {
  const isEditing = status === 'EDIT'
  const { register, watch } = useFormContext()
  const { data: block } = useBlockRead(blockId)

  // render choice editor only in editing
  if (isEditing) {
    return renderChoice()
  }

  /**
   * Notes for @fieldValue
   * - Defaults to `undefined`.
   * - If unchecked, the value is `false`.
   * - If there is only one checkbox and it is checked, the value will be the string `"value"`.
   * - If there are multiple checkboxes, the value will be an array of the checked values, e.g., `["value1", "value2", "value3"]`.
   */
  const fieldName = `${blockId}`
  const fieldValue = watch(fieldName) as string[]
  const checked = !isEditing && !!fieldValue && fieldValue.includes(value)

  /**
   * Determines if a choice should be disabled.
   * - `selected`: Number of selected choices, defaulting to 0.
   * - `max` and `variant`: Extracted from `block.attributes`.
   * - `maxSelected`: True if the maximum selections have been reached.
   * - `disabled`: True if not checked and `maxSelected` is true.
   */
  const selected = fieldValue?.length ?? 0
  const { max, variant } = block?.attributes as Attributes
  const maxSelected =
    variant === 'single-selection' && selected >= 1
      ? true
      : (variant === 'multiple-selection-exact-number' ||
            variant === 'multiple-selection-range') &&
          max !== null &&
          selected >= max
        ? true
        : false
  const disabled = !checked && maxSelected

  // render form control in PREVIEW and PUBLISH
  return (
    <>
      <label htmlFor={id}>{renderChoice({ checked, disabled })}</label>
      <input
        {...register(fieldName)}
        id={id}
        type="checkbox"
        value={value}
        defaultChecked={false}
        className="hidden"
        disabled={disabled}
      />
    </>
  )
}
