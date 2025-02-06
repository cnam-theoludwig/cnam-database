# CNAM Database

## À propos

Projet libre réalisé dans le cadre de la formation [Ingénieur en Informatique et Systèmes d'Information (SI), CNAM](https://www.itii-alsace.fr/formations/informatique-et-systemes-dinformation-le-cnam/), pour le module Base De Données (BDD).

[Sujet](./SUJET.md)

### Membres du groupe

- [Théo LUDWIG](https://gitlab.com/theoludwig)
- [Quentin BRENNER](https://github.com/OneLiberty)

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

- [PostgreSQL](https://www.postgresql.org/) database, port: `5434`
- [Adminer](https://www.adminer.org/): <http://localhost:8080>
