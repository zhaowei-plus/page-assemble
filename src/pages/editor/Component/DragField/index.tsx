import React, { useRef } from 'react'
import { FormItem } from '@formily/antd'
import { Input, Select } from '@formily/antd-components'
import { useDrop, useDrag } from 'react-dnd'
import { useConcent } from 'concent'
import cs from 'classnames'

import { ItemTypes } from '@/assets/constant'

import './index.less'

const DragField = (props) => {
  const { index, field } = props

  const ref = useRef()

  const {
    mr: actions
  } = useConcent('page')

  // 可拖拽
  const [, drag] = useDrag({
    item: {
      type: ItemTypes.component.dragField
    },
    begin: () => props // 开始拖拽时的参数
  });

  // 可放置
  const [{ canDrop, isOverCurrent }, drop] = useDrop({
    accept: ItemTypes.component.dragField, // 可放置的类型
    collect: monitor => ({
      canDrop: monitor.canDrop(),
      isOverCurrent: monitor.isOver({ shallow: true })
    }),
    canDrop: ({ field: dragField }): boolean => {
      return dragField.id !== field.id // 过滤自身
    },
    hover: ({ field: dragField }) => {
      if (dragField.id === field.id) {
        return false
      }
      return true
    },
    drop: (params: any) => {
      // console.log('DragField drop:', params)
      const {
        field: sourceField,
        index: sourceIndex
      } = params

      // 交换节点数据
      actions.swapField({
        sourceIndex,
        sourceField,
        index
      })
    }
  })

  const handleClick = () => {
    console.log('Select:', field)
  }

  drop(drag(ref))

  const component = {
    'Input': Input,
    'Select': Select
  }

  const hover = canDrop && isOverCurrent

  return (
    <div
      className={
        cs('draggable-field', {
          'hover': hover
        })
      }
      ref={ref}
      onClick={handleClick}
    >
      <FormItem
        {...field}
        component={component[field.component]}
      />
    </div>
  )
}

export default DragField
