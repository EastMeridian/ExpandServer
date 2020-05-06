const withConstructor = (constructor) => (o) => ({
  // create the delegate [[Prototype]]
  __proto__: {
    // add the constructor prop to the new [[Prototype]]
    constructor,
  },
  // mix all o's props into the new object
  ...o,
});

module.exports = withConstructor;
