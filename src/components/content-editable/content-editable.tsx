import { ClipboardEvent } from 'react'

import ReactContentEditable, { Props } from 'react-contenteditable'
import useRefCallback from './useRefCallback'

export default function ContentEditable({
  ref,
  onChange,
  onInput,
  onBlur,
  onKeyPress,
  onKeyDown,
  ...props
}: Props) {
  const onChangeRef = useRefCallback(onChange)
  const onInputRef = useRefCallback(onInput)
  const onBlurRef = useRefCallback(onBlur)
  const onKeyPressRef = useRefCallback(onKeyPress)
  const onKeyDownRef = useRefCallback(onKeyDown)

  // only allowed paste plain text
  const onPaste = (evt: ClipboardEvent<HTMLElement>) => {
    evt.preventDefault()
    var text = evt.clipboardData.getData('text/plain')
    document.execCommand('insertHTML', false, text)
  }

  return (
    <ReactContentEditable
      onPaste={onPaste}
      {...props}
      onChange={onChangeRef}
      onInput={onInputRef}
      onBlur={onBlurRef}
      onKeyPress={onKeyPressRef}
      onKeyDown={onKeyDownRef}
    />
  )
}
