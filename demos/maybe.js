'use strict'

const M = require('ramda-fantasy').Maybe
const R = require('ramda')

describe('Maybe:', () => {

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

  it('should catch an undefined value', () => {
    const a = { a: { b: 1 } }
    const lookup = x => x ? M.Just(x) : M.Nothing()
    const r = lookup(a.c)
    expect(r).toBe( M.Nothing() )
  })

})
