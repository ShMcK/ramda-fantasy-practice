'use strict'

const F = require('ramda-fantasy').Future
const R = require('ramda')

describe('Future', () => {

  it('basic Promise', async () => {
    // for contrasting with Futures
    let r = await new Promise((res, rej) => res('success'))
    expect(r).toBe('success')
  })

  it('basic Future', async () => {
    // note: nothing is executed until fork is called
    // fork cannot return anything, must use an extra variable
    let x
    let r = await F((rej, res) => res('success'))
      .fork(console.error, y => x = y)
    expect(x).toBe('success')
  })

  it('reject')

  it('fork')

  it('map')

  it('ap')

  it('chain')

  it('chainRec')

  it('chainReject')

  it('bimap')

  it('cache')

  it('composeP')

  it('pipeP')

})