'use strict'

const E = require('ramda-fantasy').Either
const R = require('ramda')

describe('Either', () => {

  it('creates an Either (right on right)', () => {
    // E(Left, Right)
    const r = E(1, 2)
    expect(r).toEqual( E.of(2) )
  })

  it('creates a Right Either (right on left)', () => {
      // E.of(Right, Left)
      const r = E.of(1, 2);
      expect(r).toEqual( E.of(1) )
    })

  describe('Right', () => {

    it('isRight', () => {
      const r = E.of(0, 2).isRight
      expect(r).toBe(true)
    })

    it('only changes the Right value', () => {
      // only changes the Right value
      const r = E(0, 2)
        .map(R.inc)
        .chain(x => x)
      expect(r).toBe(3)
    })

    it('map', () => {
      // only maps over the right
      const r = E(0, 1).map(R.inc).chain(x => x)
      expect(r).toBe(2)
    })

  })

  describe('Left', () => {

    it('creates a Left Either', () => {
      const r = E.Left(1).isLeft
      expect(r).toBe(true)
    })

    it('is called when Right fails', () => {
      const r = E(1, 5)
        .chain(x => x > 5 ? E.Right(x) : E.Left('fail'))
        .value
      expect(r).toBe('fail')
    })

  })

})