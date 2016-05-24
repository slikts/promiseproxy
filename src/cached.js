'use strict'

const {PromiseProxy} = require('./promiseproxy')

/** Wraps PromiseProxy factory and caches instances in a WeakMap */
function CachedPromiseProxy(target, context, cache = new WeakMap(), factory = PromiseProxy) {
  const cached = cache.get(target)
  if (cached) {
    return cached
  }
  const obj = factory(target, context,
    (target, context) => CachedPromiseProxy(target, context, cache))
  cache.set(target, obj)
  return obj
}

module.exports = {CachedPromiseProxy}
