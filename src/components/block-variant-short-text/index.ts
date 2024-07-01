import type { Attributes } from './types'
import BlockVariantShortText from './display'

// utils
const makeAttributesShortText: () => Attributes = () => ({
  required: false,
  maxChar: null,
})

export { BlockVariantShortText, makeAttributesShortText }
