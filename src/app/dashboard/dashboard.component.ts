import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';

@Component({
  selector:'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls:['./dashboard.component.scss'],
  standalone: true,
})
export class DashboardComponent implements OnInit {
  userEmail:string=''; 

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    this.userEmail =localStorage.getItem('userEmail') || 'User';
  }
  navigateTo(route: string): void {
    this.router.navigate([`/${route}`]);
  }
  logout(): void {
    this.authService.logout();
    localStorage.removeItem('userEmail');
    this.router.navigate(['/login']);
  }
}
