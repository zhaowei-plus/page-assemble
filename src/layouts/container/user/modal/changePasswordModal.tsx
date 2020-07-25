import React from 'react'
import { Modal, message } from 'antd'
import { ISubmit } from '@/assets/constant'
import { SchemaForm, Submit, FormButtonGroup } from '@formily/antd'
import { getSchema } from '../config'

import components from '../form'

import './index.less'

export default (props: any) => {
  const { onCancel } = props

  const onSubmit = (params: ISubmit) => {
    const { phone, cerifyCode, newPassword, confirmPassword } = params
    // 1、完整信息校验
    if (!(phone && cerifyCode && newPassword && confirmPassword)) {
      message.warn('请填写完整信息')
      return false
    }

    if (newPassword !== confirmPassword) {
      message.warn('新密码和确认密码不一致')
      return false
    }

    // 发送请求，修改密码
  }

  const schema = getSchema()

  return (
    <Modal
      visible
      centered
      footer={null}
      title="密码修改"
      onCancel={onCancel}
      maskClosable={false}
      wrapClassName="change-password-modal"
    >
      <SchemaForm
        labelCol={7}
        wrapperCol={12}
        onSubmit={onSubmit}
        components={components}
        schema={{
          type: 'object',
          properties: schema,
        }}
        className="change-password"
      >
        <FormButtonGroup align="center">
          <Submit>确定</Submit>
        </FormButtonGroup>
      </SchemaForm>
    </Modal>
  )
}
