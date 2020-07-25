import NP from 'number-precision'
import camelcase from 'camelcase'
import { ISchema } from '@formily/antd'
import { IItem, IParams } from '@/assets/constant'

/**
 * 数字格式化为千分位
 * @param {number} targetNumber - 待格式化的数值
 * @param {number} fractionDigits - 保留小数位数
 * @returns {string} - 格式化之后的字符串
 * @example
 * formatThousandsSeparator(1000) === 1,000
 * @example
 * formatThousandsSeparator(1000, 2) === 1,000.00
 */
export const formatThousandsSeparator = (
  targetNumber: number,
  fractionDigits = 2
) => {
  if (!targetNumber && targetNumber !== 0) {
    return ''
  }

  if (targetNumber === 0) {
    return 0
  }

  let minus = false
  /**
   * 兼容负数
   */
  if (targetNumber < 0) {
    minus = true
    targetNumber = Math.abs(targetNumber)
  }
  fractionDigits =
    fractionDigits >= 0 && fractionDigits <= 20 ? fractionDigits : 2
  /**
   * replace(/[^\d\.-]/g, '')
   * 匹配 除数字、逗号（,）、短横线（ - 负数符号）之外的字符串,替换成''
   * eq: 'a123'.replace(/[^\d\.-]/g, '') === 123
   * eq: 'a123bc'.replace(/[^\d\.-]/g, '0') === 012300
   * eq: 'a123-'.replace(/[^\d\.-]/g, '0') === 0123-
   */
  targetNumber = `${parseFloat(
    `${targetNumber}`.replace(/[^\d\.-]/g, '')
  ).toFixed(fractionDigits)}`
  const reversedSplitNumber = targetNumber
    .split('.')[0]
    .split('')
    .reverse()
  // 小数位
  const decimalPlace = targetNumber.split('.')[1]
  let reversedString = ''
  for (let i = 0; i < reversedSplitNumber.length; i += 1) {
    reversedString +=
      reversedSplitNumber[i] +
      ((i + 1) % 3 === 0 && i + 1 !== reversedSplitNumber.length ? ',' : '')
  }
  /**
   * 兼容负数和整数
   */
  return `${minus ? '-' : ''}${reversedString
    .split('')
    .reverse()
    .join('')}${decimalPlace ? `.${decimalPlace}` : ''}`
}

/**
 * 金额格式化转换
 *  元转分
 *  分转元（默认千分位格式化，并保留2位小数）
 * @param {number} money -  金额(元/分)
 * @param {string} mode - 模式：'toYuan'（分->元）'toCent'（元->分），默认是 'toYuan'
 * @params {object} config - 转换配置项
 *    @param {boolean} thousandsSeparator -  是否需要格式化成千分位,默认为true
 *    @param {number} fractionDigits  - 保留小数位数,默认为2
 *    @param {string} illegalCharacter  - 非法数据是展示的字符
 *
 * @returns {number | string} 转换之后的金额 / 格式化之后的千分位值
 *
 * @example  分转元
 * formatCentToYuan(100000) === '1,000.00'
 * @example
 * formatCentToYuan(100000, 'toYuan', { thousandsSeparator: false }) === '1000.00'
 * @example
 * formatCentToYuan(100000, 'toYuan', { thousandsSeparator: false, fractionDigits: 3 }) === '1000.000'
 *
 * @example 分转元
 * formatCentToYuan(1000, 'toCent') === 100000
 * @example 分转元
 * formatCentToYuan(1000.02, 'toCent') === 100002
 */
interface IMoneyConfig {
  thousandsSeparator?: boolean
  fractionDigits?: number
  illegalCharacter?: string
}

export const formatMoney = (
  money: number | string,
  mode = 'toYuan',
  config: IMoneyConfig = {}
) => {
  const {
    thousandsSeparator = true,
    fractionDigits = 2,
    illegalCharacter = '-',
  } = config

  if (!money || isNaN(money)) {
    return illegalCharacter
  }

  switch (mode) {
    case 'toYuan': {
      const yuan = NP.round(NP.divide(money, 100), fractionDigits)
      if (!thousandsSeparator) {
        return yuan
      }
      return formatThousandsSeparator(yuan, fractionDigits)
    }
    case 'toCent': {
      return NP.round(NP.times(Number(money), 100), 0)
    }
    default:
      return illegalCharacter
  }
}

