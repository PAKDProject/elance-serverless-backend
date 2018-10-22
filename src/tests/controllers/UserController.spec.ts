import { describe, it, before, after } from "mocha"
import { expect } from "chai"
import { default as fetch } from "node-fetch";

describe("Testing User Controller", () => {
    let url: string = "http://localhost:3000/users/";

    it('Should insert one user at POST /', done => {
        fetch(url, {method: 'POST', body: JSON.stringify({email:'testemail@elance.com',fName:'jeff',lName:'bezos'}), headers:{'Content-Type':'application/json'}})
        .then(res => res.json())
        .then(json => {
            expect(json).to.not.be.null;
            expect(json.message).to.eql('User created');
            expect(json).to.have.property('user').not.null;
        }).catch(err => {
            done(err);
        });
    });

    it('Should return all users at GET /', done => {
        fetch(url, {method: 'GET'})
        .then(res => res.json())
        .then(json => {
            expect(json).to.not.be.null;
            expect(json.users.length).greaterThan(0);
            expect(json.message).to.eql('Users found');
            done()
        }).catch(err => {
            done(err);
        });
    });

    it('Should return one user at GET /{email}', done => {
        fetch(url + 'testemail@elance.com', {method: 'GET'})
        .then(res => res.json())
        .then(json => {
            expect(json).to.not.be.null;
            expect(json.message).to.eql('User found');
            //expect(json).to.have.property('user').not.null;
        }).catch(err => {
            done(err);
        });
    });

    it('Should update one user at PUT /{email}', done => {
        fetch(url + 'testemail@elance.com', {method: 'PUT', body: JSON.stringify({fName:'the', lName:'goat'})})
        .then(res => res.json())
        .then(json => {
            expect(json).to.not.be.null;
            expect(json.message).to.eql('User updated');
            expect(json).to.have.property('user').not.null;
        }).catch(err => {
            done(err);
        });
    });

    it('Should delete one user at DELETE /{email}', done => {
        fetch(url + 'testemail@elance.com', {method: 'DELETE'})
        .then(res => res.json())
        .then(json => {
            expect(json).to.not.be.null;
            expect(json.message).to.eql('User deleted');
            expect(json).to.have.property('user').not.null;
        }).catch(err => {
            done(err);
        });
    });

    after(() => {
        process.exit();
    })
})