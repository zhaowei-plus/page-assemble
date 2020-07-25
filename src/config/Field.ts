
// 通用配置
export default {
  type: 'string',
  title: '姓名',
  editable: true,
  description: '描述信息',
  visible: true,
  display: true,
  // default: '111', // 默认值：不再Field内部设置，在全局设置
  'x-component': 'Input',
  'x-props': {
    // 扩展属性
    // addonAfter: '123',
  },
  'x-component-props': {
    // antd Input 扩展属性
    // maxLength: 4,
    // prefix: '11',
    // suffix: 'xxxx',
  },
  'x-rule': [
    // 校验规则
    {  },
  ]
}

