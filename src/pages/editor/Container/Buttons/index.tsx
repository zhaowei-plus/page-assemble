import React, { useRef, useEffect } from 'react'
import { useDrop, useDrag, DropTargetMonitor, DragSourceMonitor } from 'react-dnd'
import { useConcent } from 'concent'
import cs from 'classnames'

import '../../store'

import DragField from '../../Component/DragField'

import { ItemTypes } from '@/assets/constant'

import './index.less'

export default (props: any) => {
  const {
    state,
    mr: actions
  } = useConcent('page')

  const { fields } = state
  console.log('SearchContainer fields:', fields)

  const ref = useRef()

  // 容器组件可放置
  const [{ canDrop, isOverCurrent }, drop] = useDrop({
    // 可以接受的组件类型
    accept: [
      ItemTypes.component.menuField,
      ItemTypes.component.dragField,
    ],
    collect: monitor => ({
      canDrop: monitor.canDrop(),
      isOverCurrent: monitor.isOver({ shallow: true })
    }),
    drop: (params: any) => {
      console.log('Container - Search Drop:', params)
      const {
        field,
        index,
        type
      } = params

      // 左侧工具栏拖拽的组件
      if (type === ItemTypes.component.menuField) {
        // 新增表单项
        actions.addField({
          field: {
            name: `${(new Date()).getTime()}`,
            ...field,
          }
        })
      }

      // 内部表单拖动
      if (type === ItemTypes.component.dragField) {
        // 交换表单顺序，不需要处理
      }

      return {
        dragField: field,
        index,
        dropRegion: 'SearchContainer'
      }
    }
  })

  useEffect(() => {
    actions.setFields(props.fields)
  }, [props.fields])

  drop(ref)

  const hover = canDrop && isOverCurrent

  return (
    <div
      className={
        cs('buttons', {
          'hover': hover
        })
      }
      ref={ref}
    >
      Buttons
    </div>
  )
}
