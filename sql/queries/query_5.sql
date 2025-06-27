-- Scénario n°5: Combien de villes différentes ont été visitées par un pilote => 'Michèle LEGRAND' va prendre sa retraite et souhaite connaitre toutes les destination qu'il a pu visiter en tant que pilote, nostalgie.

SELECT ap.city AS destination_city, COUNT(ap.city) AS number_of_visits
FROM employee AS e
  JOIN flight_employee AS fe ON e.id = fe.employee_id
  JOIN flight AS f ON fe.flight_number = f.number
  JOIN airport AS ap ON f.arrival_airport = ap.code_iata
WHERE
  e.first_name = 'Michèle'
  AND e.last_name = 'LEGRAND'
  AND e.job = 'Pilot'
  AND f.arrival_date_effective IS NOT NULL
GROUP BY ap.city
ORDER BY number_of_visits DESC, destination_city ASC;
