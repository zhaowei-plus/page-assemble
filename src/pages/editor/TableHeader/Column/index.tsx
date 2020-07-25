import React, { useRef } from 'react'
import { useDrop, useDrag, DropTargetMonitor, DragSourceMonitor } from 'react-dnd'

import './index.less'

export default (props: any) => {
  const { title, align = 'left' } = props

  const ref = useRef(null)

  const [, drop] = useDrop({
    accept: 'Field',
    collect: () => {

    },
    canDrop: ({ drag }: any) => {
      return true;
    },
    hover: ({ drag }: any) => {

    },
    drop: (params: any) => {
      console.log('drop:', params)
    }
  })

  drop(ref)

  return (
    <div className={`columns ${align}`} ref={ref}>
      {title}
    </div>
  )
}
