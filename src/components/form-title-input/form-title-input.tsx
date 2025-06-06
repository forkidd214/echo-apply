'use client'

import { ChangeEvent, FocusEvent, useEffect, useState } from 'react'

import { Input } from '@/components/ui/input'
import { cn } from '@/utils/cn'
import { useFormIdParams } from '@/utils/helpers'
import { useFormRead, useFormUpdate } from '@/lib/use-form'

type FormTitleInputProps = {}

export default function FormTitleInput({}: FormTitleInputProps) {
  const formId = useFormIdParams()
  const { data: formData } = useFormRead(formId)
  const { mutate: updateForm } = useFormUpdate()

  const [value, setValue] = useState<string>(formData?.name ?? '')
  const handleChange = (ev: ChangeEvent<HTMLInputElement>) => {
    setValue(ev.target.value)
  }
  const getInputWidth = (charNum: number) => `calc(1.5rem + ${charNum}ch)`

  const handleBlur = (ev: FocusEvent<HTMLInputElement>) => {
    updateForm({
      id: formId,
      name: value,
    })
  }

  useEffect(() => {
    setValue(formData?.name ?? '')
  }, [formData])

  return (
    <Input
      style={{
        width: getInputWidth(value.length),
        minWidth: getInputWidth(5),
        maxWidth: getInputWidth(25),
      }}
      className={cn('border-none')}
      placeholder="Title"
      value={value}
      onChange={handleChange}
      onBlur={handleBlur}
    />
  )
}
