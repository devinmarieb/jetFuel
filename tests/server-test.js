const chai = require('chai')
const expect = chai.expect
const should = chai.should
const assert = chai.assert
const chaiHttp = require('chai-http')
const app = require('../server.js')
chai.use(chaiHttp)
const {shortenURL, reduceURL} = require('../public/helpers.js')

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

  it('should return a 404 status code for an invalid path', () => {
    chai.request(app)
    .get('/api/bananas')
    .end((err, res) => {
      if(err) { done(err) }
      expect(res).to.have.status(404)
      expect(res.body).to.be.a('object')
      done()
      })
    })
  })

describe('GET /api/folders/:id/urls', () => {
  context('if a folder is found', () => {
    it('should return a specific folder', () => {
      const folder = {
        id: 2,
        name: 'desserts'
      }
      chai.request(app)
      .get(`/api/folders/${folder.id}`)
      .end((err, res) => {
        if(err) {done(err)}
        expect(res).to.have.status(201)
        expect(res).to.be.json
        expect(res.body).to.be.a('object')
        done()
      })
    })

  it('should return the urls within the specified folder', () => {
    const folder = {
      id: 2,
      name: 'desserts'
    }
    const urls = [
      {
        id:1,
        longURL: 'http://www.boardgamegeek.com',
        shortenedURL: 'bgg.co',
        clicks: 0,
        folderID: folder.id
      },
      {
        id:2,
        longURL: 'http://www.medium.com',
        shortenedURL: 'med.iu',
        clicks: 0,
        folderID: folder.id
      }
    ]
    chai.request(app)
    .get(`/api/folders/${folder.id}/urls`)
    .end((err, res) => {
      if (err) { done(err) }
      expect(res).to.have.status(200)
      expect(res).to.be.json
      expect(res.body).to.be.a('object')
      expect(res.body.length).to.equal(2)
      expect(res.body[0].shortenedURL).to.be('bgg.co')
      expect(res.body[0].longURL).to.be('http://www.boardgamegeek.com')
      expect(res.body[1].shortenedURL).to.be('med.iu')
      expect(res.body[1].longURL).to.be('http://www.medium.com')
      done()
      })
    })

  })
})

describe('GET /api/folders/:id/urls/mostRecent', () => {
  context('if a folder is found', () => {
    it('should return a specific folder', () => {
      const folder = {
        id: 2,
        name: 'desserts'
      }
      const urls = [
        {
          id:1,
          longURL: 'http://www.boardgamegeek.com',
          shortenedURL: 'bgg.co',
          clicks: 0,
          folderID: folder.id,
          created_at: '2017-03-19T22:31:13.606Z'
        },
        {
          id:2,
          longURL: 'http://www.medium.com',
          shortenedURL: 'med.iu',
          clicks: 0,
          folderID: folder.id,
          created_at: '2017-03-19T22:30:18.323Z'
        }
      ]
      chai.request(app)
      .get(`/api/folders/${folder.id}/urls/mostRecent`)
      .end((err, res) => {
        if(err) {done(err)}
        expect(res).to.have.status(200)
        expect(res).to.be.json
        expect(res.body).to.be.a('object')
        expect(res.body[0].created_at).to.be('2017-03-19T22:31:13.606Z')
        done()
      })
    })

  })
})

describe('GET /api/folders/:id/urls/visitCount', () => {
  context('if a folder is found', () => {
    it('should return a specific folder', () => {
      const folder = {
        id: 2,
        name: 'desserts'
      }
      const urls = [
        {
          id:1,
          longURL: 'http://www.boardgamegeek.com',
          shortenedURL: 'bgg.co',
          clicks: 2,
          folderID: folder.id,
          created_at: '2017-03-19T22:31:13.606Z'
        },
        {
          id:2,
          longURL: 'http://www.medium.com',
          shortenedURL: 'med.iu',
          clicks: 5,
          folderID: folder.id,
          created_at: '2017-03-19T22:30:18.323Z'
        }
      ]
      chai.request(app)
      .get(`/api/folders/${folder.id}/urls/mostRecent`)
      .end((err, res) => {
        if(err) {done(err)}
        expect(res).to.have.status(200)
        expect(res).to.be.json
        expect(res.body).to.be.a('object')
        expect(res.body[0].clicks).to.be(2)
        done()
      })
    })

  })
})

  describe('POST /api/folders', () => {

    context('if folder is valid', () => {
      it('should return a specific folder', () => {
        chai.request(app)
        .post('/api/folders')
        .send({
            id: 2,
            name: 'desserts'
        })
        .end((err, res) => {
          if (err) { done(err) }
          expect(res).to.have.status(200)
          expect(res).to.be.json
          expect(res.body).to.be.a('object')
          expect(res.body.id).to.be(2)
          expect(res.body.name).to.be('desserts')
          done()
        })
      })
    })

    context('if a folder is not valid', () => {
      it('should reurn a 422 Unprocessable Entity status code', () => {
        chai.request(app)
        .post('/api/folders')
        .send({
          link: 'this should not work'
        })
        .end((err, res) => {
          if(err) { done(err) }
          expect(res).to.have.status(422)
          expect(res.body).to.be.a('object')
          done()
        })
      })
    })
  })

