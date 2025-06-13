'use client'

import * as React from 'react'
import { Link, Check } from 'lucide-react'

import { Button, ButtonProps } from '@/components/ui/button'
import { useFormIdParams } from '@/utils/helpers'
import copyFormLink from '@/lib/copy-form-link'

interface CopyLinkButtonProps extends ButtonProps {}

export default function CopyLinkButton({ ...props }: CopyLinkButtonProps) {
  const formId = useFormIdParams()
  const [isCopied, setIsCopied] = React.useState(false)

  const handleClick = () => {
    copyFormLink(formId)
    setIsCopied(true)
    setTimeout(() => {
      setIsCopied(false)
    }, 800)
  }

  return (
    <Button size="icon" variant="secondary" {...props} onClick={handleClick}>
      {isCopied ? <Check className="h-4 w-4" /> : <Link className="h-4 w-4" />}
    </Button>
  )
}
