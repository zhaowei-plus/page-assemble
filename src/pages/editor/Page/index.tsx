import React, { useRef } from 'react';
import { useDrop } from 'react-dnd'
import { useConcent } from 'concent'
import cs from 'classnames'

import Search from '../Container/Search'
import Buttons from '../Container/Buttons'
import Table from '../Container/Table'

import { ItemTypes } from '@/assets/constant';

import '../store'

import './index.less'

export default () => {
  const {
    state,
    mr: actions
  } = useConcent('page')

  const ref = useRef()

  const { containers = [] } = state

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
    }
  })

  drop(ref)

  const renderContainer = (container) => {
    switch (container.type) {
      case 'Search': {
        return <Search field={container} key={container.id}/>
      }

      case 'Buttons': {
        return <Buttons field={container} key={container.id}/>
      }

      case 'Table': {
        return <Table field={container} key={container.id}/>
      }

      default: {
        return (<div key={container.id}>info</div>)
      }
    }
  }

  const hover = canDrop && isOverCurrent

  return (
    <div
      className={
        cs('page', {
          'hover': hover
        })
      }
      ref={ref}
    >
      {
        containers.map(item => renderContainer(item))
      }
    </div>
  )
}
