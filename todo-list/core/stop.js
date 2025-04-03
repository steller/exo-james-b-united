const { closeClientInstance } = require("../db/pg-client");

module.exports.stop = async (exitCode = 0) => {
  await closeClientInstance();

  process.exit(exitCode);
}
