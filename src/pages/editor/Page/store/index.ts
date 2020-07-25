import { run } from 'concent'

// 数据存储一页面
run({
  page: {
    state: {
      containers: [
        {
          id: 1,
          pid: 0,
          index: 1,
          type: 'Search',

          // 属性
          field: {
            title: 'Search',
            type: 'Search',
          },

          // 属性配置
          properties: {
            id: {
              type: 'string',
              title: '表单ID'
            }
          }
        },
        {
          id: 1,
          pid: 0,
          index: 2,
          type: 'Buttons',

          // 属性
          field: {
            title: 'Search',
          },

          // 属性配置
          properties: {
            id: {
              type: 'string',
              title: '表单ID'
            }
          }
        },
        {
          id: 1,
          pid: 0,
          index: 3,
          type: 'Table',

          // 属性
          field: {
            columns: [
              {
                title: '姓名',
                dataIndex: 'name',
                key: 'name'
              },
              {
                title: '年龄',
                dataIndex: 'age',
                key: 'age'
              },
              {
                title: '性别',
                dataIndex: 'sex',
                key: 'sex',
                render: (text, record, index) => {
                  if (text === 1) {
                    return '男'
                  }

                  if (text === 2) {
                    return '女'
                  }

                  return '-'
                }
              }
            ],

            dataSource: [],
            url: '',
            // 获取表单数据
            getTableData: (res) => {
              console.log('res:', res)
            },
            getDataParams: (res) => {
              console.log('res:', res)
            }
          },

          // 属性配置
          properties: {
            // Table Columns配置
            columns: {
              type: 'array',
              title: '表单ID'
            },
            url: {
              type: 'string',
              title: '请求地址'
            },
            // 其他配置
            // getTableData
          }
        }
      ], // 容器组件
      fields: [
        {
          id: 1,
          pid: 1,
          name: 'name',
          title: '姓名',
          component: 'Input',
          initialValue: '张三',
          placeholder: '请输入姓名'
        },
        {
          id: 2,
          pid: 1,
          name: 'age',
          title: '年龄',
          component: 'Input',
          initialValue: 28,
          placeholder: '请输入年龄'
        },
        {
          id: 3,
          pid: 1,
          name: 'sex',
          title: '性别',
          component: 'Select',
          placeholder: '请输入年龄',
          initialValue: 1,
          dataSource: [
            { value: 1, label: '男' },
            { value: 2, label: '女' }
          ]
        }
      ], // 组件列表
    },
    reducer: {
      // 添加容器
      addContainer({ container }, state) {
        console.log('addContainer:', container)
        return {
          ...state,
          containers: [...state.containers, container]
        }
      },

      // 添加组件
      addComponent({ component, pid }, state) {
        return {
          ...state,
          components: [...state.components, component]
        }
      },

      setFields (fields, state) {
        console.log('fields:', fields)
        return {
          ...state,
          fields
        }
      },

      // 设置预置位
      setPreInfo({ index, pos }, state) {
        const { preField } = state

        return {
          ...state,
          preField: {
            ...preField,
            index,
            pos
          }
        }
      },

      // 添加Field
      addField ({ field }, state) {
        return {
          ...state,
          fields: [...state.fields, field]
        }
      },

      // 删除Field
      delField () {

      },

      moveField () {

      },

      swapField ({ sourceField, sourceIndex, index }, state) {
        console.log('swapField:', sourceField, sourceIndex, index)
        const fields = JSON.parse(JSON.stringify(state.fields))
        fields[sourceIndex] = fields[index]
        fields[index] = sourceField

        return {
          ...state,
          fields
        }
      },
    }
  }
})
