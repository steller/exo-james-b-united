const { Client } = require('pg');
require('dotenv').config();

const log = require('../core/logger');

let clientInstance;
module.exports.getClient = async () => {
  if (!clientInstance) {
    const client = new Client({
      host: process.env.PG_HOST,
      port: process.env.PG_PORT,
      user: process.env.PG_USER,
      password: process.env.PG_PASSWORD,
      database: process.env.PG_DATABASE,
    });

    await client.connect();

    const res = await client.query('SELECT $1::text as connected', ['Connection avec succès à postgres !']);
    log.debug(res.rows[0].connected);

    clientInstance = client;
  }

  return clientInstance;
};

module.exports.closeClientInstance = async () => {
  if (clientInstance) {
    log.debug('Fermeture de la connexion à la base de données PostgreSQL...');
    await clientInstance.end();
    clientInstance = null;
  }
};
