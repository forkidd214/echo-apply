import { ClipboardEvent, useRef } from 'react'

import ReactContentEditable, { Props } from 'react-contenteditable'
import useRefCallback from './useRefCallback'

export default function ContentEditable({
  ref,
  onChange,
  onPaste,
  onInput,
  onBlur,
  onKeyPress,
  onKeyDown,
  ...props
}: Props) {
  const onChangeRef = useRefCallback(onChange)
  const onPasteRef = useRefCallback(onPaste)
  const onInputRef = useRefCallback(onInput)
  const onBlurRef = useRefCallback(onBlur)
  const onKeyPressRef = useRefCallback(onKeyPress)
  const onKeyDownRef = useRefCallback(onKeyDown)

  return (
    <ReactContentEditable
      {...props}
      onChange={onChangeRef}
      onPaste={onPasteRef}
      onInput={onInputRef}
      onBlur={onBlurRef}
      onKeyPress={onKeyPressRef}
      onKeyDown={onKeyDownRef}
    />
  )
}
