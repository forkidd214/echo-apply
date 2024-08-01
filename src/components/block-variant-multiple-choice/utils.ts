import { z } from 'zod'
import { Attributes } from './types'

export const makeAttributesMultipleChoice: () => Attributes = () => ({
  choices: [],
  required: false,
  variant: 'single-selection',
  min: null,
  max: null,
})

export const makeBlockSchema = ({
  choices,
  required,
  variant,
  min,
  max,
}: Attributes) => {
  // if no choice is added
  if (choices.length === 0) {
    // then no checkbox input is registered to @hookform
    return z.void()
  }

  // default value of multiple choice field is an array of string
  const VALUES = choices.map((choice) => choice.value) as [string, ...string[]]
  let schema = z.array(z.enum(VALUES))

  if (required) {
    schema = schema.min(1, { message: 'Oops! Please make a selection' })
  }

  if (variant === 'single-selection') {
    // For single-selection, the value must be one of the choices
    schema = schema.max(1, { message: `Must select only 1 choice` })
  } else if (
    variant === 'multiple-selection-unlimited' ||
    min === null ||
    max === null
  ) {
    // For multiple-selection-unlimited, accept an array of choice values with no limits
    // do nothing
  } else if (variant === 'multiple-selection-exact-number') {
    // For multiple-selection-exact-number, enforce the exact number of selections
    schema = schema.length(min, { message: `Must select exact ${min} choices` })
  } else if (variant === 'multiple-selection-range') {
    // For multiple-selection-range, enforce a range for the number of selections
    schema = schema
      .min(min, { message: `Must select at least ${min} choices` })
      .max(max, { message: `Must select at most ${max} choices` })
  }

  return schema
}
