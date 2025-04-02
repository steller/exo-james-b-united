
## Démarrer le conteneur

Déplacer vous dans le répertoire de l'exercice et exécuter la commande suivante :

```shell
docker-compose up -d
```

## Arrêter et supprimer le conteneur proprement

```shell
docker-compose down
```

Pour supprimer les volumes associés au conteneur, ajouter l'option `-v` :

```shell
docker-compose down -v
```

## Accéder à la base de donnée

Host : `localhost`
Port : `5434` (et non pas `5432`)
Base de donnée : `exercises-b-united`
Nom d'utilisateur : `james`
Mot de passe : `vrouf-exercises`
Schéma : `public`
