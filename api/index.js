'use strict'

require('core-js/stable')
require('regenerator-runtime/runtime')
const { typeDefs } = require('../src/schema.js')
const { makeExecutableSchema } = require('graphql-tools')
const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const resolvers = require('../src/resolvers')
const cors = require('cors')

const app = express()
const port = process.env.port || 3000
const isDev = process.env.NODE_ENV !== 'production'

const schema = makeExecutableSchema({ typeDefs, resolvers })

app.use(cors())

app.use('/api/graphql', graphqlHTTP({
  schema: schema,
  rootValue: resolvers,
  graphiql: true
}))

app.use('/api', graphqlHTTP({
  schema: schema,
  rootValue: resolvers,
  graphiql: isDev
}))

module.exports = app
