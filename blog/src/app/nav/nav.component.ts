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
    this.updateAuthenticationStatus();
  }

  logout(): void {
    this.authService.logout().subscribe(
      response => {
        localStorage.removeItem('token');
        this.updateAuthenticationStatus();
        this.router.navigate(['/login']);
      },
      error => {
        console.error('Error al cerrar sesión', error);
      }
    );
  }

  private updateAuthenticationStatus(): void {
    this.authService.isAuthenticated().subscribe(authenticated => {
      this.userAuthenticated = authenticated;
    });
  }
}
