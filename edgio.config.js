module.exports = {
  routes: './src/routes.ts',
  connector: './node_modules',
  backends: {
    origin: {
      domainOrIp: 'optym.com',
      hostHeader: 'optym.com',
    },
  },
}
