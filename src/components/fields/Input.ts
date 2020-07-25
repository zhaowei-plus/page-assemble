export default {
  title: '输入框',
  icon: 'text.png',
  version: 1,

  // 完整的表单描述信息
  field: {
    title: '输入框',
    // name: '', // 插入表单后必填的数据元素
    'x-component': 'Input',
    'x-props': {}, // field 表单项属性
    'x-component-props': {
      placeholder: '请输入'
    }, // antd 组件属性
    'x-rules': [], // 校验规则
  }
}
