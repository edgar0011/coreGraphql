export default `
  type Query {
    hello(name: String!): String
    item(name: String): Item
  }

  type Item {
    book: String
  }
`
