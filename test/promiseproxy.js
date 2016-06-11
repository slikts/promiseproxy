'use strict'

const test = require('tape')
const {PromiseProxy} = require('../')

test('instatiate: with new', function (t) {
  const schema = {
    tabs: {
      query: 1,
    },
  }

  const n = 123
  // mock
  const _chrome = {
    tabs: {
      query: (_, callback) => {
        setTimeout(() => callback(n), 0)
      },
    },
  }

  const pchrome = PromiseProxy(_chrome, schema)

  pchrome.tabs.query({a: 1}).then((arg) => {
    t.equal(arg, n)
    t.end()
  })
})
