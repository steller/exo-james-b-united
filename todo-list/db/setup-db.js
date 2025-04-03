const log = require('../core/logger');
const { getClient } = require('./pg-client');

const { globSync } = require('glob');
const path = require('path');
const fs = require('fs');

module.exports = async () => {
  const client = await getClient();

  try {
    const res = await client.query(
      "SELECT 1 FROM information_schema.tables WHERE table_name = 'migrations'"
    );
    if (res.rowCount === 0) {
      // Créer une table de migrations pour éviter les exécutions multiples
      await client.query("CREATE TABLE migrations (id SERIAL PRIMARY KEY, fichier TEXT NOT NULL, date_execution TIMESTAMP DEFAULT NOW())");
    }

    const fileAlreadyMigrate = await client.query("SELECT * FROM migrations");

    // Cette étape doit être synchrone pour que le programme ne continue pas avant que
    // tous les fichiers d'init sql ne soient exécutés correctement.
    // Par ailleurs, chaque script doit attendre que le précédent soit terminé avant de commencer.
    const setupFiles = globSync(path.join(__dirname, "setup-sql") + "/*.sql")
      .filter(file => !fileAlreadyMigrate.rows.some(row => row.fichier === file))
      .sort();

    for (const file of setupFiles) {
      log.info(`Executing query file : ${file}`);

      const sqlQuery = fs.readFileSync(file, "utf8");
      log.debug(`Executing query : ${sqlQuery}`);

      await client.query(sqlQuery);
      await client.query("INSERT INTO migrations (fichier) VALUES ($1)", [file]);
    }
  } catch (err) {
    log.error("Erreur lors du setup : ", err);
  }
};
