'use client'

import { useFormContext } from 'react-hook-form'

import { BlockStatus } from '@/components/block-common'
import { cn } from '@/utils/cn'

import Choice from './choice'
import AddChoiceButton from './add-choice-button'
import useMultipleChoice from './use-multiple-choice'

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

  return (
    <div
      className={cn(
        'isolate grid gap-2',
        'grid-cols-[repeat(auto-fill,minmax(max(10em,30%),1fr))] text-base',
      )}
    >
      {choices.map(({ id, value }, index) => (
        <ChoiceFormField
          key={id}
          name={blockId}
          status={status}
          id={id}
          value={value}
          renderChoice={(checked) => (
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
              checked={checked}
            />
          )}
        />
      ))}

      {isEditing && <AddChoiceButton onClick={addChoice} />}
    </div>
  )
}

const getShortcutByIndex = (index: number) => {
  const SHORT_CUTS = 'ABCDEFGHIJK'
  return SHORT_CUTS[index % SHORT_CUTS.length]
}

const ChoiceFormField = ({
  name,
  id,
  value,
  status,
  renderChoice,
}: {
  name: string
  id: string
  value: string
  status: BlockStatus
  renderChoice: (checked?: boolean) => React.ReactNode
}) => {
  const isEditing = status === 'EDIT'
  const { register, watch } = useFormContext()

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
  const fieldName = `${name}`
  const filedValue = watch(fieldName)
  const checked = !isEditing && !!filedValue && filedValue.includes(value)

  // render form control in PREVIEW and PUBLISH
  return (
    <>
      <label htmlFor={id}>{renderChoice(checked)}</label>
      <input
        {...register(fieldName)}
        id={id}
        type="checkbox"
        value={value}
        defaultChecked={false}
        className="hidden"
      />
    </>
  )
}
