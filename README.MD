普通表单项：
    输入框
    
表单布局组件：
    SchemaForm
    FormTextBox
    FormStep,
    ArrayCards,
    ArrayTable
    

列表页：
1、搜索栏：Search组件，内部填充表单项
2、Actions操作按钮组，内部动态拖拽按钮组，导出的配置项：
```js
const actionButtons = [
  {
    type: 'Primary',
    title: '新增',
    onClick: () => {
    
    }
  }
]
```
2、Table，可拖拽配置 Columns，自定义Render，支持Checkbox，Radio等多选和单选

思路：
    1、拖拽生成配置项
    2、导出时调用接口

表单项：
    每个组件都有额外的Schema属性，用于配置改表单项的属性内容：
```js

// SchemaForm属性传入formItemComponent，内部做拖拽包装就行了

```

https://www.cnblogs.com/sskyy/p/6496287.html

页面分类：
视图 - 等同于组件树，拖拽或者编辑树形结构的数据
逻辑  -   eslint + 编辑器提示保证代码规范，变量定义，搜索


基础组件 -  组件必须暴露出自己的所有属性和事件，让外部可读
运行时框架

组件属性：
    基本属性
    引擎
    事件绑定
    
页面：
    组件树
