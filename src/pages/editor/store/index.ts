import { run } from 'concent'

run({
  editor: {
    state: {
      fields: [],
      preField: {
        name: 'preField',
        'x-component': 'PreField',
        index: -1,
        pos: '',
      },
      showPre: false,
    },
    reducer: {
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
