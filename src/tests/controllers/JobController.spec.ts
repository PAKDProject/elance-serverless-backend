import { describe, it, after } from "mocha";
import { expect } from "chai";
import { default as fetch } from "node-fetch";

describe("Testing Job Controller", () => {
    let url: string = 'http://localhost:3000/jobs/';

    it('Should return all jobs at GET /', done => {
        fetch(url, { method: 'GET' })
        .then(res => res.json())
        .then(json => {
            expect(json).to.not.be.null;
            expect(json.jobs.length).greaterThan(0);
            expect(json.message).to.eql('Jobs found');
            done();
        }).catch(err => {
            done(err);
        });
    });

    it('Should return one job at GET /{id}', done => {
        fetch(url + '1a', { method: 'GET' })
        .then(res => res.json())
        .then(json => {
            expect(json).to.not.be.null;
            expect(json.message).to.eql('Job found');
            expect(json).to.have.property('job').not.null;
            done();
        }).catch(err => {
            done(err);
        });
    });

    it('Should search jobs by its title at GET /title/{query}', done => {
        fetch(url + 'title/' + encodeURIComponent(JSON.stringify({title: "react web application for managing employee health"})))
        .then(res => res.json())
        .then(json => {
            expect(json).to.not.be.null;
            expect(json.message).to.eql('Jobs found');
            expect(json.jobs.length).greaterThan(0);
            done();
        }).catch(err => {
            done(err);
        });
    });

    it('Should search jobs by their payment GET /payment/{query}', done => {
        fetch(url + 'payment/' + encodeURIComponent(JSON.stringify({payment: 69420})))
        .then(res => res.json())
        .then(json => {
            expect(json).to.not.be.null;
            expect(json.message).to.eql('Jobs found');
            expect(json.jobs.length).greaterThan(0);
            done();
        }).catch(err => {
            done(err);
        });
    });

    it('Should insert one job at POST /', done => {
        fetch(url, {method: 'POST', body: JSON.stringify({id:'d813c1ebd73f82fb801dadadasd', title:'my test job',payment:696969,employer:'papa jeff'}), headers:{'Content-Type':'application/json'}})
        .then(res => res.json())
        .then(json => {
            expect(json).to.not.be.null;
            expect(json.message).to.eql('Job created');
            expect(json).to.have.property('job').not.null;
            done();
        }).catch(err => {
            done(err);
        });
    });

    it('Should update one job at PUT /{id}', done => {
        fetch(url + '2b', {method: 'PUT', body: JSON.stringify({title:'the goatest job', payment:420}), headers:{'Content-Type':'application/json'}})
        .then(res => res.json())
        .then(json => {
            expect(json).to.not.be.null;
            expect(json.message).to.eql('Job updated');
            expect(json).to.have.property('job').not.null;
            done();
        }).catch(err => {
            done(err);
        });
    });

    it('Should delete one job at DELETE /{id}', done => {
        fetch(url + '3c', {method: 'DELETE'})
        .then(res => res.json())
        .then(json => {
            expect(json).to.not.be.null;
            expect(json.message).to.eql('Job deleted');
            expect(json).to.have.property('job').not.null;
            done();
        }).catch(err => {
            done(err);
        });
    });

    after(() => {
        process.exit();
    })
})