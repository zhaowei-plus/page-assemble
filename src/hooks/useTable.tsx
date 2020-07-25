import React, { useState, useEffect, ReactNode, useCallback } from 'react'
import { Table } from 'antd'
import useList from './useList'

interface IXmTableProps {
  type?: string
  rowKey?: string
  columns: Array<any>
  rowSelection?: boolean
  actions?: (params: any) => ReactNode
  [key: string]: any
}

export default (url: string, initialParams = {}, staticParams = {}) => {
  const list = useList(url, initialParams, staticParams)
  const [selectedRows, setSelectedRows] = useState([])

  const XmTable = useCallback(
    (props: IXmTableProps) => {
      const { rowSelection = true, columns, renderCell, ...rest } = props
      let backupColumns = columns
      if (columns.length > 0) {
        backupColumns = [
          {
            title: '序号',
            key: 'serial',
            render: (text, record, index) => index + 1,
          },
        ].concat(columns)
      }

      // 支持选择的表格，默认是checkbox
      if (rowSelection) {
        const { type = 'checkbox' } = props
        return (
          <Table
            rowSelection={{
              type,
              onChange: (selectedRowKeys, selectedRows) => {
                setSelectedRows(selectedRows)
              },
              selectedRowKeys: selectedRows.map(item => item.id),
              renderCell,
            }}
            rowKey="id"
            columns={backupColumns}
            onChange={list.onChange}
            dataSource={list.dataSource}
            pagination={list.pagination}
            {...rest}
          />
        )
      }

      return (
        <Table
          rowKey="id"
          columns={backupColumns}
          onChange={list.onChange}
          dataSource={list.dataSource}
          pagination={list.pagination}
          {...rest}
        />
      )
    },
    [list.dataSource, list.pagination, selectedRows]
  )

  useEffect(() => {
    const selectRowKeys = selectedRows.map((item: any) => item.id)
    setSelectedRows(
      list.dataSource.filter((item: any) => selectRowKeys.includes(item.id))
    )
  }, [list.dataSource])

  useEffect(() => {
    resourceId && list.onFetch()
  }, [])

  return {
    table: {
      ...list,
      params: {
        ...list.params,
        selectedRows,
      },
    },
    XmTable,
  }
}
