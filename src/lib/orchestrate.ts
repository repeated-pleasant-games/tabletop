export default <T extends any>(...fns: Array<(arg: T) => any>) =>
  (arg: T) => fns.forEach((fn) => fn(arg))
