
import express from 'express';
// import bodyParser from 'body-parser';
// import { graphiqlExpress, graphqlExpress } from 'graphql-server-express';
// is the SAME !!!!!!
// import { graphiqlExpress, graphqlExpress } from 'apollo-server-express';
// AND equivalent to, which is better:
import graphqlHTTP from 'express-graphql';
import { makeExecutableSchema } from 'graphql-tools';

import typeDefs from './schema/typeDefs';
import resolvers from './schema/resolvers';

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const PORT = 8080;
const app = express();

// app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));
// app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }));

app.use('/graphql', graphqlHTTP({ schema, graphiql: false }));
app.use('/graphiql', graphqlHTTP({ schema, graphiql: true }));

app.get('/', (req, res) => {
  res.json({ result: 'ok' });
});

app.get('/hello', (req, res) => {
  res.json({ result: 'Hi there...' });
});


app.listen(PORT, () => {
  console.log('app running at 8080');
});
