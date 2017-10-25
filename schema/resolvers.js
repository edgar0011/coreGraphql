
export default {
  Query: {
    hello: (parent, args, context) => {
      const de = parent + args + context;
      return new Promise((resolve, reject) => {
        if (['hell', 'devil', 'evil', '666'].find(name => args.name.toLowerCase().indexOf(name) > -1)) {
          setTimeout(() => {
            reject(new Error(`Inappropriate name: ${args.name}`));
          }, 1000);
          return;
        }
        setTimeout(() => {
          resolve(de ? `Hi ${args.name}` : 'Empty');
        }, 1000);
      });
    },
  },
};
