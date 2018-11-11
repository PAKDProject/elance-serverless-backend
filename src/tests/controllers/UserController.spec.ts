import { describe, it, after } from "mocha";
import { expect } from "chai";
import { default as fetch } from "node-fetch";

describe("Testing User Controller", () => {
    let url: string = 'http://localhost:3000/users/';

    it('Should return all users at GET /', done => {
        fetch(url, { method: 'GET' })
        .then(res => res.json())
        .then(json => {
            expect(json).to.not.be.null;
            expect(json.users.length).greaterThan(0);
            expect(json.message).to.eql('Users found');
            done();
        }).catch(err => {
            done(err);
        });
    });

    it('Should return one user at GET /{id}', done => {
        fetch(url + 'd813c1eb-d73f-482f-b801-9519b664e706', { method: 'GET' })
        .then(res => res.json())
        .then(json => {
            expect(json).to.not.be.null;
            expect(json.message).to.eql('User found');
            expect(json).to.have.property('user').not.null;
            done();
        }).catch(err => {
            done(err);
        });
    });

    it('Should insert one user at POST /', done => {
        fetch(url, {method: 'POST', body: JSON.stringify({id:'d813c1eb-d73f-482f-b801-dadadasd', email:'testemail@elance.site',fName:'jeff',lName:'bezos'}), headers:{'Content-Type':'application/json'}})
        .then(res => res.json())
        .then(json => {
            expect(json).to.not.be.null;
            expect(json.message).to.eql('User created');
            expect(json).to.have.property('user').not.null;
            done();
        }).catch(err => {
            done(err);
        });
    });

    it('Should update one user at PUT /{id}', done => {
        fetch(url + 'd813c1eb-d73f-482f-b801-9519b664e706', {method: 'PUT', body: JSON.stringify({fName:'the', lName:'goat'}), headers:{'Content-Type':'application/json'}})
        .then(res => res.json())
        .then(json => {
            expect(json).to.not.be.null;
            expect(json.message).to.eql('User updated');
            expect(json).to.have.property('user').not.null;
            done();
        }).catch(err => {
            done(err);
        });
    });

    it('Should delete one user at DELETE /{id}', done => {
        fetch(url + 'd813c1eb-d73f-482f-b801-9519b664e706', {method: 'DELETE'})
        .then(res => res.json())
        .then(json => {
            expect(json).to.not.be.null;
            expect(json.message).to.eql('User deleted');
            expect(json).to.have.property('user').not.null;
            done();
        }).catch(err => {
            done(err);
        });
    });

    after(() => {
        process.exit();
    })
})