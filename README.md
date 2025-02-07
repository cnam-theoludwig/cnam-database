# CNAM Database

## À propos

Projet libre réalisé dans le cadre de la formation [Ingénieur en Informatique et Systèmes d'Information (SI), CNAM](https://www.itii-alsace.fr/formations/informatique-et-systemes-dinformation-le-cnam/), pour le module Base De Données (BDD).

- [Sujet](./docs/sujet.md)
- [Cahier des charges](./docs/cahier_des_charges.md)

### Membres du groupe

- [Quentin BRENNER](https://github.com/OneLiberty)
- [Théo LUDWIG](https://gitlab.com/theoludwig)

## Prérequis

[Docker](https://www.docker.com/)

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
```

### Services démarrés (par défaut avec `.env.example`)

- [PostgreSQL](https://www.postgresql.org/) database, port: `5434`
- [Adminer](https://www.adminer.org/): <http://localhost:8080>
