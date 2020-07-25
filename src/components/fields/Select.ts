export default {
  title: '下拉选择框',
  icon: 'select.png',
  version: 1,

  // 完整的表单描述信息
  field: {
    title: '下拉框',
    // name: '', // 插入表单后必填的数据元素
    'x-component': 'Select',
    'x-props': {}, // field 表单项属性
    'x-component-props': {
      placeholder: '请选择'
    },
    'x-rules': [], // 校验规则
  },


  // id: 3,
  // name: 'sex',
  // title: '性别',
  component: 'Select',
  // placeholder: '请输入年龄',
  initialValue: 1,
  dataSource: [
    { value: 1, label: '男' },
    { value: 2, label: '女' }
  ]
}
