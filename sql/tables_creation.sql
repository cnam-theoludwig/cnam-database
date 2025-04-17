SET standard_conforming_strings = on;
SET client_encoding = 'UTF8';
SET client_min_messages = warning;

DROP TABLE IF EXISTS flight_seat CASCADE;
DROP TABLE IF EXISTS flight_ticket CASCADE;
DROP TABLE IF EXISTS flight_employee CASCADE;
DROP TABLE IF EXISTS ticket CASCADE;
DROP TABLE IF EXISTS reservation CASCADE;
DROP TABLE IF EXISTS seat CASCADE;
DROP TABLE IF EXISTS incident CASCADE;
DROP TABLE IF EXISTS maintenance_history CASCADE;
DROP TABLE IF EXISTS flight CASCADE;
DROP TABLE IF EXISTS airplane CASCADE;
DROP TABLE IF EXISTS airport CASCADE;
DROP TABLE IF EXISTS employee CASCADE;
DROP TABLE IF EXISTS passenger CASCADE;
DROP TABLE IF EXISTS customer CASCADE;

CREATE TABLE
  passenger (
    id SERIAL PRIMARY KEY,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL
  );

CREATE TABLE
  customer (email TEXT PRIMARY KEY, PASSWORD TEXT NOT NULL);

CREATE TABLE
  employee (
    id SERIAL PRIMARY KEY,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    job TEXT NOT NULL,
    hire_date DATE NOT NULL,
    salary_cents_euro INTEGER NOT NULL
  );

CREATE TABLE
  reservation (
    number SERIAL PRIMARY KEY,
    date DATE NOT NULL,
    customer_email TEXT REFERENCES customer (email)
  );

CREATE TABLE
  ticket (
    code TEXT PRIMARY KEY,
    price_cents_euro INTEGER NOT NULL,
    baggage_weight_kg NUMERIC(5, 2),
    baggage_dimensions_cm2 INTEGER,
    passenger_id INTEGER REFERENCES passenger (id),
    reservation_number INTEGER REFERENCES reservation (number)
  );

CREATE TABLE
  airport (
    code_iata TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    address TEXT,
    country TEXT,
    city TEXT,
    latitude DOUBLE PRECISION,
    longitude DOUBLE PRECISION,
    price_cents_euro_per_month INTEGER
  );

CREATE TABLE
  airplane (
    registration_number TEXT PRIMARY KEY,
    model TEXT NOT NULL,
    fuel_capacity INTEGER,
    brand TEXT,
    price_cents_euro INTEGER,
    baggage_max_weight_kg NUMERIC(5, 2),
    baggage_allowed_dimensions_cm2 INTEGER
  );

CREATE TABLE
  flight (
    number TEXT PRIMARY KEY,
    departure_date TIMESTAMP NOT NULL,
    arrival_date TIMESTAMP NOT NULL,
    arrival_date_effective TIMESTAMP,
    departure_date_effective TIMESTAMP,
    fuel_consumption NUMERIC(6, 2),
    arrival_airport TEXT REFERENCES airport (code_iata),
    departure_airport TEXT REFERENCES airport (code_iata),
    airplane_number TEXT REFERENCES airplane (registration_number)
  );

CREATE TABLE
  flight_employee (
    flight_number TEXT REFERENCES flight (number),
    employee_id INTEGER REFERENCES employee (id),
    PRIMARY KEY (flight_number, employee_id)
  );

CREATE TABLE
  flight_ticket (
    flight_number TEXT REFERENCES flight (number),
    ticket_code TEXT REFERENCES ticket (code),
    PRIMARY KEY (flight_number, ticket_code)
  );

CREATE TABLE
  seat (
    number TEXT,
    airplane_registration_number TEXT REFERENCES airplane (registration_number),
    class TEXT,
    PRIMARY KEY (number, airplane_registration_number)
  );

CREATE TABLE
  flight_seat (
    flight_number TEXT REFERENCES flight (number),
    seat_number TEXT,
    airplane_registration_number TEXT,
    PRIMARY KEY (
      flight_number,
      seat_number,
      airplane_registration_number
    ),
    FOREIGN KEY (seat_number, airplane_registration_number) REFERENCES seat (number, airplane_registration_number)
  );

CREATE TABLE
  maintenance_history (
    maintenance_date DATE,
    airplane_registration_number TEXT REFERENCES airplane (registration_number),
    result TEXT,
    cost_cents_euro INTEGER,
    PRIMARY KEY (maintenance_date, airplane_registration_number)
  );

CREATE TABLE
  incident (
    number SERIAL PRIMARY KEY,
    description TEXT,
    date DATE NOT NULL,
    flight_number TEXT REFERENCES flight (number)
  );
