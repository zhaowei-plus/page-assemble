import React, { useRef, Fragment } from 'react'
import { SchemaMarkupField as Field, FormItem } from '@formily/antd'
import { Input } from '@formily/antd-components'
import { useDrop, useDrag, DropTargetMonitor, DragSourceMonitor } from 'react-dnd'
import { CloseOutlined } from '@ant-design/icons'
import { useConcent } from 'concent'
import cs from 'classnames'

import { isContain, isLeft, isRight } from '../../utils'

// 预置位放置组件
import PreField from '../../PreField'

import './index.less'

const type = 'DragField'

export default (props: any) => {
  const { field, index } = props
  const ref = useRef<any>()

  const { state, mr: actions } = useConcent('editor')
  const { preField } = state

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
      return dragField.name !== field.name // 过滤自身
    },
    hover: ({ field: dragField, dragIndex }: any, monitor: DropTargetMonitor) => {
      if (dragField.name === field.name) {
        return false
      }

      // 计算预置位
      if (canDrop && isOverCurrent) {
        const offset: any = monitor.getClientOffset()
        const boundRect = ref.current.getBoundingClientRect()
      }
      return false
    },
    drop: (params: any) => {
      const {
        field: sourceField,
        index: sourceIndex
      } = params

      // 如果是预置位，则添加
      if (field.name !== 'preField') {
        actions.swapField({
          sourceField,
          sourceIndex,
          index
        })
      } else {
        // actions.addField({
        //   index
        // })
      }

      return {
        dropField: field,
        index,
        dropRegion: 'Field'
      }
    }
  })

  drag(ref)

  return (
    <FormItem
      ref={ref}
      name="password"
      label="密码"
      component={Input}
      className="form-field"
    />
  )
}
