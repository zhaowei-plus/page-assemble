// 下拉选择框
export default {
  'x-component': 'Select',
  enum: [
    { label: '男', value: 1 },
    { label: '女', value: 0 },
  ],
  default: 0,
  'x-component-props': {
    getPopupContainer: node => node.parentNode,
  }
}
