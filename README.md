[![view on npm](http://img.shields.io/npm/v/promiseproxy.svg)](https://www.npmjs.org/package/promiseproxy)

# PromiseProxy
A yet another library for promisifying callback-style APIs, but this time implemented using the ES2015 [`Proxy`][1] object. It works by defining the API structure and creating a `Proxy` that intercepts method calls and returns a `Promise` if a callback parameter is omitted. The benefit of using a `Proxy` is that the API is extended without the need to duplicate it or monkey patch its methods. The `Proxy` is implemented in less than [20 lines](/), making this approach very lightweight and easy to audit.

## Used in

* [promiseproxy-chrome](https://github.com/slikts/promiseproxy-chrome)

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
const schema = {chrome: {tabs: {query: 1, update: 2}}}
// Promisify the Chrome API based on the schema
const _chrome = PromiseProxy(chrome, schema)
// The promisified methods return a Promise if the callback parameter is omitted
_chrome.tabs.query(info).then(callback)
// The same methods can still be used with a callback
_chrome.tabs.query(info, callback)
```

[1]:[https://goo.gl/ICTTFQ]
