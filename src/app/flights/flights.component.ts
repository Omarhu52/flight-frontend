import { Component, OnInit } from '@angular/core';
import { FlightService } from '../shared/flight.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-flights',
  templateUrl: './flights.component.html',
  styleUrls: ['./flights.component.scss'],
  standalone: true,
  imports: [FormsModule, CommonModule],
})
export class FlightsComponent implements OnInit {
  originCities: string[] = [];
  destinationCities: string[] = [];
  airlines: string[] = [];
  seatCategories: string[] = [];
  availableDates: string[] = [];

  origin: string = '';
  destination: string = '';
  flightDate: string = '';
  airline: string = '';
  seatCategory: string = '';

  showModal: boolean = false;
  selectedOption: string | null = null;

  flights: any[] = [];
  errorMessage: string = '';

  constructor(private flightService: FlightService) {}

  ngOnInit(): void {
    this.flightService.getOriginCities().subscribe((data) => (this.originCities = data));
    this.flightService.getDestinationCities().subscribe((data) => (this.destinationCities = data));
    this.flightService.getAirlines().subscribe((data) => (this.airlines = data));
    this.flightService.getSeatCategories().subscribe((data) => (this.seatCategories = data));
    this.flightService.getAvailableDates().subscribe((data) => (this.availableDates = data));
  }

  showOptions(): void {
    this.showModal = true;
  }

  selectOption(option: string): void {
    this.selectedOption = option;
    this.showModal = false;

    if (option === 'schedule') {
      this.searchBySchedule();
    }else if (option === 'price') {
      this.searchByPrice();
    }
  }

  closeModal(): void {
    this.showModal = false;
  }

  searchBySchedule(): void {
    this.flightService.getFlightsBySchedule().subscribe(
      (data) => {
        this.flights = data;
        this.errorMessage = '';
      },
      (error) => {
        console.error('Error fetching flight schedules:', error);
        this.errorMessage = 'Error fetching flight schedules.';
      }
    );
  }

  searchByPrice(): void {
    this.flightService.getFlightsByPrice().subscribe(
      (data) => {
        this.flights = data; 
        this.errorMessage = '';
      },
      (error) => {
        console.error('Error fetching flights by price:', error);
        this.errorMessage = 'Error fetching flights by price.';
      }
    );
  }

  searchByStatus(): void {
    this.flightService
      .getFilteredFlights(
        this.flightDate || '', 
        this.origin || '',
        this.destination || '',
        this.airline || '',
        this.seatCategory || ''
      )
      .subscribe(
        (data) => {
          this.flights = data;
          this.errorMessage = '';
        },
        (error) => {
          console.error('Error fetching flight information:', error);
          this.errorMessage = 'Error fetching flight information.';
        }
      );
  }
  
  
}
