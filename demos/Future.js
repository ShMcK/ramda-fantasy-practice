'use strict'

const F = require('ramda-fantasy').Future
const R = require('ramda')

xdescribe('Future', () => {

  xit('basic resolve', async () => {
    // note: nothing is executed until fork is called
    const r = await new F((reject, resolve) => {
      setTimeout(() => resolve('success'))
      // reject('fail')
      }).fork(console.error, console.log)
    
    expect(r).toBe('success')
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