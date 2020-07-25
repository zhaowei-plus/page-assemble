import React from 'react'
import { ConfigProvider } from 'antd'
import { Provider } from 'react-redux'
import { DndProvider } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import { history } from 'umi'
import { IRouteComponentProps } from 'umi'
import zhCN from 'antd/es/locale/zh_CN'

// 全局loading配置
import store from '@/store'
import Container from './Container'

// 根据后端配置渲染路由信息
export default (props: IRouteComponentProps) => {
  if (props.location.pathname === '/') {
    history.push('/home')
  }

  if (['/login', '/editor'].includes(props.location.pathname)) {
    return (
      <ConfigProvider locale={zhCN}>
        <Provider store={store}>
          <DndProvider backend={HTML5Backend}>
            {props.children}
          </DndProvider>
        </Provider>
      </ConfigProvider>
    )
  }

  return (
    <ConfigProvider locale={zhCN}>
      <Provider store={store}>
        <DndProvider backend={HTML5Backend}>
          <Container>{props.children}</Container>
        </DndProvider>
      </Provider>
    </ConfigProvider>
  )
}
