export default [
  {
    name: '首页',
    path: '/home',
  },
  {
    name: '用户管理',
    path: '/user-manage',
    children: [
      {
        name: '用户信息',
        path: '/user-manage/user',
      },
      {
        name: '角色信息',
        path: '/user-manage/role',
      },
      {
        name: '供应商',
        path: '/user-manage/supplier',
      },
    ],
  },
  {
    name: '收款账号管理',
    path: '/receive-account-manage',
    children: [
      {
        name: '收款账号信息',
        path: '/receive-account-manage/info',
      },
    ],
  },
  {
    name: '商品管理',
    path: '/commodity-manage',
    children: [
      {
        name: '商品信息',
        path: '/commodity-manage/commodity',
      },
      {
        name: '商品类别',
        path: '/commodity-manage/category',
      },
    ],
  },
  {
    name: '库存管理',
    path: '/inventory-manage',
    children: [
      {
        name: '库存信息',
        path: '/inventory-manage/info',
      },
    ],
  },
  {
    name: '订单管理',
    path: '/order-manage',
    children: [
      {
        name: '订单查询',
        path: '/order-manage/query',
      },
    ],
  },
]
