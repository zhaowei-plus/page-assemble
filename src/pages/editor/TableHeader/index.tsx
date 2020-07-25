import React, { useRef } from 'react'
import { SchemaForm } from '@formily/antd'
import { useDrop, useDrag, DropTargetMonitor, DragSourceMonitor } from 'react-dnd'

import Column from './Column'

import './index.less'

export default (props: any) => {
  const { columns = [] } = props
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
    <div className="table-header" ref={ref}>
      {
        columns.map(column => (
          <Column {...column} />
        ))
      }
    </div>
  )
}
