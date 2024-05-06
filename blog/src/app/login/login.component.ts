import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService.login({ email: this.email, password: this.password }).subscribe(
      response => {
        localStorage.setItem('token', response.token); // Guarda el token en localStorage
        console.log('inicio exitoso');
        this.router.navigate(['/dashboard']); // Redirige a una vista protegida

      },
      error => {
        console.error('Error en inicio de sesión', error);
      }
    );
  }
}
