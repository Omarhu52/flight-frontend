import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
})
export class RegisterComponent {
  email: string = '';
  creditCard: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    const user = {
      email: this.email,
      credit_card: this.creditCard,
      password: this.password,
    };

    this.authService.register(user).subscribe(
      (response) => {
        console.log('Registration successful', response);
        this.router.navigate(['/dashboard']); // Redirige al login
      },
      (error) => {
        console.error('Registration failed', error);
        this.errorMessage = error.error?.detail || 'Registration failed';
      }
    );
  }
}
