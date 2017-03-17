const chai = require('chai')
const expect = chai.expect
import shortenUrl from '../public/index.js'


describe('ShortenURL', () => {
  it('should be a function', () => {
    assert.isFunction(shortenUrl, true)
  })
})
