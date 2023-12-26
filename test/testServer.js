const { expect } = require("chai");
const request = require("request");
const url = 'http://localhost:3000/api/swiss';

describe("Swiss API Tests", () => {

    // POST /api/swiss - Test for successful creation
    describe("POST /swiss", () => {
        it("should create a new Swiss record", (done) => {
            request.post({
                url: url,
                form: { title: 'New Swiss', path: '/images/new.jpg' }
            }, (err, res, body) => {
                expect(res.statusCode).to.equal(201);
                const response = JSON.parse(body);
                expect(response).to.be.an('object');
                // Correct the expected message to match the server response
                expect(response.message).to.equal('Swiss posted successfully');
                expect(response.data).not.to.be.null;
                done();
            });
        });
        
        it("should return an error for non-string title", (done) => {
            request.post({
                url: url,
                form: { title: 12345, path: '/images/example.jpg' }
            }, (err, res, body) => {
                expect(res.statusCode).to.equal(400);
                const response = JSON.parse(body);
                expect(response.message).to.equal('Unsuitable title');
                expect(response.result).to.be.null;
                done();
            });
        });
    
        it("should return an error for incorrect image path format (missing prefix)", (done) => {
            request.post({
                url: url,
                form: { title: 'Example Title', path: 'example.jpg' }
            }, (err, res, body) => {
                expect(res.statusCode).to.equal(400);
                const response = JSON.parse(body);
                expect(response.message).to.equal('Invalid image path format');
                expect(response.result).to.be.null;
                done();
            });
        });
    
        it("should return an error for incorrect image path format (wrong extension)", (done) => {
            request.post({
                url: url,
                form: { title: 'Example Title', path: '/images/example.png' }
            }, (err, res, body) => {
                expect(res.statusCode).to.equal(400);
                const response = JSON.parse(body);
                expect(response.message).to.equal('Invalid image path format');
                expect(response.result).to.be.null;
                done();
            });
        });
    });

    // GET /api/swiss - Test for retrieving all records
    describe("GET /swiss", () => {
        it("should get all Swiss records", (done) => {
            request.get(url, (err, res, body) => {
                expect(res.statusCode).to.equal(200);
                const response = JSON.parse(body);
                expect(response).to.be.an('object');
                expect(response.data).to.be.an('array');
                done();
            });
        });
        
    });

    describe("GET /swiss/record/:id", () => {
        it("should retrieve a specific Swiss record by id", (done) => {
            const testId = '65816e3e89a47817e20255b5'; 
            request.get(`${url}/record/${testId}`, (err, res, body) => {
                expect(res.statusCode).to.equal(200);
                const response = JSON.parse(body);
                expect(response).to.be.an('object');
                expect(response._id).to.equal(testId);
                done();
            });
        });
    
        it("should return a 404 error for a non-existing Swiss record", (done) => {
            const nonExistingId = '123456789012345678901234'; 
            request.get(`${url}/record/${nonExistingId}`, (err, res, body) => {
                expect(res.statusCode).to.equal(404);
                const response = JSON.parse(body);
                expect(response.message).to.equal('Record not found');
                done();
            });
        });
    });
    
});
