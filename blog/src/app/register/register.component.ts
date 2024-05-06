import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  name: string = '';
  email: string = '';
  password: string = '';
  password_confirmation: string = ''; // Cambiar confirmPassword a password_confirmation

  constructor(private authService: AuthService, private router: Router) {}

  register() {
    if (this.password !== this.password_confirmation) {
      console.error('Las contraseñas no coinciden');
      return;
    }
  
    this.authService.register({ 
      name: this.name, 
      email: this.email, 
      password: this.password, 
      password_confirmation: this.password_confirmation 
    }).subscribe(
      response => {
        console.log('Usuario registrado exitosamente', response);
        this.router.navigate(['/']); // Redirige al componente de posts después de registrarse
      },
      error => {
        console.error('Error en registro', error);
      }
    );
  }
}
