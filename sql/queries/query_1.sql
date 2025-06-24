-- Scénario: Paul doit prendre un vol de Paris à New York. Il consulte les horaires des vols et remarque qu'un vol retour est disponible deux jours plus tard. Il réserve les deux trajets et reçoit son itinéraire par mail.

-- 1. Consulter les vols aller (Paris => New York) à une date donnée, par exemple le 10 juillet 2025.
SELECT
  flight.number AS flight_number,
  flight.departure_date,
  departure_airport.name AS departure_airport,
  flight.arrival_date,
  arrival_airport.name AS arrival_airport,
  airplane.brand,
  airplane.model
FROM
  flight
  JOIN airport AS departure_airport ON flight.departure_airport = departure_airport.code_iata
  JOIN airport AS arrival_airport ON flight.arrival_airport = arrival_airport.code_iata
  JOIN airplane ON flight.airplane_number = airplane.registration_number
WHERE
  departure_airport.city = 'Paris'
  AND arrival_airport.city = 'New York'
  AND flight.departure_date = '2025-07-10';

-- 2. Réserver les deux vols
-- Nous imaginons que l'ID du passager Paul est 123, son email client est 'paul.client@email.com',
-- Le vol aller choisi est 'AF006' et le vol retour est 'AF007'.

-- Transaction pour que toutes les insertions réussissent ou échouent ensemble.
BEGIN;

-- Créer la réservation pour Paul
INSERT INTO reservation (date, customer_email) VALUES (CURRENT_DATE, 'paul.client@email.com');

-- Vol Aller
-- Créer le billet pour le vol aller (en utilisant le numéro de réservation 58)
INSERT INTO ticket (code, price_cents_euro, passenger_id, reservation_number) VALUES ('TICKET123ABC', 55000, 123, 58);
-- Lier le billet au vol aller
INSERT INTO flight_ticket (flight_number, ticket_code) VALUES ('AF006', 'TICKET123ABC');

-- Vol Retour
-- Créer le billet pour le vol retour (pour la même réservation)
INSERT INTO ticket (code, price_cents_euro, passenger_id, reservation_number) VALUES ('TICKET456DEF', 62000, 123, 58);
-- Lier le billet au vol retour
INSERT INTO flight_ticket (flight_number, ticket_code) VALUES ('AF007', 'TICKET456DEF');

-- Finaliser la transaction
COMMIT;
