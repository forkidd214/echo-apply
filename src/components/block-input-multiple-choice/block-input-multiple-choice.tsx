'use client'

import { BlockStatus } from '@/components/block-common'
import { cn } from '@/lib/utils'

import Choice from './choice'
import AddChoceButton from './add-choice-button'
import useMultipleChoice from './useMultipleChoice'

type BlockInputMultipleChoiceProps = {
  status?: BlockStatus
}

export default function BlockInputMultipleChoice({
  status = 'EDIT',
}: BlockInputMultipleChoiceProps) {
  const [choices, addChoice, deleteChoice] = useMultipleChoice()
  const isAddButtonShown = status === 'EDIT'

  return (
    <ul
      className={cn(
        'isolate grid gap-2',
        'grid-cols-[repeat(auto-fit,minmax(min(10em,100%),20em))] text-base',
      )}
    >
      {choices.map(({ id, value }, index) => (
        <li key={id}>
          <Choice
            status={status}
            defaultValue={value}
            shortcut={getShortCutByIndex(index)}
            onDelete={() => deleteChoice({ id })}
          />
        </li>
      ))}

      {isAddButtonShown && (
        <li>
          <AddChoceButton onClick={addChoice} />
        </li>
      )}
    </ul>
  )
}

const getShortCutByIndex = (index: number) => {
  const SHORT_CUTS = 'ABCDEFG'
  return SHORT_CUTS[index % SHORT_CUTS.length]
}
