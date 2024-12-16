import { Component, OnInit } from '@angular/core';
import { PurchaseService } from '../shared/purchase.service';
import { AuthService } from '../shared/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.scss'],
  standalone: true,
  imports: [FormsModule, CommonModule],
})
export class PurchaseComponent implements OnInit {
  reservations: any[] = [];
  selectedReservationId: number | null = null;
  deliveryMethod: string = '';
  successMessage: string = '';
  errorMessage: string = '';
  creditCard: string = ''; 

  constructor(
    private purchaseService: PurchaseService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadUserReservations();
    this.loadCreditCard();
  }

  loadUserReservations(): void {
    const userId = this.authService.getUserId();
    if (!userId) {
      this.errorMessage = 'User not authenticated!';
      return;
    }
  
    this.purchaseService.getUserReservations(userId).subscribe(
      (data) => {
        this.reservations = data.filter((reservation) => reservation.status !== 'purchased');
      },
      (error) => (this.errorMessage = 'Error fetching reservations.')
    );
  }
  

  loadCreditCard(): void {
    const userId = this.authService.getUserId();
    if (!userId) {
      this.errorMessage = 'User not authenticated!';
      return;
    }

    this.authService.getUserDetails(userId).subscribe(
      (userDetails) => {
        if (userDetails && userDetails.credit_card) {
          this.creditCard = userDetails.credit_card;
        } else {
          this.errorMessage = 'No credit card found for this user.';
        }
      },
      (error) => {
        this.errorMessage = 'Error fetching user details.';
      }
    );
  }

  makePurchase(): void {
    if (!this.selectedReservationId || !this.creditCard) {
      this.errorMessage = 'Please select a reservation.';
      return;
    }
  
    const purchaseData = {
      reservation_id: this.selectedReservationId,
      credit_card: this.creditCard,
    };
  
    this.purchaseService.createPurchase(purchaseData).subscribe(
      (response) => {
        this.successMessage = 'Purchase successful! Tickets ready.';
        this.errorMessage = '';
 
        this.reservations = this.reservations.filter(
          (reservation) => reservation.id !== this.selectedReservationId
        );

        this.selectedReservationId = null;
  
        setTimeout(() => this.router.navigate(['/dashboard']), 2000);
      },
      (error) => {
        this.errorMessage = error.error.detail || 'Error creating purchase.';
      }
    );
  }
  
}
