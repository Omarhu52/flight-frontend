import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FlightService {
  private apiUrl = 'http://localhost:8000/flights';

  constructor(private http: HttpClient) {}

  getOriginCities(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/flights/origins`);
  }

  getDestinationCities(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/flights/destinations`);
  }

  getAirlines(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/flights/airlines`);
  }

  getSeatCategories(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/flights/categories`);
  }

  getAvailableDates(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/flights/dates`);
  }


  getFlightsBySchedule(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/flights/schedule`);
  }

  getFlightsByPrice(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/flights/prices`);
  }

  getFilteredFlights(
    flightDate: string,
    origin: string,
    destination: string,
    airline: string,
    seatCategory: string
  ): Observable<any[]> {
    let params = new HttpParams();
  
    if (flightDate) params = params.set('flight_date', flightDate);
    if (origin) params = params.set('origin', origin);
    if (destination) params = params.set('destination', destination);
    if (airline) params = params.set('airline', airline);
    if (seatCategory) params = params.set('seat_category', seatCategory);
  
    return this.http.get<any[]>(`${this.apiUrl}/flights/status`, { params });
  }
  
  
}
