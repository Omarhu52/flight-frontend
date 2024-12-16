import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
})
export class LoginComponent implements OnInit, OnDestroy {
  email: string = '';
  password: string = '';
  errorMessage: string = '';
  showModal: boolean = true; // Controla la visibilidad del modal

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    // Añadir clase al body cuando el modal esté activo
    if (this.showModal) {
      document.body.classList.add('modal-active');
    }
  }

  ngOnDestroy() {
    // Remover clase del body cuando el componente se destruya
    document.body.classList.remove('modal-active');
  }

  // Navegar a la página de registro
  navigateToRegister() {
    this.router.navigate(['/register']);
    this.closeModal();
  }

  // Cerrar el modal
  closeModal() {
    this.showModal = false;
    document.body.classList.remove('modal-active');
  }

  // Iniciar sesión
  onSubmit() {
    const user = { email: this.email, password: this.password };
    this.authService.login(user.email, user.password).subscribe(
      (response) => {
        console.log('Login successful', response);
        this.router.navigate(['/dashboard']); // Redirige al dashboard
      },
      (error) => {
        console.error('Login failed', error);
        this.errorMessage = 'Invalid email or password';
      }
    );
  }
}
