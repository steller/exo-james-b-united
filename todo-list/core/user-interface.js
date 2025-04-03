const readline = require('readline');

const { stop } = require("./stop");
const log = require("./logger");

let readlineInterface;
module.exports.setupInterface = () => {
  if (readlineInterface) {
    log.error('Le programme est déjà initialisé.');
    return;
  }

  readlineInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  readlineInterface.on('SIGINT', () => {
    console.log('\n\nInterruption du programme...');
    stop();
  });
};

const exitValue = 'exit';
function question(text, callback) {
  readlineInterface.question(`${text} (ou tapez "${exitValue}" pour quitter) : `, async (answer) => {
    if (answer.trim() === exitValue) {
      await stop();
      return;
    }

    const retryQuestion = (retryText = text, retryCallback = callback) => {
      question(retryText, retryCallback);
    };
    callback(answer.trim(), retryQuestion);
  });
}
module.exports.question = question;
