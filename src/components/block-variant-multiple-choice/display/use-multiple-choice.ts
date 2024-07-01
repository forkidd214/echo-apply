import { useBlockUpdate, useBlockRead } from '@/lib/use-block'

import type { Attributes } from '../types'

const useMultipleChoice = (blockId: string) => {
  const { data: block } = useBlockRead(blockId)
  const { mutate: updateBlock } = useBlockUpdate()

  const attributes = (block?.attributes as Attributes) ?? {}
  const choices = attributes?.choices ?? []

  const updateBlockChoices = (newChoices: typeof choices) => {
    updateBlock({
      id: blockId,
      attributes: {
        ...attributes,
        choices: newChoices,
      },
    })
  }

  const addChoice = () => {
    const newChoice = {
      id: Math.random().toString(36).slice(2, 8),
      value: '',
    }
    const newChoices = [...choices, newChoice]
    updateBlockChoices(newChoices)
  }

  const updateChoice = (newChoice: (typeof choices)[0]) => {
    const newChoices = choices.map((c) =>
      c.id === newChoice.id ? newChoice : c,
    )
    updateBlockChoices(newChoices)
  }

  const deleteChoice = (choiceId: string) => {
    const newChoices = choices.filter((c) => c.id !== choiceId)
    updateBlockChoices(newChoices)
  }

  return { choices, addChoice, updateChoice, deleteChoice }
}

export default useMultipleChoice
