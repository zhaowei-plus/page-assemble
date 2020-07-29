import React from 'react'
import { Button, Collapse } from 'antd'

import fields from '@/components/fields'

import { ItemTypes } from '@/assets/constant'
import MenuItem from './MenuItem'

import './index.less'

const { Panel } = Collapse

export default () => {
  const { container, component, other } = fields
  console.log('component:', component)

  return (
    <div className="menu">
      <div className="menu__header">
        组件列表
      </div>

      <Collapse
        defaultActiveKey={['container', 'component', 'other']}
        className="menu"
      >
        <Panel
          header="容器组件"
          key="container"
        >
          {
            container.map((item, index) => (
              <MenuItem item={item} key={index} type={ItemTypes.container.menuContainer} />
            ))
          }
        </Panel>

        <Panel
          header="表单组件"
          key="component"
        >
          {
            component.map((item, index) => (
              <MenuItem item={item} key={index} type={ItemTypes.component.menuField } />
            ))
          }
        </Panel>

        <Panel
          header="其他"
          key="other"
        >
          {
            other.map((item, index) => (
              <MenuItem item={item} key={index} type={ItemTypes.component.menuField } />
            ))
          }
        </Panel>
      </Collapse>
    </div>
  )
}
