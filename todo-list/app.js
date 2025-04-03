const { setup } = require('./core/setup');
const { showMenu } = require("./menu-interface");

(async () => {
  await setup();

  showMenu();
})();
