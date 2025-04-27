SET client_min_messages = warning;

DROP TYPE IF EXISTS aviation_job CASCADE;
DROP TYPE IF EXISTS airplane_brand CASCADE;
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

CREATE TYPE aviation_job AS ENUM (
  'Pilot',
  'Copilot',
  'Flight coordinator',
  'Flight attendant',
  'Cabin manager',
  'Aircraft mechanic',
  'Air traffic controller'
);

CREATE TYPE airplane_brand AS ENUM (
  'Airbus',
  'Boeing'
);

CREATE TABLE
  passenger (
    id SERIAL PRIMARY KEY,
    first_name varchar(50) NOT NULL,
    last_name varchar(50) NOT NULL
  );

CREATE TABLE
  customer (
    email VARCHAR(255) PRIMARY KEY,
    password TEXT NOT NULL
  );

CREATE TABLE
  employee (
    id SERIAL PRIMARY KEY,
    first_name varchar(50) NOT NULL,
    last_name varchar(50) NOT NULL,
    job aviation_job NOT NULL,
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
    baggage_weight_kg DOUBLE PRECISION NOT NULL DEFAULT 0,
    baggage_dimensions_cm2 DOUBLE PRECISION NOT NULL DEFAULT 0,
    passenger_id INTEGER REFERENCES passenger (id),
    reservation_number INTEGER REFERENCES reservation (number)
  );

CREATE TABLE
  airport (
    code_iata TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    address TEXT,
    country TEXT NOT NULL,
    city TEXT NOT NULL,
    latitude DOUBLE PRECISION NOT NULL,
    longitude DOUBLE PRECISION NOT NULL,
    price_cents_euro_per_month INTEGER NOT NULL DEFAULT 0
  );

CREATE TABLE
  airplane (
    registration_number TEXT PRIMARY KEY,
    model TEXT NOT NULL,
    fuel_capacity INTEGER NOT NULL DEFAULT 0,
    brand airplane_brand,
    price_cents_euro INTEGER NOT NULL DEFAULT 0,
    baggage_max_weight_kg INTEGER NOT NULL DEFAULT 0,
    baggage_allowed_dimensions_cm2 INTEGER NOT NULL DEFAULT 0
  );

CREATE TABLE
  flight (
    number TEXT PRIMARY KEY,
    departure_date TIMESTAMP NOT NULL,
    arrival_date TIMESTAMP NOT NULL,
    arrival_date_effective TIMESTAMP,
    departure_date_effective TIMESTAMP,
    total_fuel_consumption_liter INTEGER NOT NULL DEFAULT 0,
    arrival_airport TEXT NOT NULL REFERENCES airport (code_iata),
    departure_airport TEXT NOT NULL REFERENCES airport (code_iata),
    airplane_number TEXT NOT NULL REFERENCES airplane (registration_number)
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
    number VARCHAR(5) NOT NULL,
    airplane_registration_number TEXT REFERENCES airplane (registration_number),
    class TEXT,
    PRIMARY KEY (number, airplane_registration_number)
  );

CREATE TABLE
  flight_seat (
    flight_number TEXT NOT NULL REFERENCES flight (number),
    seat_number VARCHAR(5) NOT NULL,
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
    maintenance_date DATE NOT NULL,
    airplane_registration_number TEXT NOT NULL REFERENCES airplane (registration_number),
    result TEXT,
    cost_cents_euro INTEGER NOT NULL,
    PRIMARY KEY (maintenance_date, airplane_registration_number)
  );

CREATE TABLE
  incident (
    number SERIAL PRIMARY KEY,
    description TEXT,
    date DATE NOT NULL,
    flight_number TEXT NOT NULL REFERENCES flight (number)
  );
