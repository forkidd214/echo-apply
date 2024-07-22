import { ClipboardEvent, forwardRef, useRef } from 'react'

import ReactContentEditable, { Props } from 'react-contenteditable'
import useRefCallback from './useRefCallback'

const ContentEditable = forwardRef<HTMLElement, Props>(
  (
    { onChange, onPaste, onInput, onBlur, onKeyPress, onKeyDown, ...props },
    ref,
  ) => {
    const onChangeRef = useRefCallback(onChange)
    const onPasteRef = useRefCallback(onPaste)
    const onInputRef = useRefCallback(onInput)
    const onBlurRef = useRefCallback(onBlur)
    const onKeyPressRef = useRefCallback(onKeyPress)
    const onKeyDownRef = useRefCallback(onKeyDown)

    return (
      <ReactContentEditable
        {...props}
        // @ts-ignore
        innerRef={ref}
        onChange={onChangeRef}
        onPaste={onPasteRef}
        onInput={onInputRef}
        onBlur={onBlurRef}
        onKeyPress={onKeyPressRef}
        onKeyDown={onKeyDownRef}
      />
    )
  },
)
ContentEditable.displayName = 'ContentEditable'

export default ContentEditable
