export type Variant =
  | 'single-selection'
  | 'multiple-selection-unlimited' // min === max = null
  | 'multiple-selection-exact-number' // min === max = exact number
  | 'multiple-selection-range' // [min, max]

export type Choice = {
  id: string
  value: string
}

export type Attributes = {
  // display
  choices: Choice[]

  // settings
  required: boolean
  variant: Variant
  min: number | null
  max: number | null
}
