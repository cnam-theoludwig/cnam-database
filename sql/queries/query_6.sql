-- Scénario n°6: Classement des vols les plus remplis (avec le plus de passagers). => La compagnie demande à son responsable des ventes de faire un rapport sur l'occupation des petites lignes pour décider celles qu'il faudrait supprimer et identifier les vols atteignant systématiquement leur capacité maximale et planifie l'ajout d'appareils plus grands sur ces lignes.

WITH
-- 1. Compter les sièges occupés pour chaque numéro de vol
flight_occupancy AS (
  SELECT flight_number, COUNT(*) AS occupied_seats
  FROM ticket
  GROUP BY flight_number
),

-- 2. Compter la capacité totale de chaque avion
airplane_capacity AS (
  SELECT airplane_registration_number, COUNT(*) AS total_seats
  FROM seat
  GROUP BY airplane_registration_number
)

-- 3. Assembler les données, calculer le taux d'occupation et classer les vols
SELECT
  f.number AS flight_number,
  dep_ap.city AS departure_city,
  arr_ap.city AS arrival_city,
  COALESCE(fo.occupied_seats, 0) AS occupied_seats,
  ac.total_seats,
  ROUND((CAST(COALESCE(fo.occupied_seats, 0) AS NUMERIC) / ac.total_seats) * 100, 2) AS occupancy_percentage
FROM
  flight AS f

  -- Joindre pour obtenir la capacité de l'avion du vol
  JOIN airplane_capacity AS ac ON f.airplane_number = ac.airplane_registration_number

  -- LEFT JOIN pour inclure les vols qui n'ont vendu aucun billet
  LEFT JOIN flight_occupancy AS fo ON f.number = fo.flight_number

  -- Joindre deux fois la table airport pour obtenir les noms des villes
  JOIN airport AS dep_ap ON f.departure_airport = dep_ap.code_iata
  JOIN airport AS arr_ap ON f.arrival_airport = arr_ap.code_iata
ORDER BY
  occupancy_percentage DESC,
  flight_number ASC;