/**
 * 匹配枚举字段值
 * @param {number} key -  某状态/类型对应的type值
 * @param {array} source  -  所有状态枚举数组
 * @param {string} keyName -  匹配key字段名，默认是'value'
 * @param {string} valueName  -  匹配value字段名，默认是'label'
 * @return {string}  -  该key值对应的状态/类型，匹配失败'-'
 *
 * @example
 * const source = [
 *  {
 *    label: '例子1'
 *    value: 1
 *  },{
 *    label: '例子2'
 *    value: 2
 *  },
 * ]
 * @example 合法匹配
 * matchRelevantValue(1, source) === '例子1'
 *
 * @example 非法匹配
 * matchRelevantValue(0, source) === -
 *
 * @example 合法匹配
 * matchRelevantValue('例子1', source, 'label', 'value') === 1
 *
 * @example 非法匹配
 * matchRelevantValue('例子3', source, 'label', 'value') === '-'
 */
export const formatMatchValue = (
  key: number | string,
  source: Array<IItem> = [],
  keyName = 'value',
  valueName = 'label'
) => {
  const item = source.find(item => item[`${keyName}`] === key)
  if (item) {
    return item[`${valueName}`]
  } else {
    return '-'
  }
}

/**
 * 格式化schema中的placeholder提示信息
 * @param {object} schema - formily用到的json schema，格式如下：
 * {
 *     name: {
 *         type: 'string',
 *         xxxx
 *     },
 *     age: {
 *         type: 'string',
 *         xxxx
 *     },
 * }
 *
 * @return 格式化之后的schema
 */

export const formatFormSchema = (schema: any) => {
  const newSchema = schema
  Object.keys(newSchema).forEach((key: string) => {
    const item = newSchema[key]

    if (['string', 'xm-string'].includes(item.type)) {
      if (!Reflect.has(item, 'x-props')) {
        item['x-props'] = {}
      }

      if (!Reflect.has(item['x-props'], 'placeholder')) {
        if (Array.isArray(item.enum)) {
          item['x-props'].placeholder = '请选择'
          item['x-props'].getPopupContainer = node => node.parentNode
          if (!Reflect.has(item['x-props'], 'allowClear')) {
            item['x-props'].allowClear = true
          }
        } else {
          item['x-props'].placeholder = '请输入'
        }
      }
    }
  })

  return newSchema
}

/**
 * 清理对象参数值，过滤不合法参数
 * @params {object} params - 待清理的对象
 * @params {array} filters - 清理的值信息，默认当值为[null, undefined, NaN, '']中的任意值时，该字段被清理掉
 * @returns {object} 清理之后的独显
 *
 * @example
 *
 * const params = {
 *  name: '',
 *  age: 10,
 *  desc: null
 * }
 * clearObject(params) ==> { age: 10 }
 */
export const clearObject = (
  params: object,
  filters = [null, undefined, NaN, '']
) => {
  if (params instanceof Object) {
    const newParams = {}
    Object.keys(params).forEach(key => {
      if (params[key] instanceof Object) {
        newParams[key] = clearObject(params[key], filters)
      } else if (!filters.includes(params[key])) {
        newParams[key] = params[key]
      }
    })
    return newParams
  }
  return params
}

/**
 * 格式化页面搜索栏返回的动态配置
 * @params {object} params - 待清理的对象
 * @params {array} filters - 清理的值信息，默认当值为[null, undefined, NaN, '']中的任意值时，该字段被清理掉
 * @returns {object} 清理之后的独显

 * clearObject(params) ==> { age: 10 }
 */
export const formatSchemaParams: object = (params: Array<IParams> = []) => {
  if (params.length === 0) {
    return {}
  }

  const FieldMaps = {
    1: 'string',
    2: 'string',
    4: 'daterange',
  }

  return params.reduce((total, item: IParams) => {
    const { name: title, type, key: name, mapValue = {} } = item
    let fileName = name
    const field: ISchema = {
      title,
      type: FieldMaps[type],
    }

    switch (type) {
      case 1: {
        const enumOptions = Object.keys(mapValue).map((label: string) => ({
          label,
          value: mapValue[label],
        }))
        enumOptions.unshift({
          label: '全部',
          value: '',
        })
        field.enum = enumOptions
        field.default = enumOptions[0].value
        break
      }
      case 4: {
        // 日期名称格式化
        fileName = `[${camelcase(`start${item.key}`)},${camelcase(
          `end${item.key}`
        )}]`
        break
      }
      case 5: {
        // 自定义扩展属性
        // field['x-proconstant.tsps'] = {
        //   options: item.mapValue,
        // }
        break
      }
    }
    return { ...total, [fileName]: field }
  }, {})
}

/**
 * 格式化搜索参数，用于搜索列表数据
 * @params {object} params - 待清理的对象
 * @params {array} filters - 清理的值信息，默认当值为[null, undefined, NaN, '']中的任意值时，该字段被清理掉
 * @returns {object} 清理之后的独显

 * clearObject(params) ==> { age: 10 }
 */
export const formatSearchParams = (params = {}) => {
  return Object.keys(params).map((key: string) => ({
    key,
    value: params[key],
  }))
}
