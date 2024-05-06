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
    // Verificar si las contraseñas coinciden
    console.log('Contraseña:', this.password);
    console.log('Confirmar contraseña:', this.password_confirmation); // Cambiar confirmPassword a password_confirmation
    if (this.password !== this.password_confirmation) {
      console.error('Las contraseñas no coinciden');
      return; // Detener el registro si las contraseñas no coinciden
    }
  
    // Realizar el registro si las contraseñas coinciden
    // Asegúrate de enviar el campo password_confirmation en la solicitud
    this.authService.register({ 
      name: this.name, 
      email: this.email, 
      password: this.password, 
      password_confirmation: this.password_confirmation // Enviar password_confirmation
    }).subscribe(
      response => {
        console.log('Usuario registrado exitosamente', response);
        this.router.navigate(['/dashboard']); // Redirigir a una vista protegida después del registro exitoso
      },
      error => {
        console.error('Error en registro', error);
      }
    );
  }
}
