import React from 'react'
import { Space, Button } from 'antd'

import './index.less'

export default (props) => {
  const { buttons } = props

  return (
    <Space style={{ margin: 10 }}>
      {buttons.map(({ title, onClick }, index) => (
        <Button
          key={index}
          onClick={onClick}
          type={index == 0 ? 'primary' : 'default'}
        >
          {title}
        </Button>
      ))}
    </Space>
  )
}
