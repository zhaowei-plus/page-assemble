import React from 'react'
import { Layout } from 'antd'
import { RouteComponentProps } from 'react-router-dom'

import User from './user'
import Sider from './sider'
import Company from './company'

import './index.less'

interface IRoute {
  name: string
  path: string
  component?: any
  children?: Array<IRoute>
}

const { Header, Content } = Layout

interface IProps extends RouteComponentProps {
  children: React.ReactNode
}

// 路由分层级
export default (props: IProps) => {
  const { children } = props

  return (
    <Layout className="xm-container">
      <Header className="xm-container__header">
        <Company />
        <User />
      </Header>
      <Layout className="xm-container__sider">
        <Sider />
        <Layout>
          <Content>{children}</Content>
        </Layout>
      </Layout>
    </Layout>
  )
}
