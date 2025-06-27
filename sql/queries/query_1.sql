-- Scénario n°1: Paul doit prendre un vol de Paris à Los Angeles. Il consulte les horaires des vols. Il réserve le vol, et un siège.

-- On consulte les vols aller (Paris => Los Angeles) à une date donnée, par exemple le 26 octobre 2025.
SELECT
  flight.number AS flight_number,
  flight.departure_date,
  departure_airport.name AS departure_airport,
  flight.arrival_date,
  arrival_airport.name AS arrival_airport,
  airplane.brand,
  airplane.model,
  airplane.registration_number
FROM
  flight
  JOIN airport AS departure_airport ON flight.departure_airport = departure_airport.code_iata
  JOIN airport AS arrival_airport ON flight.arrival_airport = arrival_airport.code_iata
  JOIN airplane ON flight.airplane_number = airplane.registration_number
WHERE
  departure_airport.city = 'Paris'
  AND arrival_airport.city = 'Los Angeles'
  AND flight.departure_date::date = '2025-10-26'
  AND flight.arrival_date_effective IS NULL;

-- On regarde les sièges disponibles pour le vol numéro '8784'.
SELECT s.number FROM seat s WHERE s.airplane_registration_number = '0YVACI' AND number NOT IN (
  SELECT t.seat_number FROM ticket t WHERE t.flight_number = '8784'
);

-- Transaction
BEGIN;

-- Nous imaginons que le client 'theophile70@hotmail.fr' veut réserver le vol numéro '8784' (avec pour Avion '0YVACI' Airbus A320), et s'est enregistré comme passager n°1069: Théophile	LACROIX.
INSERT INTO reservation (date, customer_email) VALUES (CURRENT_DATE, 'theophile70@hotmail.fr') RETURNING number;

-- Nous prenons le siège '16E'.
INSERT INTO ticket (code, price_cents_euro, passenger_id, reservation_number, seat_number, seat_airplane_registration_number, flight_number) VALUES (
  'TICKET123456',
  15000,
  1069,
  1,
  '16E',
  '0YVACI',
  '8784'
);

COMMIT;

-- On verifie les sièges réservés pour le vol numéro '8784'.
SELECT s.number FROM seat s WHERE s.airplane_registration_number = '0YVACI' AND number IN (
  SELECT t.seat_number FROM ticket t WHERE t.flight_number = '8784'
);
