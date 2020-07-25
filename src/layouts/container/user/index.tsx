import React, { Fragment, useState } from 'react'
import { Menu, Dropdown } from 'antd'
import { history } from 'umi'
import { useVisible } from '@/hooks'

import ChangePasswordModal from './modal/changePasswordModal'

import './index.less'

const { Item } = Menu

export default () => {
  const [name, setName] = useState()
  const changePasswordModal = useVisible()

  const handleExit = () => {
    history.push('/login')
  }

  const handleChangePassword = () => {
    changePasswordModal.open()
  }

  const menuContent = (
    <Menu>
      <Item>
        <a onClick={handleExit}>退出登录</a>
      </Item>
      <Item>
        <a onClick={handleChangePassword}>修改密码</a>
      </Item>
    </Menu>
  )

  return (
    <Fragment>
      <div className="user">
        <i className="icon iconfont icon-user" />
        <Dropdown overlay={menuContent}>
          <span className="user__name">{name}</span>
        </Dropdown>
      </div>
      {changePasswordModal.visible && (
        <ChangePasswordModal onCancel={changePasswordModal.close} />
      )}
    </Fragment>
  )
}
