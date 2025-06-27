-- Scénario n°7: Le directeur, qui aimerait savoir, si les avions décolle et attérit à l'heure, ou si il y a des retards, afin de prendre des mesures pour améliorer la ponctualité des vols, et les prédictions de temps de vol.

SELECT
  f.number AS flight_number,
  dep_ap.city AS departure_city,
  arr_ap.city AS arrival_city,

  -- Calcul du retard au départ. Un résultat positif signifie un retard.
  (
    f.departure_date_effective - f.departure_date
  ) AS departure_delay,

  -- Calcul du retard à l'arrivée. Un résultat positif signifie un retard.
  (
    f.arrival_date_effective - f.arrival_date
  ) AS arrival_delay,

  -- Calcul de l'erreur de prédiction de la durée du vol.
  -- Un résultat positif signifie que le vol a duré plus longtemps que prévu.
  (
    f.arrival_date_effective - f.departure_date_effective
  ) - (f.arrival_date - f.departure_date) AS duration_prediction_error
FROM
  flight AS f
  -- Joindre deux fois la table airport pour obtenir les noms des villes
  JOIN airport AS dep_ap ON f.departure_airport = dep_ap.code_iata
  JOIN airport AS arr_ap ON f.arrival_airport = arr_ap.code_iata
WHERE
  f.departure_date_effective IS NOT NULL
  AND f.arrival_date_effective IS NOT NULL
ORDER BY
  arrival_delay DESC,
  departure_delay DESC;
