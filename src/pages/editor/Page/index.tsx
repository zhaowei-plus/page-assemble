import React, { useRef } from 'react';
import { useDrop, useDrag, DropTargetMonitor, DragSourceMonitor } from 'react-dnd'
import { useConcent } from 'concent'

import Search from '../Container/Search'
import Buttons from '../Container/Buttons'
import Table from '../Container/Table'
import Draggable from '../Component/Draggable'

import Container from './Container'

import { ItemTypes } from '@/assets/constant';

import './store'

import './index.less'

export default () => {
  const {
    state,
    mr: actions
  } = useConcent('page')

  const ref = useRef()

  const { containers = [] } = state

  console.log('containers:', containers)

  // 页面只接受容器组件
  const [{ canDrop, isOverCurrent }, drop] = useDrop({
    // 可以接受的组件类型
    accept: [
      ItemTypes.container.menuContainer,
      ItemTypes.container.dragContainer,
    ],
    collect: monitor => ({
      canDrop: monitor.canDrop(),
      isOverCurrent: monitor.isOver({ shallow: true })
    }),
    drop: (params: any) => {
      console.log('Page - Drop:', params)
      const {
        type,
        field,
      } = params

      // 工具栏拖拽的容器组件
      if (type === ItemTypes.container.menuContainer) {
        // 新增容器

        const container = {
          ...field,
          id: `${field.title}-${(new Date()).getTime()}`,
        }

        actions.addContainer({
          container
        })
      }

      // 内部容器拖动
      if (type === ItemTypes.container.dragContainer) {
        // TODO: 暂定 交换表单顺序，不需要处理
      }
    }
  })

  drop(ref)

  // id: 1
  // pid: 0
  // index: 1
  // type: "Search"
  // field: {title: "Search", type: "Search"}
  // properties: {id: {…}}


  const renderContainer = (container) => {
    switch (container.type) {
      case 'Search': {
        return <Search field={container} />
      }

      default: {
        return (<div>info</div>)
      }
    }
  }

  return (
    <div className="page" ref={ref}>
      {
        containers.map(item => renderContainer(item))
      }
    </div>
  )
}
