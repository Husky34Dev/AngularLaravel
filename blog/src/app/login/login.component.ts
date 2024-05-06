import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    // Verificar si el usuario ya está autenticado al cargar el componente
    this.authService.isAuthenticated().subscribe(authenticated => {
      if (authenticated) {
        this.router.navigate(['/']); // Redirige al componente de posts si el usuario está autenticado
      }
    });
  }

  login() {
    this.authService.login({ email: this.email, password: this.password }).subscribe(
      response => {
        localStorage.setItem('token', response.token);
        // Forzar la actualización del componente
        this.ngOnInit();  
        // o this.updateAuthenticationStatus();
        this.router.navigate(['/']); // Redirige al componente de posts después de iniciar sesión
      },
      error => {
        console.error('Error en inicio de sesión', error);
      }
    );
  }
  
}
