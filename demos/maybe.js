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

    // note: M.Nothing === {}

    it('should catch an undefined value', () => {
      const a = { a: { b: 1 } }
      const lookup = x => x ? M.Just(x) : M.Nothing()
      const r = lookup(a.c)
      expect(r).toBe( M.Nothing() )
    })

    it('isNothing', () => {
      // type check for Nothing
      const r = M.Nothing().isNothing
      expect(r).toBe(true)
    })

    it('getOrElse Nothing', () => {
      // provide a default value if not found
      const r = M.Nothing().getOrElse('not found')
      expect(r).toBe('not found')
    })

    it('ap', () => {
      const r = M.Nothing(R.inc).ap( M.Just(1) )
      expect(r).toEqual( M.Nothing() )
    })

    it('chain', () => {
      // returns Nothing(), an empty object regardless
      const r = M.Nothing(42).chain(R.inc)
      expect(r).toEqual( M.Nothing() )
    })

    it('equals', () => {
      // always equals Nothing() || {}
      const r = M.Nothing().equals( M.Nothing() )
      expect(r).toBe(true)
    })

    it('not equals', () => {
      // check equality
      const r = M.Nothing().equals(42)
      expect(r).toBe(false)
    })

    it('reduce', () => {
      // ignores value, only returns additional param
      const r = M.Nothing(41).reduce(R.add, 1)
      expect(r).toEqual( 1 )
    })

    it('toString', () => {
      const r = M.Nothing().toString()
      expect(r).toBe('Maybe.Nothing()')
    })

  })

  it('maybe', () => {
    // not sure how this works
    // or why this is useful
    const r = M.maybe(0, R.inc, [1])
    expect(r).toBe( 2 )
  })

  xit('chainRec', () => {
    // unclear how this works
  })

})
