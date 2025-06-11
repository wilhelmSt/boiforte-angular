import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(
    private router: Router,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    this.redirectIfLoggedIn();
  }

  onPasswordInput(event: Event) {
    const input = event.target as HTMLInputElement;
    this.password = input.value;
  }

  onUsernameInput(event: Event) {
    const input = event.target as HTMLInputElement;
    this.username = input.value;
  }

  redirectIfLoggedIn(): void {
    if (this.auth.isLoggedIn()) {
      this.router.navigate(['/dashboard']);
    }
  }

  login(): void {
    if (this.username === 'admin' && this.password === 'pass') {
      localStorage.setItem('token', 'fake-token');

      this.router.navigate(['/dashboard']);
    } else {
      alert('Usuário ou senha inválido');
    }
  }
}
