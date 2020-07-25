import React, { Fragment } from 'react'
import { SchemaForm, FormButtonGroup, Submit, Reset } from '@formily/antd'
import { formatFormSchema, clearObject } from '@/assets/utils'
import {
  Input,
  Radio,
  Checkbox,
  Select,
  DatePicker,
  NumberPicker,
  TimePicker,
  Upload,
  Switch,
  Range,
  Transfer,
  Rating,
  FormItemGrid,
  FormTextBox,
  FormCard,
  FormBlock,
  FormLayout
} from '@formily/antd-components' // 或者@formily/next-components

import './index.less'

interface IProps {
  schema: any
  onSearch: (params: object) => void
  // 获取搜索参数
  getParams?: (params: object) => void
  params?: {
    [key: string]: any
  }
  [key: string]: any
}

const components = {
  Input,
  Radio: Radio.Group,
  Checkbox: Checkbox.Group,
  CheckboxSingle: Checkbox,
  TextArea: Input.TextArea,
  NumberPicker,
  Select,
  Switch,
  DatePicker,
  DateRangePicker: DatePicker.RangePicker,
  YearPicker: DatePicker.YearPicker,
  MonthPicker: DatePicker.MonthPicker,
  WeekPicker: DatePicker.WeekPicker,
  TimePicker,
  Upload,
  Range,
  Rating,
  Transfer
}

export default ({
  schema,
  onSearch,
  params: initialParams = {},
  ...rest
}: IProps) => {
  const onSubmit = (params: any = {}) => {
    onSearch(clearObject(params))
  }

  return (
    <Fragment>
      {schema && (
        <SchemaForm
          components={components}
          onSubmit={onSubmit}
          onReset={onSubmit}
          className="search"
          schema={{
            type: 'object',
            properties: formatFormSchema(schema),
          }}
          defaultValue={initialParams}
          {...rest}
        >
          <FormButtonGroup className="search__actions">
            <Submit loading={false}>查询</Submit>
            <Reset>重置</Reset>
          </FormButtonGroup>
        </SchemaForm>
      )}
    </Fragment>
  )
}
