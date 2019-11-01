const dataResolver = async(parent, args, context) => {
  const de = parent + args + context
  return new Promise((resolve, reject) => {
    if (['hell', 'devil', 'evil', '666'].find(name => args.name.toLowerCase().indexOf(name) > -1)) {
      setTimeout(() => {
        reject(new Error(`Inappropriate name: ${args.name}`))
      }, 1000)
      return
    }
    setTimeout(() => {
      resolve(de ? `Hi ${args.name}` : 'Empty')
    }, 1000)
  })
}

export default {
  Query: {
    hello: async(parent, args, context) => {
      const data = await dataResolver(parent, args, context)

      console.log(data)
      return `response: ${data}`
    },
    item: (args, context, info, ddd) => {
      console.log('item: args', args)
      // console.log('item: context', context)
      // console.log('item: info', info)
      context.hello = 'from item'
      console.log('item: ddd', ddd)
      return {
        book: 'sdssds',
      }
    },
  },
  Item: {
    book: (args, context, info, ddd) => {
      console.log('book: args', args)
      console.log('book: context', context.hello)
      // console.log('book: info', info)
      console.log('book: ddd', ddd)
    },
  },
}
