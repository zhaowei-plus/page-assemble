import React, { useState, useEffect } from 'react'
import { Input, message } from 'antd'
import { IField } from '@/assets/constant'

import './index.less'

const CerifyCode = (props: IField) => {
  const { value, mutators } = props
  const [cerifyCode, setCerifyCode] = useState(0)

  const handleChange = (e: any) => {
    mutators.change(e.target.value)
  }

  const handleSmsCode = () => {
    message.destroy()
    if (!value) {
      message.warn('请输入手机号码')
      return false
    } else if (!/^1[3456789]\d{9}$/.test(value)) {
      message.warn('请输入正确格式的手机号码')
      return false
    }

    setCerifyCode(60)
  }

  useEffect(() => {
    if (cerifyCode > 0) {
      setTimeout(() => {
        setCerifyCode(cerifyCode - 1)
      }, 1000)
    }
  }, [cerifyCode])

  return (
    <div className="cerify-code">
      <Input
        value={value}
        placeholder="请输入手机号码"
        onChange={handleChange}
        style={{
          width: 136,
        }}
      />
      <a
        className="cerify-code-btn"
        onClick={handleSmsCode}
        disabled={cerifyCode > 0}
      >
        {cerifyCode > 0 ? `${cerifyCode}s` : '获取短信验证码'}
      </a>
    </div>
  )
}

// 实例扩展，请查看帮助文档：https://formilyjs.org/#/0yTeT0/jYSxSwhmHa
CerifyCode.isFieldComponent = true

export default CerifyCode
