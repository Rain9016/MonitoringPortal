var server = require("../server.js")
var request = require("supertest")(server)
var assert = require("assert")
var should = require("should")

describe('test index.html response', function() {
  it('get / should be 200 and return html content', function (done) {
    request.get('/').expect(200, function (err, res){
      should.not.exist(err)
      res.text.should.containEql('<!DOCTYPE html><html><head>')
      done()
    })
  })
})
