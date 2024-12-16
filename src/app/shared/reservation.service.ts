import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReservationService {
  private apiUrl = 'http://localhost:8000';

  constructor(private http: HttpClient) {}

  getAvailableFlights(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/flights/flights/schedule`);
  }

  createReservation(reservationData: any, userId: number): Observable<any> {
    const params = new HttpParams().set('user_id', userId.toString());
    return this.http.post<any>(`${this.apiUrl}/reservations/`, reservationData, { params });
  }
}
