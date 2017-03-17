const chai = require('chai')
const expect = chai.expect
const assert = chai.assert
const chaiHttp = require('chai-http')
const app = require('../server.js')
chai.use(chaiHttp)
const shortenURL = require('../public/helpers.js')

describe('Server', () => {
  it('should exist', () => {
    expect(app).to.exist
  })
})

describe('GET /', () => {
  it('should return html successfully', (done) => {
    chai.request(app)
    .get('/')
    .end((err, res) => {
      if(err) { done(err) }
      expect(res).to.have.status(200)
      expect(res).to.be.html
      done()
    })
  })
})

describe ('GET /api/folders', () => {
  it('should return all folders', () => {
    chai.request(app)
    .get('/api/folders')
    .end((err,res) => {
      if(err) { done(err)}
      expect(res).to.have.status(200)
      expect(res).to.be.json
      expect(res.body).to.be.a('object')
      done()
      })
    })
  })

describe('GET /api/folders/:id/urls', () => {
  beforeEach(done => {
    const folders = [{id:1, name:'food'},
    {id:2, name:'shoes'}]
    app.locals.folders = folders
    done()
  })
  context('if a folder is found', () => {
    it.skip('should return a specific folder', (done) => {
      chai.request(app)
      .get('/api/folders/2')
      .end((err, res) => {
        if(err) {done(err)}
        expect(res).to.have.status(200)
        expect(res).to.be.json
        expect(res.body).to.be.a('object')
        expect(res.body).to.have.property('name')
        expect(res.body.name).to.equal('shoes')
        done()
      })
    })
  })
})

describe('shortenURL', ()=> {
  it('should be a function', ()=> {
    assert.isFunction(shortenURL)
  })
})
