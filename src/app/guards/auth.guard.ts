import { Injectable } from '@angular/core';
import { CanActivate, Router, CanActivateChild } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(
    private router: Router,
    private auth: AuthService
  ) {}

  canActivate(): boolean {
    return this.checkToken();
  }

  canActivateChild(): boolean {
    return this.checkToken();
  }

  checkToken(): boolean {
    if (this.auth.isLoggedIn()) return true;

    this.auth.logout();
    this.router.navigate(['/']);
    return false;
  }
}
