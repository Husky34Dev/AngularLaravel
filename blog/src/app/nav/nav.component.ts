import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  userAuthenticated: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    // Verificar si el usuario está autenticado al cargar el componente
    this.authService.isAuthenticated().subscribe(authenticated => {
      this.userAuthenticated = authenticated;
    });
  }

  logout(): void {
    this.authService.logout().subscribe(
      response => {
        localStorage.removeItem('token');
        this.router.navigate(['/login']); // Redirige al componente de inicio de sesión después de cerrar sesión
      },
      error => {
        console.error('Error al cerrar sesión', error);
      }
    );
  }
}
