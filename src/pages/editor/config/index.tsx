import React, { useRef } from 'react';
import { useDrop, useDrag, DropTargetMonitor, DragSourceMonitor } from 'react-dnd'
import { Layout } from '@/components'

import './index.less'
import { ItemTypes } from '@/assets/constant';

const { Content } = Layout

export default () => {
  const ref = useRef()

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
        field,
        index,
        type
      } = params

      // 左侧工具栏拖拽的容器
      if (type === ItemTypes.container.menuContainer) {
        // 新增容器
        // actions.addField({
        //   field: {
        //     name: `${(new Date()).getTime()}`,
        //     ...field,
        //   }
        // })
      }

      // 内部容器拖动
      if (type === ItemTypes.container.dragContainer) {
        // TODO: 暂定 交换表单顺序，不需要处理
      }
    }
  })

  return (
    <Layout>
      <Content className="page">

      </Content>
    </Layout>
  )
}
