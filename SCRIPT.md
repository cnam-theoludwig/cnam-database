# Script

## Prérequis

- [Node.js](https://nodejs.org/) >= v24.0.0 [(`nvm install 24`)](https://nvm.sh), utilisé pour générer des données
- [Docker](https://www.docker.com/)

## Installation

```sh
# Cloner le dépôt
git clone git@github.com:cnam-theoludwig/cnam-database.git

# Se déplacer dans le dossier du projet
cd cnam-database

# Configurer les variables d'environnement
# notamment `AIRPORT_DB_API_TOKEN` pour https://airportdb.io
cp .env.example .env

# Démarre les services Docker pour la gestion de la base de données
docker compose up

# Installer les dépendances (uniquement nécessaire pour générer des données)
npm clean-install
```

### Services démarrés (par défaut avec `.env.example`)

- [PostgreSQL](https://www.postgresql.org/) database, port: `5432`
- [AdminNeo](https://www.adminneo.org/): <http://localhost:8080>

## Utilisation

```sh
# Exécuter des requêtes SQL
docker compose exec airlines-database bash
psql --username="$DATABASE_USER" --host="$DATABASE_HOST" --port="$DATABASE_PORT" --dbname="$DATABASE_NAME"
SELECT * FROM "flight";

# Pour exécuter un script SQL (e.g: `tables_creation.sql`)
\i /sql/tables_creation.sql

# Script d'insertions
\i /sql/inserts/_inserts.sql

# Clear les logs
\! clear

# Quitter psql
\q

# Générer des données
node --run datagen

# Générer des données sans exécuter/insérer directement dans la base de données
# à la place créer les fichiers SQL dans le dossier `./sql/inserts/`
node --run datagen -- --sql

# Générer en faisant les reqûetes vers AirportDB (https://airportdb.io) sinon utilise les JSON déjà présents dans `src/datagen/data`
node --run datagen -- --airportdb

# Générer les types pour le script de génération de données
node --run codegen

# Pour générer le PDF à rendre
npx md-to-pdf README.md --pdf-options '{ "format": "A4", "margin": "5mm" }' --document-title "BDD Projet"
```
