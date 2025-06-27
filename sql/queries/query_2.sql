-- Scénario n°2: Nombre de vols effectués + nombre d'heures de vol d'un pilote. Permet de savoir si un copilote peut devenir commandant de bord. => Le chef des pilotes consulte les heures de vol des copilotes pour identifier ceux qui peuvent devenir commandants de bord avec le nombre d'heures de vol requis.

-- Nous allons regarder le nombre d'heures de vol effectuées par le copilote du nom de 'Quentine	FAURE' et le nombre de vols effectués, ainsi que la moyenne d'heures par vol.
SELECT
  e.first_name,
  e.last_name,
  COUNT(f.number) AS total_flights_completed,
  SUM(f.arrival_date_effective - f.departure_date_effective) AS total_flight_hours,
  AVG(f.arrival_date_effective - f.departure_date_effective) AS average_flight_duration
FROM
  employee AS e
  JOIN flight_employee AS fe ON e.id = fe.employee_id
  JOIN flight AS f ON fe.flight_number = f.number
WHERE
  e.first_name = 'Quentine'
  AND e.last_name = 'FAURE'
  AND e.job = 'Copilot'
  AND f.arrival_date_effective IS NOT NULL
  AND f.departure_date_effective IS NOT NULL
GROUP BY e.id;
