// Tiny classNames helper — joins truthy strings, no extra dependency.
export function cn(...args) {
  return args
    .flat(Infinity)
    .filter((x) => typeof x === 'string' && x.length > 0)
    .join(' ')
}

export default cn
