import { describe, it, before, after } from "mocha"
import { expect } from "chai"
import { App } from "../../lib/createServer";
import { default as fetch } from "node-fetch";

describe("Testing User Controller", () => {
    let url: string = "http://localhost:3000/users"
    before(() => {
        new App(3000).startLocal()
    })

    it('Should return all users at GET /', done => {
        fetch(url, {
            method: 'GET',
            headers: null,
            body: null
        })
        .then(res => res.json())
        .then(json => {
            expect(json).to.not.be.null
            expect(json.users.length).greaterThan(0)
            done()
        }).catch(err => {
            done(err)
        })
    })

    it('Should return one user at GET /{id}')
    it('Should add one user at POST /')
    it('Should update one user at PUT /{id}')
    it('Should delete one user at DELETE /{id}')

    after(() => {
        process.exit()
    })
})