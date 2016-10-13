'use strict'

const M = require('ramda-fantasy').Maybe
const R = require('ramda')

describe('Maybe:', () => {

  describe('Just: ', () => {

    it('update a value', () => {
      const r = M.of(0)
          .map(R.inc)
      expect(r).toEqual( M.Just(1) )
    })

    it('update an array', () => {
      const r = M.of([1, 2, 3])
          .map(R.map(R.inc))
      expect(r).toEqual( M.Just([2, 3, 4]) )
    })

    it('update a nested object', () => {
      const a = { a: { b: 1 } }
      const bLens = R.lensPath(['a', 'b'])
      const cLens = R.lensPath(['a', 'c'])
      const r = M.of(a)
          .map(R.set(bLens, 2))
          .map(R.set(cLens, 2))
      expect(r).toEqual( M.Just({ a: { b: 2, c: 2}}) )
    })

    it('isJust', () => {
      // true if type is Just
      const r = M.of(1)
        .isJust
      expect(r).toBe(true)
    })

    it('getOrElse', () => {
      // unwrap a value
      const r = M.of(1)
        .getOrElse()
      expect(r).toBe(1)
    })

    it('ap', () => {
      // takes a function and applies a value
      const r = M.of(R.inc).ap( M.Just(1) )
      expect(r).toEqual( M.Just(2) )
    })

    it('chain', () => {
      // applies a function and unwraps the value
      const r = M.of(1)
        .chain(R.inc)
      expect(r).toEqual( 2 )
    })

    it('equals', () => {
      // equality
      const r = M.of(1).equals(M.of(1))
      expect(r).toBe(true)
    })

    it('reduce', () => {
      // applies a function and param to the value
      const r = M.of(1).reduce(R.add, 5)
      // add(5, 1)
      expect(r).toBe(6)
    })

    it('toString', () => {
      // stringify Maybe.Type(value)
      const r = M.of(1).toString()
      expect(r).toBe('Maybe.Just(1)')
    })

  })

  describe('Nothing:', () => {

    it('should catch an undefined value', () => {
      const a = { a: { b: 1 } }
      const lookup = x => x ? M.Just(x) : M.Nothing()
      const r = lookup(a.c)
      expect(r).toBe( M.Nothing() )
    })

    it('isNothing')

    it('getOrElse Nothing')

    it('maybe')

    it('ap')

    it('chain')

    it('equals')

    it('reduce')

    it('toString')

  })

  it('maybe', () => {
    // not sure how this works
    // or why this is useful
    const r = M.maybe(0, R.inc, [1])
    expect(r).toBe( 2 )
  })

  it('chainRec')

  it('datatype')

})