describe('POST /api/folders/:id/urls', () => {
  beforeEach((done) => {
    const folder = {
      id: 2,
      name: 'desserts'
    }
    const urls = [
      {
        id:1,
        longURL: 'http://www.boardgamegeek.com',
        shortenedURL: 'bgg.co',
        clicks: 0,
        folderID: folder.id
      },
      {
        id:2,
        longURL: 'http://www.medium.com',
        shortenedURL: 'med.iu',
        clicks: 0,
        folderID: folder.id
      }
    ]
    app.locals.folder = folder
    app.locals.urls = urls
    done()
  })

  context('if a folder is found', () => {
    it('should store a specicfic url', () => {
      chai.request(app)
      .post(`/api/folders/${app.locals.folder.id}/urls`)
      .send({
        id:3,
        longURL: 'http://www.github.com',
        shortenedURL: 'git.hu',
        clicks: 0,
        folderID: app.locals.folder.id
      })
      .end((err, res) => {
        if (err) { done(err) }
        expect(res).to.have.status(200)
        expect(res).to.be.json
        expect(res.body).to.be.a('object')
        expect(res.body.longURL).to.be('http://www.github.com')
        done()
      })
    })
  })
})

describe('/:shortURL', () => {
  beforeEach((done) => {
    const urls = [
      {
        id:1,
        longURL: 'http://www.boardgamegeek.com',
        shortenedURL: 'bgg.co',
        clicks: 0,
      },
      {
        id:2,
        longURL: 'http://www.medium.com',
        shortenedURL: 'med.iu',
        clicks: 0,
      }
    ]
    app.locals.urls = urls
    done()
  })

  it('should redirect to the longURL if the shortURL matches in the database', () => {
    chai.request(app)
    .get(`/${app.locals.urls[0].shortenedURL}`)
    .end((err, res) => {
      expect(err).to.not.exist
      expect(res).to.have.status(302)
      expect(res).to.redirectTo('http://www.boardgamegeek.com')
      expect(res).to.be.json
      expect(res.body).to.be.a('array')
      expect(res.body.longURL).to.be('http://www.boardgamegeek.com')
      done()
    })
  })
})

describe('PUT /:shortURL', () => {
  beforeEach((done) => {
    const folder = {
      id: 2,
      name: 'desserts'
    }
    const urls = [
      {
        id:1,
        longURL: 'http://www.boardgamegeek.com',
        shortenedURL: 'bgg.co',
        clicks: 1,
        folderID: folder.id
      },
      {
        id:2,
        longURL: 'http://www.medium.com',
        shortenedURL: 'med.iu',
        clicks: 0,
        folderID: folder.id
      }
    ]
    app.locals.folder = folder
    app.locals.urls = urls
    done()
  })

it('should increment the count of a single URL when clicked',() => {
  chai.request(app)
  .put(`/${app.locals.urls.shortenedURL}`)
  .send({ clicks: (app.locals.urls[0].clicks) + 1 })
  .end((err, res) => {
    expect(res).to.have.status(200)
    expect(res.body[0].clicks).to.be(2)
    expect(res).to.be.json
    expect(res.body).to.be.a('array')
    done()
  })
})

})

describe('shortenURL', ()=> {
  it('should be a function', ()=> {
    assert.isFunction(shortenURL)
  })
})

describe('reduceURL', ()=> {
  it('should be a function', ()=> {
    assert.isFunction(reduceURL)
  })
})
