import { z } from 'zod'
import { Attributes } from './types'

export const makeAttributesShortText: () => Attributes = () => ({
  required: false,
  maxChar: null,
})

export const makeBlockSchema = ({ required, maxChar }: Attributes) => {
  let schema = z.string()

  if (required) {
    schema = schema.min(1, { message: 'Field is required' })
  }

  if (maxChar !== null) {
    schema = schema.max(maxChar, {
      message: `Maximum ${maxChar} characters allowed`,
    })
  }

  return schema
}
