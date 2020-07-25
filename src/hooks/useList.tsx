import { useState, useEffect } from 'react'
// import http from '@/api'

export interface IParams {
  [key: string]: number | string | boolean
}
/**
 * useList hook，用于Table列表数据搜索
 *
 * @param {string} url 请求地址
 * @param {object} initialParams 初始化参数，初始化时需要有搜索参数，并且在后续搜索中可以被修改的参数
 * @param {object} staticParams 静态参数，每次搜索都固定不变的参数
 * */
export default (
  url: string,
  initialParams: IParams = {},
  staticParams: IParams = {}
) => {
  const [params, setParams] = useState<IParams>(initialParams)
  const [dataSource, setDataSource] = useState([])
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
    showQuickJumper: true,
    showSizeChanger: true, // 显示页面条数
    showTotal: (total: number) => `共${total}条`,
  })

  /**
   * 查询列表信息：
   *  1 刷新时，分页器不变，搜索参数不变
   *  2 查询时，分页器清零，搜索参数改变
   * */
  const onFetch = (_pagination = pagination, _params = {}) => {
    const { current: currentPage, pageSize } = _pagination

  //   http
  //     .get(url, {
  //       currentPage,
  //       pageSize,
  //       ..._params,
  //       ...staticParams,
  //     })
  //     .then(res => {
  //       const { rows = [] } = res.data || {}
  //
  //       setDataSource(rows)
  //       setParams(_params)
  //       setPagination({
  //         ..._pagination,
  //         total: res.data.totalCount,
  //         current: currentPage,
  //         showTotal: (total: number) => `共${total}条`,
  //       })
  //     })
  }

  /**
   * 参数查询列表信息
   * */
  const onSearch = (_params: IParams) => {
    onFetch({ ...pagination, current: 1 }, _params)
  }

  /**
   * 分页查询列表信息
   * */
  const onChange = (_pagination: any) => {
    onFetch(_pagination)
  }

  return {
    params: {
      ...params,
      ...staticParams,
    },
    onSearch,
    onFetch,
    onChange,

    pagination,
    dataSource,
  }
}
