const { expect } = require('chai');
const sinon = require('sinon');
const fs = require('fs');
const proxyquire = require('proxyquire');
const fileManagement = require('./file.management');

describe.skip('File Management', () => {
  afterEach(() => {
    sinon.restore();
  });

  describe('Creating a file', () => {
    it('verify that cf writes a new file', () => {
      const writeStub = sinon.stub(fs, 'writeFileSync');
      const fileManagement = proxyquire('./file.management', { fs });
      fileManagement.createFile('test.txt');

      expect(writeStub.calledOnce).to.be.true;
    });
    it('Should throw an exception if file already exists', () => {
      const writeStub = sinon.stub(fs, 'writeFileSync');
      writeStub.throws(new Error());
      const fileManagement = proxyquire('./file.management', { fs });

      expect(() => fileManagement.createFile('test.txt')).to.throw();
    });
    //todo debug this to soo what happens in the real code, dont think its testing snyting
    it('CreateFileSafe should create a filke names test1 when test already exists', () => {
      const writeStub = sinon.stub(fs, 'writeFileSync');
      const readStub = sinon.stub(fs, 'readdirSync');

      const fileManagement = proxyquire('./file.management', { fs });

      writeStub.withArgs('./data/test.txt').throws(new Error());
      writeStub.returns(undefined);
      readStub.returns(['test.txt']);
      // no asser here
      // expect(() => fileManagement.createFile('test.txt')).to.throw();
    });
    it('async test. get all files should return a file of files', () => {
      const readStub = sinon.stub(fs, 'readdir');

      const fileManagement = proxyquire('./file.management', { fs });
      readStub.yields(null, ['test.txt']);
      fileManagement.getAllFiles((err, data) => {
        expect(data).to.eql(['test.txt']);
      });
    });
  });
});

//yields for cb
//resolve for promises
// eql used for array assertions
