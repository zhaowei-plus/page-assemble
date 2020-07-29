import React, { useRef, Fragment } from 'react'
import { SchemaMarkupField as Field } from '@formily/antd'
import { useDrop, useDrag, DropTargetMonitor, DragSourceMonitor } from 'react-dnd'
import cs from 'classnames'

import './index.less'

export default (props: any) => {
  // console.log('Draggable - props:', props)

  const {
    type,
    field,
    index,
    className,
    children
  } = props

  const ref = useRef<any>()

  // 可拖拽
  const [, drag] = useDrag({
    item: { type },
    begin: () => props // 开始拖拽时的参数
  });

  // 可放置
  const [{ canDrop, isOverCurrent }, drop] = useDrop({
    accept: type, // 可放置的类型
    collect: monitor => ({
      canDrop: monitor.canDrop(),
      isOverCurrent: monitor.isOver({ shallow: true })
    }),
    canDrop: ({ field: dragField }: any, monitor: DropTargetMonitor): boolean => {
      return true // dragField.name !== field.name // 过滤自身
    },
    hover: ({ field: dragField, dragIndex }: any, monitor: DropTargetMonitor) => {
      if (dragField.name === field.name) {
        return false
      }

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
      const {
        field: sourceField,
        index: sourceIndex
      } = params

      return {
        dropField: field,
        index,
        dropRegion: 'Field'
      }
    }
  })

  drag(drop(ref))

  const hover = canDrop && isOverCurrent

  return (
    <div
      className={
        cs(`draggable ${className}`, {
          'hover': hover
        })
      }
      ref={ref}
    >
      {children}
    </div>
  )
}
