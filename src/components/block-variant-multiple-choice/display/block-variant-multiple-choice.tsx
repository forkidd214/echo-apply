'use client'

import { BlockStatus } from '@/components/block-common'
import { cn } from '@/utils/cn'

import Choice from './choice'
import AddChoceButton from './add-choice-button'
import useMultipleChoice from './use-multiple-choice'

type BlockVariantMultipleChoiceProps = {
  id: string
  status: BlockStatus
}

export default function BlockVariantMultipleChoice({
  id,
  status,
}: BlockVariantMultipleChoiceProps) {
  const { choices, addChoice, updateChoice, deleteChoice } =
    useMultipleChoice(id)
  const isEditing = status === 'EDIT'

  return (
    <ul
      className={cn(
        'isolate grid gap-2',
        'grid-cols-[repeat(auto-fill,minmax(max(10em,30%),1fr))] text-base',
      )}
    >
      {choices.map(({ id, value }, index) => (
        <li key={id}>
          <Choice
            status={status}
            value={value}
            shortcut={getShortcutByIndex(index)}
            onDelete={() => deleteChoice(id)}
            onSubmit={(newChoice) =>
              updateChoice({
                id,
                ...newChoice,
              })
            }
          />
        </li>
      ))}

      {isEditing && (
        <li>
          <AddChoceButton onClick={addChoice} />
        </li>
      )}
    </ul>
  )
}

const getShortcutByIndex = (index: number) => {
  const SHORT_CUTS = 'ABCDEFGHIJK'
  return SHORT_CUTS[index % SHORT_CUTS.length]
}
