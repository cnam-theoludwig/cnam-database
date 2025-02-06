# Cahier des charges du projet

## Contexte

Gestion des vols d'avions d'une compagnie aérienne **LUDWIG Airlines**. La compagnie propose des vols au départ de nombreux aéroports avec un nombre conséquent de destinations.

## Objectifs et public visé

L'objectif du projet est de gérer les vols d'une compagnie aérienne en proposant une base de données permettant de stocker les informations relatives aux vols, aux avions, aux passagers, aux aéroports, aux employés/pilotes, aux réservations, aux prix.

## Terminologie

## Scénarios

- Le départ et l'arrivée des vols, où il existe un vol retour.
- Vols disponible pour aller d'un aéroport à un autre à une certaine date. Avec correspondance ou non.
- Nombre de vols effectués sur un Airbus/Boeing, statistiques pourcentage de vols effectués sur un Airbus/Boeing + nombre maximum de places parmi ces avions Airbus/Boeing.
- Nombre de vols effectués + nombre d'heures de vol d'un pilote.
- Nombre de vols effectués par un pilote sur un avion donné.
- Quels avion doit être révisé/entretenu prochainement (dans le mois suivant).
- Nombre de places occupés pour un vol donné.
- Capacité moyenne des Airbus/Boeing.
- Nombre de clients/passagers des vols allant d'une ville à une autre entre 2 dates.
- Vols toujours plein/capacité maximale atteinte. Classement des vols les plus remplis.
- Coût des vols (à la fois pour la compagnie et pour les passagers). En sachant qu'il faut se baser sur la distance entre les aéroports de départ et d'arrivée. + il faut gérer la marge commerciale.
- Pouvoir réserver un vol pour une date donnée.
- Gestion des employés de la compagnie (Hotesse de l'air, pilotes, agent de piste, agents de billeterie, etc). Savoir qui est le pilote principal/copilote d'un vol, hôtesses de l'air présentes sur un vol, agents de billeteries/qui s'ocuppe de prendre les valises d'un vol. Pour chaque fonction (job), donner le nombre d'employés qui l'exercent et le salaire moyen, minimum, maximum. Quelles sont les fonctions pour lesquelles travaillent le plus de personnes, où travaille + de 10 personnes?
- Le nom des pilotes sur les vols où l'arrivée n'est pas une ville donné. Combien de villes différentes ont été visitées par un pilote.
- Toutes les informations sur les vols pour lesquels le pilote principal ne part pas de la ville où il habite.
- Nombre de kilomètres parcourus par un avion, en fonction des vols effectués. En sachant qu'un vol stocke uniquement ville de départ et ville d'arrivée. Et que chaque ville a une latitude et une longitude.
- Nombre de vols qui ont parcouru une distance supérieure à 1000 km.
- (Accidents) Nombre de vols ayant eu un problème technique, nombre de vols ayant eu un accident..

## La quantité de données (estimation)
