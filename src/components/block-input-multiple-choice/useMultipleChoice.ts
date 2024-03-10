import { useState } from 'react'

const useMultipleChoice = () => {
  const [choices, setChoices] = useState<{ id: string; value: string }[]>([
    { id: 'default choice', value: '' },
  ])

  const addChoice = () => {
    const newChoice = {
      id: Math.random().toString(36).slice(2, 8),
      value: '',
    }
    setChoices([...choices, newChoice])
  }

  const deleteChoice = (targetedChoice: { id: string }) => {
    setChoices((choices) =>
      choices.filter((choice) => choice.id !== targetedChoice.id),
    )
  }

  return [choices, addChoice, deleteChoice] as const
}

export default useMultipleChoice
