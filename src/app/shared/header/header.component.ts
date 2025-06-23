import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  routes: Array<{
    route: string;
    name: string;
    isActive: boolean;
  }> = [
    {
      route: '/cortes',
      name: 'Cortes',
      isActive: false,
    },
    {
      route: '/especies',
      name: 'Espécies',
      isActive: false,
    },
    {
      route: '/lotes',
      name: 'Lotes',
      isActive: false,
    },
    {
      route: '/fornecedores',
      name: 'Fornecedores',
      isActive: false,
    },
    {
      route: '/Clientes',
      name: 'clientes',
      isActive: false,
    },
    {
      route: '/pedidos',
      name: 'Pedidos',
      isActive: false,
    },
  ];

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe((event: any) => {
      this.updateActiveState(event.url);
    });

    this.updateActiveState(this.router.url);
  }

  private updateActiveState(currentUrl: string) {
    this.routes.forEach((item) => (item.isActive = false));

    const activeItem = this.routes.find((item) => currentUrl.startsWith(item.route) || currentUrl === item.route);

    if (activeItem) {
      activeItem.isActive = true;
    }
  }

  navigateTo(route: string) {
    this.router.navigate([route]);
  }

  logout() {
    this.authService.logout();
  }
}
