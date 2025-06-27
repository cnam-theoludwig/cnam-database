-- Scénario n°4: Capacité moyenne des Airbus/Boeing, et la moyenne de consommation de kérozène en litre par heure, pour voir lequel consomme le plus. => Le responsable des ventes consulte la capacité moyenne des Airbus et des Boeing pour savoir si les avions sont rentables, et ajuster les destinations des vols.

WITH
-- 1. Calculer la capacité moyenne en sièges pour chaque marque
brand_avg_capacity AS (
  SELECT a.brand, AVG(s.seat_count) AS average_capacity
  FROM airplane AS a
  JOIN (
    -- Sous-requête pour compter les sièges de chaque avion individuel
    SELECT
      airplane_registration_number,
      COUNT(*) AS seat_count
    FROM seat
    GROUP BY airplane_registration_number
  ) AS s ON a.registration_number = s.airplane_registration_number
  GROUP BY a.brand
),

-- 2. Calculer la consommation moyenne de carburant par heure pour chaque marque
brand_avg_fuel_consumption AS (
  SELECT
    a.brand,
    AVG(
      f.total_fuel_consumption_liter / (
        -- Calculer la durée du vol en heures (3600 secondes par heure)
        EXTRACT(EPOCH FROM (f.arrival_date_effective - f.departure_date_effective)) / 3600
      )
    ) AS average_fuel_consumption_l_per_h
  FROM
    flight AS f
    JOIN airplane AS a ON f.airplane_number = a.registration_number
  WHERE
    f.arrival_date_effective IS NOT NULL
    AND f.departure_date_effective IS NOT NULL
    AND f.total_fuel_consumption_liter > 0
  GROUP BY a.brand
)

-- 3. Combiner les deux métriques pour une vue comparative
SELECT
  COALESCE(cap.brand, fuel.brand) AS brand,
  ROUND(cap.average_capacity, 0) AS average_seat_capacity,
  ROUND(fuel.average_fuel_consumption_l_per_h, 2) AS average_fuel_consumption_l_per_h
FROM
  brand_avg_capacity AS cap
  FULL OUTER JOIN brand_avg_fuel_consumption AS fuel ON cap.brand = fuel.brand;
