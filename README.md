[![view on npm](http://img.shields.io/npm/v/promiseproxy.svg)][package-url]
[![License][license-image]][license-url]

# Lightweight promisified API wrappers
A yet another library for *promisifying* callback-style APIs, but this time implemented using the ES2015 [`Proxy`][1] object. It works by intercepting method calls to the API and returning a promise if a callback parameter was expected.

The benefit of using proxies is that the API is extended without the need to duplicate or mutate the original API implementation. The main functionality of the proxies is implemented in less than [20 lines][8], making this approach lightweight and easily auditable.

## Used in

* [**promiseproxy-chrome**][3] – Promisified [Chrome extension API][5]
* [**promiseproxy-node**][2] – Promisified [Node.js 6.x API][4]

## About `Proxy`

 * [Exploring ES6 – Metaprogramming with proxies][7]
 * [You Don't Know JS – Chapter 7: Meta Programming][6]

## Requirements

`Proxy` requires native ES2015 support since it's not practicable to shim it for ES5 environments. It is supported in Node.js 6+, Chrome, Firefox and Edge.

 * [Browser support for `Proxy`](https://kangax.github.io/compat-table/es6/#test-Proxy)
 * [Node.js support for `Proxy`](http://node.green/#Proxy)

## API
**Example**  
```js
const {PromiseProxy} = require("promiseproxy")
```
<a name="exp_module_promiseproxy--PromiseProxy"></a>

### PromiseProxy(target, schema) ⇒ <code>Proxy</code> ⏏
Factory of [`Proxy`][1] objects for recursively promisifying a callback-based API

**Kind**: global method of <code>[promiseproxy](#module_promiseproxy)</code>  

| Param | Type | Description |
| --- | --- | --- |
| target | <code>Object</code> | The API to be promisifed |
| schema | <code>Object</code> | API structure with callback parameter position |

**Example**  
```js
// Define chrome.tabs.query(_, callback) and .update(_, _, callback) methods
// 1 and 2 are the positions of the callback parameters (zero-based)
const schema = {tabs: {query: 1, update: 2}}
// Promisify the Chrome API based on the schema
const _chrome = PromiseProxy(chrome, schema)
// The promisified methods return a Promise if the callback parameter is omitted
_chrome.tabs.query(info).then(callback)
// The same methods can still be used with a callback
_chrome.tabs.query(info, callback)
```

[1]: https://goo.gl/ICTTFQ
[2]: https://github.com/slikts/promiseproxy-node
[3]: https://github.com/slikts/promiseproxy-chrome
[4]: https://nodejs.org/api/
[5]: https://developer.chrome.com/extensions/api_index
[6]: https://github.com/getify/You-Dont-Know-JS/blob/master/es6%20%26%20beyond/ch7.md#proxies
[7]: http://exploringjs.com/es6/ch_proxies.html
[8]: src/promiseproxy.js#L22-L40
[package-url]: https://npmjs.com/package/promiseproxy
[npm-badge-png]: https://nodei.co/npm/promiseproxy.png
[license-url]: LICENSE
[license-image]: http://img.shields.io/npm/l/promiseproxy.svg
