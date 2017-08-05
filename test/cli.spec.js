const { expect } = require('chai');
const exec = require('child_process').exec;

const execWithParams = (params) => new Promise((resolve, reject) => {
  exec(`node ./index.js ${params.join(' ')}`, (err, stdout, stderr) => {
    const outputToConsole = () => {
      console.log(`STDOUT:\n\n${stdout}\n\n`);
      console.error(`STDERR:\n\n${stderr}\n\n`);
    };

    if (err) {
      console.error(err);
      outputToConsole();
      reject(err);
    }
    outputToConsole();
    resolve(stdout);
  });
});

describe('CLI', () => {
  it('Given a QR file path - Should scan a file and output the OTP value', () => {
    return execWithParams(['./test/resources/qr/1.png'])
      .then(res => {
        const code = res.substr(-6);
        expect(code).to.be.lengthOf(6);
        expect(!!Number(code)).to.be.true;
      });
  });
});
