import React, { useRef, useEffect } from 'react'
import { Button, Space } from 'antd'
import {
  Form,
} from '@formily/antd'
import { useDrop } from 'react-dnd'
import { useConcent } from 'concent'
import cs from 'classnames'

import '../../store'

import DragField from '../../Component/DragField'

import { ItemTypes } from '@/assets/constant'

import './index.less'

export default (props: any) => {
  console.log('Search props:', props)
  const { field } = props
  const { id } = field
  const {
    state,
    mr: actions
  } = useConcent('page')

  // 过滤子组件
  const { fields = [] } = state
  const subFields = fields.filter(item => item.pid === id)

  const ref = useRef()

  // 容器组件可放置
  const [{ canDrop, isOverCurrent }, drop] = useDrop({
    // 可以接受的组件类型
    accept: [
      ItemTypes.component.menuField,
      // ItemTypes.component.dragField,
    ],
    collect: monitor => ({
      canDrop: monitor.canDrop(),
      isOverCurrent: monitor.isOver({ shallow: true })
    }),
    drop: (params: any) => {
      console.log('Container - Search Drop:', params)
      const {
        field,
        type
      } = params

      // 工具栏拖拽的表单组件
      if (type === ItemTypes.component.menuField) {
        actions.addField({
          pid: id,
          id: (new Date()).getTime(),
          name: `${(new Date()).getTime()}`,
          title: '输入框',
          component: 'Input',
          initialValue: '李四',
          placeholder: '请输入姓名'
        })
      }
    }
  })

  useEffect(() => {
    actions.setFields(props.fields)
  }, [props.fields])

  drop(ref)

  const hover = canDrop && isOverCurrent

  return (
    <Form
      onSubmit={values => {
        console.log(values)
      }}
      className="virtual-search"
    >
      <div
        className={
          cs('virtual-search__content', {
            'hover': hover
          })
        }
        ref={ref}
      >
        {
          subFields.map((field, index) => (
            <DragField key={field.id} index={index} field={field} />
          ))
        }
      </div>

      <Space className="virtual-search__footer">
        <Button>重置</Button>
        <Button type="primary">提交</Button>
      </Space>
    </Form>
  )
}
