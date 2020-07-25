// 修改密码form
export const getSchema = () => {
  return {
    phone: {
      type: 'string',
      title: '手机号码',
      'x-component': 'CerifyCode',
    },
    cerifyCode: {
      type: 'string',
      title: '短信验证码',
      'x-props': {
        placeholder: '请输入验证码',
      },
    },
    newPassword: {
      type: 'password',
      title: '新密码',
      'x-component': 'XmPassword',
      'x-props': {
        placeholder: '请输入6-18位仅含数字、大小写字母的密码',
      },
    },
    confirmPassword: {
      type: 'password',
      title: '再次输入新密码',
      'x-component': 'XmPassword',
      'x-props': {
        placeholder: '请再次输入密码',
      },
    },
  }
}
