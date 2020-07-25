import React, { useRef, useEffect } from 'react'
import { Button, Space } from 'antd'
import {
  SchemaForm,
  SchemaMarkupField as Field,
  Form,
  FormItem
} from '@formily/antd'
import { Input, Select } from '@formily/antd-components'
import { useDrop, useDrag, DropTargetMonitor, DragSourceMonitor } from 'react-dnd'
import { useConcent } from 'concent'
import cs from 'classnames'

import '../../store'

import DragField1 from '../../Component/DragField1'
import Draggable from '../../Component/Draggable'
import DropContainer from '../../Component/DropContainer'

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

  const { fields = [] } = state
  const subFields = fields.filter(item => item.pid === id)
  console.log('subFields:', subFields, fields)

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

  // Store中存储的表单数据
  const fieldArray = [
    {
      id: 1,
      name: 'name',
      title: '姓名',
      component: 'Input',
      initialValue: '张三',
      placeholder: '请输入姓名'
    },
    {
      id: 2,
      name: 'age',
      title: '年龄',
      component: 'Input',
      initialValue: 28,
      placeholder: '请输入年龄'
    },
    {
      id: 3,
      name: 'sex',
      title: '性别',
      component: 'Select',
      placeholder: '请输入年龄',
      initialValue: 1,
      dataSource: [
        { value: 1, label: '男' },
        { value: 2, label: '女' }
      ]
    }
  ]

  console.log('hover:', hover)

  const component = {
    'Input': Input,
    'Select': Select
  }

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
            <Draggable
              type="menuField"
              key={field.id}
              field={field}
              index={index}
              className="form-item"
            >
              <FormItem
                {...field}
                component={component[field.component]}
              />
            </Draggable>
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
