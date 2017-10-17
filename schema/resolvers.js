
export default {
  Query: {
    hello: (parent, args, context) => {
      const de = parent + args + context;
      return de ? `Hi ${args.name}` : 'Empty';
    },
  },
};
