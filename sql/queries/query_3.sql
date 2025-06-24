-- Scénario n°3: Nombre de places occupés pour un vol donné. => Un agent vérifie le taux d'occupation du vol 2443 de Paris à Los Angeles.

SELECT COUNT(s.number) FROM seat s WHERE s.airplane_registration_number = 'XREEM8' AND number NOT IN (
  SELECT t.seat_number FROM ticket t WHERE t.flight_number = '2443'
);
