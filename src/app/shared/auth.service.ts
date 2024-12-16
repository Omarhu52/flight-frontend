import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8000/auth';

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { email, password }).pipe(
      tap((response) => {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userId', response.user_id); 
      })
    );
  }

  getUserId(): number | null {
    const userId = localStorage.getItem('userId');
    return userId ? +userId : null;
  }

  logout(): void {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userId');
  }


  register(user: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user);
  }

  getUserDetails(userId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/users/${userId}`);
  }

  isAuthenticated(): boolean {
    return localStorage.getItem('isLoggedIn') === 'true';
  }
}
