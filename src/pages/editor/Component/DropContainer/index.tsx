import React, { useRef, Fragment } from 'react'
import { SchemaMarkupField as Field } from '@formily/antd'
import { useDrop, useDrag, DropTargetMonitor, DragSourceMonitor } from 'react-dnd'
import cs from 'classnames'

import './index.less'

const type = 'DragField'

export default (props: any) => {
  const {
    field,
    index,
    children,
    accept = [],
    className = ''
  } = props

  // console.log('accept:', accept)

  const ref = useRef<any>()

  // 可放置
  const [{ canDrop, isOverCurrent }, drop] = useDrop({
    accept, // 可放置的类型
    collect: monitor => ({
      canDrop: monitor.canDrop(),
      isOverCurrent: monitor.isOver({ shallow: true })
    }),
    canDrop: ({ field: dragField }: any, monitor: DropTargetMonitor): boolean => {
      return true; // dragField.name !== field.name // 过滤自身
    },
    hover: ({ field: dragField, dragIndex }: any, monitor: DropTargetMonitor) => {
      // if (dragField.name === field.name) {
      //   return false
      // }

      // 计算预置位
      if (canDrop && isOverCurrent) {
        const offset: any = monitor.getClientOffset()
        const boundRect = ref.current.getBoundingClientRect()

        // const left = isLeft(offset, boundRect)
        // const right = isRight(offset, boundRect)

        // if (left) {
        //   console.log('left preField:', preField, index)
        //   if (preField.index !== index && preField.pos !== 'left') {
        //     actions.setPreInfo({ index, pos: 'left' })
        //   }
        // } else if (right) {
        //   console.log('right preField:', preField, index)
        //   if (preField.index !== index && preField.pos !== 'right') {
        //     actions.setPreInfo({ index, pos: 'right' })
        //   }
        // } else {
        //   if (preField.index !== -1) {
        //     actions.setPreInfo({ index: -1 })
        //   }
        // }
        // return isContain(offset, boundRect)
      }
      return false
    },
    drop: (params: any) => {
      console.log('DropContainer drop:', params)
      // const {
      //   field: sourceField,
      //   index: sourceIndex
      // } = params
      //
      // return {
      //   dropField: field,
      //   index,
      //   dropRegion: 'Field'
      // }
    }
  })

  drop(ref)

  const hover = canDrop && isOverCurrent

  return (
    <div
      className={
        cs(`drop ${className}`, {
          'hover': hover
        })
      }
      ref={ref}
    >
      {children}
    </div>
  )
}
