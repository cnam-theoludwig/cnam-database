# CNAM Database

## À propos

Projet libre réalisé dans le cadre de la formation [Ingénieur en Informatique et Systèmes d'Information (SI), CNAM](https://www.itii-alsace.fr/formations/informatique-et-systemes-dinformation-le-cnam/), pour le module Base De Données (BDD).

- [Sujet](./docs/sujet.md)
- [Cahier des charges](./docs/cahier_des_charges.md)
- [Modèle Logique de Données (MLD)](./docs/MLD.md)
- [Modèle Conceptuel des Données (MCD)](./docs/MCD.puml)

### Membres du groupe

- [Quentin BRENNER](https://github.com/OneLiberty)
- [Théo LUDWIG](https://gitlab.com/theoludwig)

## Prérequis

- [Node.js](https://nodejs.org/) >= v22.12.0 [(`nvm install 22`)](https://nvm.sh)
- [Docker](https://www.docker.com/)

## Installation

```sh
# Cloner le dépôt
git clone git@github.com:cnam-theoludwig/cnam-database.git

# Se déplacer dans le dossier du projet
cd cnam-database

# Configurer les variables d'environnement
cp .env.example .env

# Démarre les services Docker pour la gestion de la base de données
docker compose up

# Installer les dépendances
npm clean-install
```

### Services démarrés (par défaut avec `.env.example`)

- [PostgreSQL](https://www.postgresql.org/) database, port: `5432`
- [Adminer](https://www.adminer.org/): <http://localhost:8080>

## Utilisation

```sh
# Exécuter des requêtes SQL
docker compose exec airlines-database bash
psql --username="$DATABASE_USER" --host="$DATABASE_HOST" --port="$DATABASE_PORT" --dbname="$DATABASE_NAME"
SELECT * FROM "Flight";

# Pour exécuter un script SQL (e.g: `tables_creation.sql`)
\i /sql/tables_creation.sql

# Clear les logs
\! clear

# Quitter psql
\q

# Générer des données
node --run datagen
```
