export default {
  title: '日期选择',
  icon: 'date.png',
  version: 1,

  // 完整的表单描述信息
  field: {
    title: '日期选择',
    // name: '', // 插入表单后必填的数据元素
    'x-component': 'DatePicker',
    'x-props': {}, // field 表单项属性
    'x-component-props': {
      placeholder: '请选择',
      getPopupContainer: node => node.parentNode,
    }, // antd 组件属性
    'x-rules': [], // 校验规则
  }
}
