const test = require('tape')
const {insert} = require('../src/util')

test('replace', function (t) {
  t.deepEqual(insert([1,2,3], 5, 1), [1,5,2,3])
  t.end()
})
