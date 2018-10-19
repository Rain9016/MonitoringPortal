
var server = require('../server.js')
var request = require('supertest')
var assert = require('assert')
var should = require('should')
var crypto = require('crypto')

var username = 'test'
var password = 'test'
describe('test server/router/user.js', function () {

  before(function(done) {
    server = require('../server.js')
    done()
  })

  describe('test for login without register', function () {

    it('post /login with username and password', function (done) {
      request(server).post('/api/login')
      .send({data: {
        username: username,
        password: encrypt(password)
      }})
      .expect(200, function (err, res) {
        should.not.exist(err)
        res.text.should.containEql('username not exist')
        done()
      })
    })

    it('post /login without sending data', function (done) {
      request(server).post('/api/login')
      .send()
      .expect(400, function (err, res) {
        should.not.exist(err)
        res.text.should.containEql('Bad Request')
        done()
      })
    })

  })

  describe ('test register',  function () {

    it('post /register without sending data', function (done) {
      request(server).post('/api/register')
      .send()
      .expect(400, function (err, res) {
        should.not.exist(err)
        res.text.should.containEql('Bad Request')
        done()
      })
    })

    it('post /regiser with unencrypt password', function (done) {
      request(server).post('/api/register')
      .send({data: {
        username: username,
        password: password
      }})
      .expect(400, function (err, res) {
        should.not.exist(err)
        res.text.should.containEql('Bad Request')
        done()
      })
    })

    it('post /regiser with username and password', function (done) {
      request(server).post('/api/register')
      .send({data: {
        username: username,
        password: encrypt(password)
      }})
      .expect(200, function (err, res) {
        should.not.exist(err)
        res.text.should.containEql('Register success')
        done()
      })
    })

    it('post /regiser with same username and password', function (done) {
      request(server).post('/api/register')
      .send({data: {
        username: username,
        password: encrypt(password)
      }})
      .expect(200, function (err, res) {
        should.not.exist(err)
        res.text.should.containEql('username already exists')
        done()
      })
    })

  })

  describe('test for login with register', function () {

    it('post /login with username and password', function (done) {
      request(server).post('/api/login')
      .send({data: {
        username: username,
        password: encrypt(password)
      }})
      .expect(200, function (err, res) {
        should.not.exist(err)
        should.exist(res.header.token)
        res.text.should.containEql('Login Success')
        done()
      })
    })

    it('post /login with incorrect password', function (done) {
      request(server).post('/api/login')
      .send({data: {
        username: username,
        password: encrypt("etes")
      }})
      .expect(200, function (err, res) {
        should.not.exist(err)
        res.text.should.containEql('Invalid username or password')
        done()
      })
    })

    it('post /login with unencrypt password', function (done) {
      request(server).post('/api/login')
      .send({data: {
        username: username,
        password: password
      }})
      .expect(400, function (err, res) {
        should.not.exist(err)
        res.text.should.containEql('Bad Request')
        done()
      })
    })
  })

  describe('test for logout ', function () {

    it('post /logout without sending data', function (done) {
      request(server).post('/api/logout')
      .expect(400, function (err, res) {
        should.not.exist(err)
        res.text.should.containEql('Bad Request')
        done()
      })
    })


    it('post /logout with username', function (done) {
      request(server).post('/api/register')
      .send({data: {
        username: username,
        password: encrypt(password)
      }})
      .expect(200, function (err, res) {
        request(server).post('/api/logout')
        .send({data: {
          username: username
        }})
        .expect(200, function (err, res) {
          should.not.exist(err)
          res.text.should.containEql('Logout Successfully')
          done()
        })
      })


    })

    it('post /logout with wrong username', function (done) {
      request(server).post('/api/login')
      .send({data: {
        username: 'tess'
      }})
      .expect(200, function (err, res) {
        should.not.exist(err)
        res.text.should.containEql('username not exist')
        done()
      })
    })

  })




  after(function(done) {
    server = null
    done()
  })
})

function encrypt (str) {
  var cipher = crypto.createCipher('aes128', 'MonitoringPortal')
  var crypted = cipher.update(str, 'utf-8', 'hex')
  crypted += cipher.final('hex')
  return crypted
}
