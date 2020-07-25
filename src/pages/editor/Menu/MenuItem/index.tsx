import React, { useRef } from 'react'
import { useDrag, DragSourceMonitor } from 'react-dnd'

import './index.less'

export default (props) => {
  const { item, type } = props
  const {
    icon,
    title,
    field
  } = item

  const ref = useRef()

  const [, drag] = useDrag({
    item: {
      type,
      field,
    }
  })

  drag(ref)

  return (
    <div className="menu-item" ref={ref}>
      <img src={require(`@/assets/fields/${icon}`)} alt={title} />
      <span>{title}</span>
    </div>
  )
}
