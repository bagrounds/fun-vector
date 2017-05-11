;(function () {
  'use strict'

  /* imports */
  var predicate = require('fun-predicate')
  var object = require('fun-object')
  var funTest = require('fun-test')
  var arrange = require('fun-arrange')
  var array = require('fun-array')
  var scalar = require('fun-scalar')
  var fn = require('fun-function')

  var equalityTests = [
    [[[1, 1 + Number.EPSILON], [1, 1]], false, 'eNear'],
    [[[0.2 - 0.3 + 0.1, 0], [0, 0.2 - 0.3 + 0.1]], true, 'eNear'],
    [[[1, 1], [1]], false, 'eNear'],
    [[[1], [1, 1]], false, 'eNear'],
    [[0.1, [1, 1.09], [0.91, 1]], true, 'near'],
    [[0.1, [1.09, 1], [1, 0.91]], true, 'near'],
    [[0.1, [1, 1], [1]], false, 'near'],
    [[0.1, [1], [1, 1]], false, 'near'],
    [[[1, 1], [2, 1]], false, 'equal'],
    [[[1, 2], [1, 1]], false, 'equal'],
    [[[1, 2], [1]], false, 'equal'],
    [[[1], [1, 2]], false, 'equal'],
    [[[1, 2], [1, 2]], true, 'equal'],
    [[[1], [1]], true, 'equal'],
    [[[1]], true, 'isVector'],
    [[[1, 2, 3]], true, 'isVector'],
    [[[1, 2, '3']], false, 'isVector'],
    [[[]], false, 'isVector'],
    [[[1, 2], [3, 4]], [4, 6], 'sum'],
    [[[1, 2], [3, 4]], [2, 2], 'sub'],
    [[[1, 2], [3, 4]], 11, 'dot'],
    [[3], [0, 0, 0], 'zero'],
    [[4, 3], [3, 3, 3, 3], 'k'],
    [[4, 2], [0, 0, 1, 0], 'e'],
    [[2, [3, 4]], 5, 'normP'],
    [[1, [3, 4]], 7, 'normP'],
    [[[1, 2, 3]], 6, 'normL1'],
    [[[3, 4]], 5, 'normL2'],
    [[[3, 9]], 9, 'normLInf'],
    [[[1, 2, 3]], 3, 'dim'],
    [[[5, 1, 3, 2]], 4, 'dim'],
    [[[0, 9, 0]], [0, 1, 0], 'unit'],
    [[[8, 0, 0]], [1, 0, 0], 'unit'],
    [[[0, 0, -2]], [0, 0, -1], 'unit'],
    [[3, [1, 2, 3]], [3, 6, 9], 'scale']
  ].map(arrange({ inputs: 0, predicate: 1, contra: 2 }))
    .map(object.ap({
      predicate: predicate.equalDeep,
      contra: object.get
    }))

  var softmaxTests = [
    [
      [[1, 2, 3]],
      fn.compose(scalar.lte(1), array.fold(scalar.sum, 0)),
      'softmax'
    ]
  ].map(arrange({ inputs: 0, predicate: 1, contra: 2 }))
    .map(object.ap({
      contra: object.get
    }))

  /* exports */
  module.exports = [
    equalityTests,
    softmaxTests
  ].reduce(array.concat, [])
    .map(funTest.sync)
})()

