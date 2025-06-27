-- Scénario n°9: Nombre de kilomètres parcourus par un avion, en fonction des vols effectués. En sachant qu'un vol stocke l'aéroport de départ et aéroport d'arrivée. Et que chaque aéroport a une latitude et une longitude.

-- Utiliser une CTE pour d'abord calculer la distance de chaque vol individuel
WITH flight_distances AS (
  SELECT
    f.airplane_number,
    -- Formule de Haversine pour calculer la distance entre deux points lat/lon
    -- R = 6371 est le rayon moyen de la Terre en kilomètres.
    6371 * 2 * ASIN(
      SQRT(
        POWER(
          SIN(
            (
              RADIANS(arr_ap.latitude) - RADIANS(dep_ap.latitude)
            ) / 2
          ),
          2
        ) + COS(RADIANS(dep_ap.latitude)) * COS(RADIANS(arr_ap.latitude)) * POWER(
          SIN(
            (
              RADIANS(arr_ap.longitude) - RADIANS(dep_ap.longitude)
            ) / 2
          ),
          2
        )
      )
    ) AS distance_km
  FROM
    flight AS f
    -- Joindre pour obtenir les coordonnées de l'aéroport de départ
    JOIN airport AS dep_ap ON f.departure_airport = dep_ap.code_iata

    -- Joindre pour obtenir les coordonnées de l'aéroport d'arrivée
    JOIN airport AS arr_ap ON f.arrival_airport = arr_ap.code_iata
  WHERE
    -- S'assurer de ne calculer que pour les vols effectivement terminés
    f.arrival_date_effective IS NOT NULL
)
-- Agréger les distances par avion pour obtenir le total
SELECT
  fd.airplane_number,
  a.brand,
  a.model,
  ROUND(
    SUM(fd.distance_km)
  ) AS total_distance_flown_km
FROM
  flight_distances AS fd
  JOIN airplane AS a ON fd.airplane_number = a.registration_number
GROUP BY
  fd.airplane_number,
  a.brand,
  a.model
ORDER BY
  total_distance_flown_km DESC;
