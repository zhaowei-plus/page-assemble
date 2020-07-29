import React from 'react';
import { Layout } from '@/components'

import './index.less'

import Menu from './Menu'
import Page from './Page'
import Setting from './Setting'

const { Content } = Layout

export default () => {
  return (
    <Layout>
      <Content className="editor">
        <Menu />
        <Page />
        <Setting />
      </Content>
    </Layout>
  )
}
