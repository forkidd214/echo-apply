'use client'

import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { ChangeEvent, useState } from 'react'

type FormTitleInputProps = {}

export default function FormTitleInput({}: FormTitleInputProps) {
  const [value, setValue] = useState<string>('')
  const handleChange = (ev: ChangeEvent<HTMLInputElement>) => {
    setValue(ev.target.value)
  }
  const getInputWidth = (charNum: number) => `calc(1.5rem + ${charNum}ch)`

  return (
    <Input
      style={{
        width: `min(100%, ${getInputWidth(value.length)})`,
        minWidth: getInputWidth(5),
        maxWidth: getInputWidth(25),
      }}
      className={cn('border-none')}
      placeholder="Title"
      value={value}
      onChange={handleChange}
    />
  )
}
