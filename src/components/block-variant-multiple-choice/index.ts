import type { Attributes } from './types'
import BlockVariantMultipleChoice from './display'

// utils
const makeAttributesMultipleChoice: () => Attributes = () => ({
  choices: [],
  required: false,
  variant: 'single-selection',
  min: null,
  max: null,
})

export { BlockVariantMultipleChoice, makeAttributesMultipleChoice }
