const { getClient } = require("./db/pg-client");
const { question } = require("./core/user-interface");

const INSTRUCTIONS = [
  {
    id: 1,
    title: 'Ajouter une tâche',
    callback: async () => {
      await addTask();
    }
  },
  {
    id: 2,
    title: "Changer le status d'une tâche",
    callback: async () => {
      await changeStateTask();
    }
  },
  {
    id: 3,
    title: 'Supprimer une tâche',
    callback: () => {
      console.log('TODO : A implémenter !'); // TODO fonctionnalité à implémenter
    }
  },
  {
    id: 4,
    title: 'Afficher la liste des tâches',
    callback: async () => {
      await printListTasks();
    }
  },
  {
    id: 5,
    title: 'Sauvegarder les tâches non sauvegardées',
    callback: () => {
      console.log('TODO : A implémenter !'); // TODO fonctionnalité à implémenter
    }
  }
];
module.exports.INSTRUCTIONS = INSTRUCTIONS;

async function printListTasks() {
  const client = await getClient();
  const res = await client.query('SELECT * FROM taches WHERE statut <> $1 ORDER BY statut, id', ['terminée']);
  if (res.rowCount > 0) {
    console.log('Voici les tâches :');
    res.rows.forEach(row => {
      const description = row.description ? ` (${row.description})` : '';
      console.log(`${row.id} - [${row.statut}] ${row.titre}${description}`);
    });
  } else {
    console.log('Aucune tâche à faire ou en cours pour le moment.');
  }
}

async function addTask() {
  return new Promise(resolve => {
    question('Entrez le titre de la tâche :', (title) => {
      question('Entrez une description pour la tâche (optionnelle) :', async (description) => {
        const client = await getClient();
        await client.query('INSERT INTO taches (titre, description) VALUES ($1, $2)', [title, description]);
        console.log(`Tâche "${title}" ajoutée avec succès.`);
        resolve();
      });
    });
  });
}

async function changeStateTask() {
  return new Promise(resolve => {
    question("Entrez l'id de la tâche à changer", async (id) => {
      question('Entrez le nouveau statut de la tâche ("en cours", c ou "terminee", t) :', async (status, retry) => {
        status = status === 'c' ? 'en cours' : (status === 't' || status === 'terminee' ? 'terminée' : null);
        if (!status) {
          retry('Statut invalide, essayez à nouveau');
          return;
        }

        const client = await getClient();
        const res = await client.query('SELECT id FROM taches WHERE statut <> $1 AND id = $2', ['terminée', id]);
        if (res.rowCount === 0) {
          console.log(`Aucune tâche trouvée avec l'id ${id} ou la tâche est déjà terminée.`);
          resolve();
          return;
        }

        await client.query('UPDATE taches SET statut = $1 WHERE id = $2', [status, id]);
        console.log(`Statut de la tâche ${id} changé avec succès.`);
        resolve();
      });
    });
  });
}
