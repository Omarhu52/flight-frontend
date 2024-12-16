import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PurchaseService {
  private apiUrl = 'http://localhost:8000';

  constructor(private http: HttpClient) {}
  
  getUserReservations(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/purchase/user-reservations`, {
      params: { user_id: userId.toString() },
    });
  }

  createPurchase(purchaseData: { reservation_id: number; credit_card: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/purchase/purchase`, purchaseData);
  }
}
