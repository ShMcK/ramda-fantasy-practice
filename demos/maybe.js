'use strict'

const M = require('ramda-fantasy').Maybe
const R = require('ramda')

console.log('Maybe')

// update a value
console.log('1', 
  M.of(0)
    .map(R.inc)
)
          
// update an array
console.log('2',
  M.of([1, 2, 3])
    .map(R.map(R.inc))
)

// update a nested object

const a ={ a: { b: 1 } }
const bLens = R.lensPath(['a', 'b'])
const cLens = R.lensPath(['a', 'c'])
console.log('3',
  M.of(a)
    .map(R.set(bLens, 2))
    .map(R.set(cLens, 2))
)

// catch an undefined value
const lookup = x => x ? M.Just(x) : M.Nothing()
console.log('4',
  lookup(a.c)
)
