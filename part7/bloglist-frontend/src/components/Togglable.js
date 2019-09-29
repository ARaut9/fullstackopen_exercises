import React, { useState, useImperativeHandle } from 'react'
import { Button } from 'semantic-ui-react'

const Togglable = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => setVisible(!visible)

  useImperativeHandle(ref, () => {
    return { toggleVisibility }
  })

  const style = {
    marginTop: 20
  }

  return (
    <div>
      <div style={hideWhenVisible}>
        <Button
          style={style}
          onClick={toggleVisibility}
          data-cy='new-blog'
        >
          {props.buttonLabel}
        </Button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <Button
          style={style}
          onClick={toggleVisibility}
        >
          Cancel
        </Button>
      </div>
    </div>
  )
})

export default Togglable