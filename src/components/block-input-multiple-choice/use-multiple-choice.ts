import { useBlockUpdate, useBlockRead } from '@/lib/use-block'

const useMultipleChoice = (blockId: string) => {
  const { data: block } = useBlockRead(blockId)
  const { mutate: updateBlock } = useBlockUpdate()

  // const choices = block?.input?.choices ?? []

  const choices: { id: string; value: string }[] = []

  const updateBlockChoices = (newChoices: typeof choices) => {
    const newInput = {
      variant: 'single-choice',
      // ...block.input,
      choices: newChoices,
    }
    updateBlock({
      id: blockId,
      input: newInput,
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
