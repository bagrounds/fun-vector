/**
 * An array of numbers
 * @typedef {Array<Number>} Vector
 */

/**
 *
 * @module fun-vector
 */
;(function () {
  'use strict'

  /* imports */
  var array = require('fun-array')
  var compose = require('fun-compose')
  var curry = require('fun-curry')
  var fn = require('fun-function')
  var predicate = require('fun-predicate')
  var scalar = require('fun-scalar')

  /* exports */
  module.exports = {
    isValid: isValid,
    sum: curry(sum),
    sub: curry(sub),
    dot: curry(dot),
    zero: zero,
    k: curry(k),
    e: curry(e),
    normP: curry(normP),
    normL1: curry(normL1),
    normL2: curry(normL2),
    normLInf: curry(normLInf),
    dim: dim,
    unit: unit,
    scale: curry(scale)
  }

  /**
   *
   * @function module:fun-vector.sum
   *
   * @param {Vector} v1 - summand
   * @param {Vector} v2 - summand
   *
   * @return {Vector} v1 + v2
   */
  function sum (v1, v2) {
    return array.zipWith(scalar.sum, v1, v2)
  }

  /**
   *
   * @function module:fun-vector.sub
   *
   * @param {Vector} v1 - subtrahend
   * @param {Vector} v2 - minuend
   *
   * @return {Vector} v2 - v1
   */
  function sub (v1, v2) {
    return array.zipWith(scalar.sub, v1, v2)
  }

  /**
   *
   * @function module:fun-vector.dot
   *
   * @param {Vector} v1 - multiplier
   * @param {Vector} v2 - multiplicand
   *
   * @return {Vector} v1 * v2
   */
  function dot (v1, v2) {
    return array.zipWith(scalar.dot, v1, v2).reduce(scalar.sum, 0)
  }

  /**
   *
   * @function module:fun-vector.zero
   *
   * @param {Number} length - of zero vector to return
   *
   * @return {Vector} zero vector
   */
  function zero (length) {
    return k(length, 0)
  }

  /**
   *
   * @function module:fun-vector.k
   *
   * @param {Number} length - of vector to return
   * @param {Number} value - of vector to return
   *
   * @return {Vector} [value, ..., value]
   */
  function k (length, value) {
    return Array.apply(null, { length: length }).map(fn.k(value))
  }

  /**
   *
   * @function module:fun-vector.e
   *
   * @param {Number} length - of vector to return
   * @param {Number} index - to set to 1
   *
   * @return {Vector} unit vector valued 1 in coordinate index (e_index)
   */
  function e (length, index) {
    return array.set(index, 1, zero(length))
  }

  /**
   *
   * @function module:fun-vector.isValid
   *
   * @param {*} v - candidate to check
   *
   * @return {Boolean} if v is a valid vector
   */
  function isValid (v) {
    return predicate.type('[Number]', v)
  }

  /**
   *
   * @function module:fun-vector.normP
   *
   * @param {Number} p - value of p for pNorm
   * @param {Vector} v - vector to take pNorm of
   *
   * @return {Number} ||v||_p
   */
  function normP (p, v) {
    return scalar.exp(
      1 / p,
      v.map(compose(scalar.abs, scalar.exp(p))).reduce(scalar.sum, 0)
    )
  }

  /**
   *
   * @function module:fun-vector.normL1
   *
   * @param {Vector} v - vector to take norm of
   *
   * @return {Number} sum_i(|v_i|)
   */
  function normL1 (v) {
    return v.map(scalar.abs).reduce(scalar.sum, 0)
  }

  /**
   *
   * @function module:fun-vector.normL2
   *
   * @param {Vector} v - vector to take norm of
   *
   * @return {Number} sqrt(sum_i(v_i ^ 2))
   */
  function normL2 (v) {
    return normP(2, v)
  }

  /**
   *
   * @function module:fun-vector.normLInf
   *
   * @param {Vector} v - vector to take norm of
   *
   * @return {Number} max_i(|v_i|)
   */
  function normLInf (v) {
    return v.map(scalar.abs).reduce(scalar.max, -Infinity)
  }

  /**
   *
   * @function module:fun-vector.dim
   *
   * @param {Vector} v - vector to check dimension of
   *
   * @return {Number} length of v
   */
  function dim (v) {
    return v.length
  }

  /**
   *
   * @function module:fun-vector.unit
   *
   * @param {Vector} v - vector to get the unit of
   *
   * @return {Vector} unit vector in the direction of v
   */
  function unit (v) {
    return v.map(scalar.div(normL2(v)))
  }

  /**
   *
   * @function module:fun-vector.scale
   *
   * @param {Number} n - factor to scale by
   * @param {Vector} v - vector to scale
   *
   * @return {Vector} v scaled by n
   */
  function scale (n, v) {
    return v.map(scalar.dot(n))
  }
})()

