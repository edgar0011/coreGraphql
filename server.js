
import express from 'express'
import bodyParser from 'body-parser'
// DEPRECATED
// import { graphiqlExpress, graphqlExpress } from 'graphql-server-express';
// is the SAME !!!!!!
// import { graphiqlExpress, graphqlExpress } from 'apollo-server-express';
// AND equivalent to, which is better:
import graphqlHTTP from 'express-graphql'
// import { makeExecutableSchema } from 'graphql-tools';
import { buildSchema } from 'graphql'

import typeDefs from './schema/typeDefs'
// import resolvers from './schema/resolvers';

// const schema = makeExecutableSchema({
//   typeDefs,
//   resolvers,
// });

const schema = buildSchema(typeDefs)

const PORT = 8080
const app = express()

// app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));
// app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }));

// app.use('/graphql', graphqlHTTP({ schema, graphiql: false }));
// app.use('/graphql', graphqlHTTP({ schema, graphiql: true }));

const root = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // Query: {
    hello: (args, context, info, ddd) => {
      console.log('hello: args', args)
      console.log('hello: context', context)
      console.log('hello: info', info)
      console.log('hello: ddd', ddd)
      return 'Hello world!'
    },
    item: {
      book: (args, context, info, ddd) => {
        console.log('book: args', args)
        console.log('book: context', context)
        console.log('book: info', info)
        console.log('book: ddd', ddd)
      },
    },
  // },
}

app.use(bodyParser.json())
app.use('/graphql', graphqlHTTP({
  schema,
  // rootValue: {
  //   Query: {
  //     ...resolvers.Query
  //   }
  // },
  rootValue: root,
  graphiql: true,
}))

app.use((req, res, next) => {
  console.log('Request:')
  console.log(req)
  console.log('Response:')
  console.log(res)
  // res.status(200).send({ name: 'Well, Hard to tell...' });
  next()
})

app.get('/', (req, res) => {
  res.json({ result: 'ok' })
})

app.get('/hello', (req, res) => {
  res.json({ result: 'Hi there...' })
})

app.listen(PORT, () => {
  console.log('app running at 8080')
})
