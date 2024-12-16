import { Component, OnInit } from '@angular/core';
import { ReservationService } from '../shared/reservation.service';
import { AuthService } from '../shared/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.scss'],
  standalone: true,
  imports: [FormsModule, CommonModule],
})
export class ReservationComponent implements OnInit {
  flights: any[] = [];
  selectedFlightId: number | null = null;
  seatsReserved: number = 1;
  totalPrice: number = 0;
  errorMessage: string = '';
  successMessage: string = '';
  showConfirmation: boolean = false; 
  isFirstReservation: boolean = true; 

  constructor(
    private reservationService: ReservationService,
    private authService: AuthService,
    private router: Router 
  ) {}

  ngOnInit(): void {
    this.loadAvailableFlights();
  }

  loadAvailableFlights(): void {
    this.reservationService.getAvailableFlights().subscribe(
      (data) => (this.flights = data),
      (error) => (this.errorMessage = 'Error fetching flights.')
    );
  }

  calculateTotalPrice(): void {
    const pricePerSeat = this.getSelectedFlightPrice();
    this.totalPrice = pricePerSeat * this.seatsReserved;
  }

  getSelectedFlightPrice(): number {
    const selectedFlight = this.flights.find((flight) => flight.id === this.selectedFlightId);
    return selectedFlight ? selectedFlight.price : 0;
  }

  makeReservation(): void {
    const userId = this.authService.getUserId();
    if (!userId) {
      this.errorMessage = 'User is not authenticated!';
      return;
    }

    const reservationData = {
      flight_id: this.selectedFlightId,
      seats_reserved: this.seatsReserved,
    };

    if (this.isFirstReservation) {
      this.processReservation(reservationData, userId);
      this.isFirstReservation = false; 
    } else {
      this.showConfirmation = true;
    }
  }

  processReservation(reservationData: any, userId: number): void {
    this.reservationService.createReservation(reservationData, userId).subscribe(
      (response) => {
        this.successMessage = 'Reservation successful!';
        this.errorMessage = '';
        this.resetForm();
        setTimeout(() => this.router.navigate(['/dashboard']), 2000);
      },
      (error) => {
        this.errorMessage = error.error.detail || 'Error creating reservation.';
      }
    );
  }

  handleConfirmation(response: boolean): void {
    if (response) {
      const userId = this.authService.getUserId();
      if (userId) {
        const reservationData = {
          flight_id: this.selectedFlightId,
          seats_reserved: this.seatsReserved,
        };
        this.processReservation(reservationData, userId);
      }
    }
    this.showConfirmation = false;
  }

  resetForm(): void {
    this.selectedFlightId = null;
    this.seatsReserved = 1;
    this.totalPrice = 0;
  }
}
