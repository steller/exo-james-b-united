const { INSTRUCTIONS } = require("./task-instructions");
const { question } = require("./core/user-interface");

function askMenuOption() {
  const options = INSTRUCTIONS.map(({ id }) => id).join(', ');

  question(`\nQue souhaitez-vous faire ? (${options}) (ou ?, m, "menu" pour afficher le détail)`, async (answer, retry) => {
    if (answer === 'menu' || answer === '?' || answer === 'm') {
      showMenu();
    } else {
      await callbackAnswerMenu(answer, retry);
    }
  });
}
module.exports.askMenuOption = askMenuOption;

async function callbackAnswerMenu(answer, retry) {
  const instruction = INSTRUCTIONS.find(({ id }) => id == answer.trim());
  if (instruction) {
    console.log(''); // Ajout d'une ligne vide pour la lisibilité
    await instruction.callback();
    askMenuOption();
  } else {
    retry('Choix invalide, essayez à nouveau.');
  }
}

function showMenu() {
  console.log('\nMenu principal :');
  for (const instruction of INSTRUCTIONS) {
    console.log(`${instruction.id} : ${instruction.title}`);
  }

  question('Quel est votre choix parmi les options précédentes ?', callbackAnswerMenu);
}
module.exports.showMenu = showMenu;
