import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FlightsComponent } from './flights/flights.component';
import { ReservationComponent } from './reservations/reservations.component';
import { PurchaseComponent } from './purchase/purchase.component';
import { AuthGuard } from './shared/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard], 
  },
  {
    path: 'flights',
    component: FlightsComponent,
    canActivate: [AuthGuard], 
  },
  {
    path: 'reservations',
    component: ReservationComponent,
    canActivate: [AuthGuard], 
  },
  {
    path: 'purchase',
    component: PurchaseComponent,
    canActivate: [AuthGuard], 
  },
];
