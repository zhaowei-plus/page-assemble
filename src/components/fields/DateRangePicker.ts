export default {
  title: '日期范围',
  icon: 'date.png',
  version: 1,

  // 完整的表单描述信息
  field: {
    title: '日期范围',
    // name: '', // 插入表单后必填的数据元素
    'x-component': 'DateRangePicker',
    'x-props': {}, // field 表单项属性
    'x-component-props': {
      getPopupContainer: node => node.parentNode,
    },
    'x-rules': [], // 校验规则
  }
}
