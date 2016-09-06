'use strict'

const test = require('tape')
const {PromiseProxy} = require('../')

test('promise api: resolve', function (t) {
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
        setTimeout(() => callback(null, n), 0)
      }
    }
  }

  const pchrome = PromiseProxy(_chrome, schema)

  pchrome.tabs.query({a: 1})
    .then((arg) => {
      t.equal(arg, n)
      t.end()
    })
    .catch((err) => {
      t.notEqual(err, null)
      t.fail('should not be rejected')
      t.end()
    })
})

test('promise api: reject', function (t) {
  const schema = {
    tabs: {
      query: 1
    }
  }

  // mock
  const _chrome = {
    tabs: {
      query: (_, callback) => {
        setTimeout(() => callback('error'), 0)
      }
    }
  }

  const pchrome = PromiseProxy(_chrome, schema)

  pchrome.tabs.query({a: 1})
    .then((arg) => {
      t.fail('should not be resolved')
      t.end()
    })
    .catch((err) => {
      t.equal(err, 'error')
      t.end()
    })
})
