# Cahier des charges du projet

## Contexte

Une nouvelle compagnie française **BRENNER/LUDWIG Airlines** arrive sur la marché des transports aérien en proposant un grand nombre nombre de destinations au départ de nombreux aéroports.

Elle intègre un milieu très concurrentiel et doit se démarquer par la qualité de ses services et prestations.

## Objectifs et public visé

L'objectif du projet est de gérer les vols d'une compagnie aérienne en proposant une base de données permettant de stocker les informations relatives aux vols, aux avions, aux passagers, aux aéroports, aux employés (pilotes, hôtes/hôtesses, agents de billeteries), aux réservations, aux prix.

La finalité sera d'optimiser les coûts, les ressources et les revenus de la compagnie aérienne, et de fournir des informations cruciales pour la prise de décision aux différents acteurs de la compagnie.

## Terminologie

Aucune terminologie particulière n'est necessaire pour comprendre le projet.

## Scénarios

- Paul doit prendre un vol de Paris à New York. Il consulte les horaires des vols et remarque qu'un vol retour est disponible deux jours plus tard. Il réserve les deux trajets et reçoit son itinéraire par mail.
- Vols disponible pour aller d'un aéroport à un autre à une certaine date. Avec correspondance ou non. => Sophie veut aller de Lyon à Tokyo le 15 mars. Elle trouve plusieurs options avec et sans correspondance. Elle choisit un vol avec une escale à Dubaï pour réduire les coûts.
- Nombre de vols effectués sur un Airbus/Boeing, statistiques pourcentage de vols effectués sur un Airbus/Boeing + nombre maximum de places parmi ces avions Airbus/Boeing. => Le directeur des opérations consulte le nombre de vols effectués par des avions Airbus et Boeing et regarde le kérozène consommé par ces avions afin de réduire les coûts, et regarde lequel est le plus rentable.
- Nombre de vols effectués + nombre d'heures de vol d'un pilote. Permet de savoir si un copilote peut devenir commandant de bord. => Le chef des pilotes consulte les heures de vol des copilotes pour identifier ceux qui peuvent devenir commandants de bord.
- Nombre de vols effectués par un pilote sur un avion donné. => Le chef de flotte vérifie le nombre de vols du pilote Martin sur le Boeing 777. Il note qu'il a effectué 120 vols avec cet appareil. Boeing souhaite tester un nouvel appareil sur le terrain, et cherche un pilote expérimenté ayant déjà fait 120 vols sur un appareil Boeing
- Quels avion doit être révisé/entretenu prochainement (dans le mois suivant). => L'ingénieur en chef consulte la liste des avions prévoyant un entretien dans le mois. Il en identifie cinq et planifie leur maintenance.
- Nombre de places occupés pour un vol donné. => Un agent vérifie le taux d'occupation du vol AF123 de Paris à Madrid. 85 % des places sont réservées. Il décide de lancer une promotion pour les 15 % restants.
- Capacité moyenne des Airbus/Boeing, et la moyenne de consommation de kérozène par litre par heure, pour voir lequel consomme le plus. => Le responsable des ventes consulte la capacité moyenne des Airbus et des Boeing pour savoir si les avions sont rentables, et ajuster les destinations des vols.
- Nombre de clients/passagers des vols allant d'une ville à une autre entre 2 dates. => La compagnie demande a son responsable des ventes de faire un rapport sur l'occupation des petites lignes pour décider celles qu'il faudrait supprimer.
- Vols toujours plein/capacité maximale atteinte. Classement des vols les plus remplis. => Le responsable des ventes identifie les vols atteignant systématiquement leur capacité maximale et planifie l'ajout d'appareils plus grands sur ces lignes.
- Coût des vols (à la fois pour la compagnie et pour les passagers). En sachant qu'il faut se baser sur la distance entre les aéroports de départ et d'arrivée. + il faut gérer la marge commerciale. Un analyste calcule le coût d'un vol Paris-Dubaï en fonction de la distance parcourue et des frais d'exploitation. Il applique la marge commerciale et détermine le prix des billets.
- Gestion des employés de la compagnie (Hotesse de l'air, pilotes, agent de piste, agents de billeterie, etc). Savoir qui est le pilote principal/copilote d'un vol, hôtesses de l'air présentes sur un vol, agents de billeteries/qui s'ocuppe de prendre les valises d'un vol. Pour chaque fonction (job), donner le nombre d'employés qui l'exercent et le salaire moyen, minimum, maximum. Quelles sont les fonctions pour lesquelles travaillent le plus de personnes, où travaille + de 10 personnes? => La direction consulte la base de données pour connaître le nombre d'hôtesses de l'air, pilotes et agents de billetterie. Elle ajuste les effectifs en prévision des périodes de forte affluence. => Un client s'est plaint du comportement d'une hôtesse de l'air durant son vol (AF123), le manager a besoin de retrouver les informations de l'employée pour en discuter.
- Combien de villes différentes ont été visitées par un pilote => George va prendre sa retraite et souhaite connaitre toutes les destination qu'il a pu visiter en tant que pilote, nostalgie.
- Toutes les informations sur les vols pour lesquels le pilote principal ne part pas de la ville où il habite. => Le service RH analyse les vols où les pilotes n'arrivent pas dans leur ville de résidence, pour optimiser les plannings.
- Nombre de kilomètres parcourus par un avion, en fonction des vols effectués. En sachant qu'un vol stocke uniquement ville de départ et ville d'arrivée. Et que chaque ville a une latitude et une longitude.
- Nombre de vols qui ont parcouru une distance supérieure à 1 000 km. La compagnie vérifie les vols ayant une distance supérieure à 1 000 km pour optimiser la consommation de carburant.
- (Accidents) Nombre de vols ayant eu un problème technique, nombre de vols ayant eu un accident... Le service de sécurité examine les vols ayant rencontré des problèmes techniques et les incidents signalés pour améliorer les procédures de maintenance.
- Le directeur, qui aimerait savoir, si les avions décolle et attérit à l'heure, ou si il y a des retards, afin de prendre des mesures pour améliorer la ponctualité des vols, et les prédictions de temps de vol.
- Un passager veut savoir la place qu'il occupe dans l'avion, et si il peut changer de place. => Un passager souhaite connaître les places disponibles dans l'avion et choisir celle qui lui convient, pour par exemple être à côté de sa famille.

## La quantité de données (estimation)

- Nombre d'avion dans la compagnie: 224
- Nombre d'employés: 41 000 (4 000 pilotes, 13 000 personnels de cabine, 24 000 personnels au sol)
- Nombre d'aéroports: 200
- Nombre de vols par jour : 1 800
- Nombre de passagers par jour: 200 000
