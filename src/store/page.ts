import produce from 'immer'

const initialState = {
  id: '1',
  title: '列表页',
  router: '/editor/list',

  // 组件列表，包含容器组件、表单组件等
  components: [
    {
      id: 1,
      pid: 0,
      index: 1,
      type: 'Search',
      category: 1, // 容器组件

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
      id: 2,
      pid: 0,
      index: 2,
      type: 'Buttons',
      category: 1, // 容器组件

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
      id: 3,
      pid: 0,
      index: 3,
      type: 'Table',
      category: 1, // 容器组件

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
    },
    {
      id: 4,
      pid: 1,
      category: 2, // 表单组件
      name: 'name',
      title: '姓名',
      component: 'Input',
      initialValue: '张三',
      placeholder: '请输入姓名'
    },
    {
      id: 5,
      pid: 1,
      category: 2, // 表单组件
      name: 'age',
      title: '年龄',
      component: 'Input',
      initialValue: 28,
      placeholder: '请输入年龄'
    },
    {
      id: 6,
      pid: 1,
      category: 2, // 表单组件
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
  ],
}

export default (state = initialState, action) => {
  const { type, payload } = action
  switch (type) {
    case 'ADD_COMPONENT': {
      const { component = {} } = payload
      console.log('component:', component)
      return produce(state, newState => {
        newState.components.push(component)
      })
    }
    case 'DEL_COMPONENT': {
      const { id } = payload
      return produce(state, newState => {
        const component = newState.components.find(item => item.id === id)
        if (component) {
          // 如果是容器组件，则递归删除子组件

          // 如果是普通组件，直接删除组件
          newState.components = newState.components.filter(item => item.id !== id)
        }
      })
    }
    default: {
      return state
    }
  }



  switch (action.type) {
    case 'SET_LOADING':
      return action.payload
    default:
      return state
  }
}
