const setupDatabase = require('../db/setup-db');
const { setupInterface } = require("./user-interface");

module.exports.setup = async () => {
  await setupDatabase();

  setupInterface();
};
