// ref: https://umijs.org/config/
export default {
  proxy: {
    '/ygw': {
      target: 'http://admin.jituancaiyun.net/',
      changeOrigin: true,
    },
    '/POST': {
      target: 'https://mock.api.jituancaiyun.com/app/mock/90/',
      changeOrigin: true,
    },
    '/GET': {
      target: 'https://mock.api.jituancaiyun.com/app/mock/90/',
      changeOrigin: true,
    },
  },
  chainWebpack(memo, { env, webpack, createCSSRule }) {
    memo.module
      .rule('compile')
      .test(/\.(xlsx|xls)$/)
      .use('file')
      .loader('file-loader')
      .options({
        name: `files/[name].[ext]`,
      })
  },
}
