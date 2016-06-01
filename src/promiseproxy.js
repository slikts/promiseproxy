'use strict'

const {insert} = require('./util')

/**
 * Factory of [`Proxy`][1] objects for recursively promisifying a callback-based API
 * @param {Object} target The API to be promisifed
 * @param {Object} schema API structure with callback parameter position
 * @return {Proxy}
 * @alias module:promiseproxy
 * @example
 * // Define chrome.tabs.query(_, callback) and .update(_, _, callback) methods
 * // 1 and 2 are the positions of the callback parameters (zero-based)
 * const schema = {tabs: {query: 1, update: 2}}
 * // Promisify the Chrome API based on the schema
 * const _chrome = PromiseProxy(chrome, schema)
 * // The promisified methods return a Promise if the callback parameter is omitted
 * _chrome.tabs.query(info).then(callback)
 * // The same methods can still be used with a callback
 * _chrome.tabs.query(info, callback)
 */
function PromiseProxy(target, schema, self = PromiseProxy) {
  const handler = {
    apply(method, receiver, args) {
      const index = schema
      if (args[index] != null) {
        return Reflect.apply(method, receiver, args)
      }
      return new Promise(resolve => Reflect.apply(method, receiver, insert(args, resolve, index)))
    },
    get(target, key) {
      const prop = target[key]
      if (schema.hasOwnProperty(key)) {
        return self(prop, schema[key])
      }
      return prop
    },
  }
  return new Proxy(target, handler)
}

/**
 * @module promiseproxy
 * @example
 * const {PromiseProxy} = require("promiseproxy")
 */
module.exports = {PromiseProxy}
