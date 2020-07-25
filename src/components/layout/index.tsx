import React from 'react'
import { Typography, Spin } from 'antd'
import { useSelector } from 'react-redux'
import cs from 'classnames'

import './index.less'


const { Title, Paragraph } = Typography;

/**
 * 公用布局组件
 */
const Layout = (props: any) => {
  const { children, className } = props

  return (
    <Typography
      className={
        cs('page-layout', className)
      }
    >
      {children}
    </Typography>
  )
}


const Content = (props: any) => {
  const {
    children,
    wrapperClassName = '', // 额外样式
    ...rest // 其他属性，如 style 等
  } = props

  return (
    <div className={`page-content ${wrapperClassName}`} {...rest}>
      {children}
    </div>
  )
}

const Footer = (props: any) => {
  const {
    hidden, // 是否隐藏
    children,
    className, // 额外样式
    ...rest // 其他属性，如 style 等
  } = props

  return (
    <div
      className={cs(`page-footer ${className}`, { hidden: hidden })}
      {...rest}
    >
      {children}
    </div>
  )
}

Layout.Content = Content
Layout.Footer = Footer

export default Layout
