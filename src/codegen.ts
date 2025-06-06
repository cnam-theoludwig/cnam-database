/**
 * This file was generated by kysely-codegen.
 * Please do not edit it manually.
 */

import type { ColumnType } from "kysely"

export type AirplaneBrand = "Airbus" | "Boeing"

export type AviationJob =
  | "Aircraft mechanic"
  | "Cabin crew"
  | "Copilot"
  | "Customer service agent"
  | "Flight operations engineer"
  | "Pilot"

export type Generated<T> =
  T extends ColumnType<infer S, infer I, infer U>
    ? ColumnType<S, I | undefined, U>
    : ColumnType<T, T | undefined, T>

export type Int8 = ColumnType<
  string,
  bigint | number | string,
  bigint | number | string
>

export type Timestamp = ColumnType<Date, Date | string, Date | string>

export interface Airplane {
  baggage_allowed_dimensions_cm2: Generated<number>
  baggage_max_weight_kg: Generated<number>
  brand: AirplaneBrand
  fuel_capacity_liter: Generated<number>
  model: string
  price_cents_euro: Generated<Int8>
  registration_number: string
}

export interface Airport {
  city: string
  code_iata: string
  code_icao: string
  country: string
  latitude: number
  longitude: number
  name: string
}

export interface Customer {
  email: string
  password: string
}

export interface Employee {
  first_name: string
  hire_date: Timestamp
  id: Generated<number>
  job: AviationJob
  last_name: string
  salary_cents_euro_per_month: number
}

export interface Flight {
  airplane_number: string
  arrival_airport: string
  arrival_date: Timestamp
  arrival_date_effective: Timestamp | null
  departure_airport: string
  departure_date: Timestamp
  departure_date_effective: Timestamp | null
  number: string
  total_fuel_consumption_liter: Generated<number>
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
  flight_number: string
  number: Generated<number>
}

export interface MaintenanceHistory {
  airplane_registration_number: string
  cost_cents_euro: number
  maintenance_date: Timestamp
  result: string | null
}

export interface Passenger {
  first_name: string
  id: Generated<number>
  last_name: string
}

export interface Reservation {
  customer_email: string
  date: Timestamp
  number: Generated<number>
}

export interface Seat {
  airplane_registration_number: string
  class: string | null
  number: string
}

export interface Ticket {
  baggage_dimensions_cm2: Generated<number>
  baggage_weight_kg: Generated<number>
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
