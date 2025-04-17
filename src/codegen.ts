/**
 * This file was generated by kysely-codegen.
 * Please do not edit it manually.
 */

import type { ColumnType } from "kysely"

export type Generated<T> =
  T extends ColumnType<infer S, infer I, infer U>
    ? ColumnType<S, I | undefined, U>
    : ColumnType<T, T | undefined, T>

export type Numeric = ColumnType<string, number | string, number | string>

export type Timestamp = ColumnType<Date, Date | string, Date | string>

export interface Airplane {
  baggage_allowed_dimensions_cm2: number | null
  baggage_max_weight_kg: Numeric | null
  brand: string | null
  fuel_capacity: number | null
  model: string
  price_cents_euro: number | null
  registration_number: string
}

export interface Airport {
  address: string | null
  city: string | null
  code_iata: string
  country: string | null
  latitude: number | null
  longitude: number | null
  name: string
  price_cents_euro_per_month: number | null
}

export interface Customer {
  email: string
  password: string
}

export interface Employee {
  first_name: string
  hire_date: Timestamp
  id: Generated<number>
  job: string
  last_name: string
  salary_cents_euro: number
}

export interface Flight {
  airplane_number: string | null
  arrival_airport: string | null
  arrival_date: Timestamp
  arrival_date_effective: Timestamp | null
  departure_airport: string | null
  departure_date: Timestamp
  departure_date_effective: Timestamp | null
  fuel_consumption: Numeric | null
  number: string
}

export interface FlightEmployee {
  employee_id: number
  flight_number: string
}

export interface FlightSeat {
  airplane_registration_number: string
  flight_number: string
  seat_number: string
}

export interface FlightTicket {
  flight_number: string
  ticket_code: string
}

export interface Incident {
  date: Timestamp
  description: string | null
  flight_number: string | null
  number: Generated<number>
}

export interface MaintenanceHistory {
  airplane_registration_number: string
  cost_cents_euro: number | null
  maintenance_date: Timestamp
  result: string | null
}

export interface Passenger {
  first_name: string
  id: Generated<number>
  last_name: string
}

export interface Reservation {
  customer_email: string | null
  date: Timestamp
  number: Generated<number>
}

export interface Seat {
  airplane_registration_number: string
  class: string | null
  number: string
}

export interface Ticket {
  baggage_dimensions_cm2: number | null
  baggage_weight_kg: Numeric | null
  code: string
  passenger_id: number | null
  price_cents_euro: number
  reservation_number: number | null
}

export interface DB {
  airplane: Airplane
  airport: Airport
  customer: Customer
  employee: Employee
  flight: Flight
  flight_employee: FlightEmployee
  flight_seat: FlightSeat
  flight_ticket: FlightTicket
  incident: Incident
  maintenance_history: MaintenanceHistory
  passenger: Passenger
  reservation: Reservation
  seat: Seat
  ticket: Ticket
}
