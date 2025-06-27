-- Scénario n°3: Nombre de places occupés pour un vol donné sur le nombre de places total. => Un agent vérifie le taux d'occupation du vol 8784 de Paris à Los Angeles.

WITH
-- 1. Compter le nombre de billets (sièges occupés) pour le vol '8784'
occupied_seats_count AS (
  SELECT COUNT(*) AS count FROM ticket WHERE flight_number = '8784'
),

-- 2. Compter le nombre total de sièges dans l'avion de ce vol
total_seats_count AS (
  SELECT COUNT(s.number) AS count
  FROM flight AS f
  JOIN seat AS s ON f.airplane_number = s.airplane_registration_number
  WHERE f.number = '8784'
)

-- 3. Combiner les résultats et calculer le pourcentage
SELECT
  (SELECT count FROM occupied_seats_count) AS occupied_seats,
  (SELECT count FROM total_seats_count) AS total_seats,
  -- S'assurer d'une division décimale et arrondir à 2 décimales
  ROUND(
    (
      CAST((SELECT count FROM occupied_seats_count) AS NUMERIC) / (SELECT count FROM total_seats_count)
    ) * 100,
    2
  ) AS occupancy_percentage;
