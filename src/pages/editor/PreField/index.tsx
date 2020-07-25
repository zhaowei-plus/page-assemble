import React, { useRef, Fragment } from 'react'
import { SchemaMarkupField as Field } from '@formily/antd'
import { useDrop, useDrag, DropTargetMonitor, DragSourceMonitor } from 'react-dnd'
import { Input, Select, DatePicker } from 'antd'
import cs from 'classnames'
import { PlusOutlined } from '@ant-design/icons'
import { useConcent } from 'concent'

import { isContain, isLeft, isRight } from '../utils'

import './index.less'

export default () => {
  const ref = useRef()

  const { state, mr: actions } = useConcent('editor')
  const { preField } = state

  const [{ canDrop, isOverCurrent }, drop] = useDrop({
    accept: 'Field',
    collect: monitor => ({
      canDrop: monitor.canDrop(),
      isOverCurrent: monitor.isOver({ shallow: true })
    }),
    drop: (params: any) => {
      console.log('preField:', params)
      const { field: sourceField, index: sourceIndex } = params

      // 已添加表单有 name 唯一标识
      // if (field.name) {
      //   actions.swapField({
      //     sourceField,
      //     sourceIndex,
      //     index
      //   })
      // } else {
        // 添加
        // actions.addField({
        //   index
        // })
      // }

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
      className={cs('pre-field', {
        'hover': hover
      })}
      key={name}
      ref={ref}
    >
      <PlusOutlined />
    </div>
  )
}
