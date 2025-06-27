-- Scénario n°4: Capacité moyenne des Airbus/Boeing, et la moyenne de consommation de kérozène par litre par heure, pour voir lequel consomme le plus. => Le responsable des ventes consulte la capacité moyenne des Airbus et des Boeing pour savoir si les avions sont rentables, et ajuster les destinations des vols.

SELECT COUNT(seat.number) FROM seat
JOIN airplane ON airplane.registration_number = seat.airplane_registration_number
GROUP BY airplane.brand;
