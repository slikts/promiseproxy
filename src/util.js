'use strict'

module.exports = {
  insert: (arr, item, pos) => arr.slice(0, pos).concat([item], arr.slice(pos)),
}
