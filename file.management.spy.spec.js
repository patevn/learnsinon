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
    it('Should call wfs', () => {
      const writeSpy = sinon.spy(fs, 'writeFileSync');
      const fileManagement = proxyquire('./file.management', { fs });
      fileManagement.createFile('test.txt');

      expect(writeSpy.calledOnce).to.be.true;
    });
    it('Should call wfs - injected', () => {
      const writeSpy = sinon.spy(fs, 'writeFileSync');
      fileManagement.createFileInjected('test.txt', fs);
      expect(writeSpy.calledOnce).to.be.true;
    });

    it('Should not call wfs', () => {
      const writeSpy = sinon.spy(fs, 'writeFileSync');
      const fileManagement = proxyquire('./file.management', { fs });
      try {
        fileManagement.createFile();
      } catch (e) {
        console.log(e);
      }
      expect(writeSpy.notCalled).to.be.true;
    });
  });
});
