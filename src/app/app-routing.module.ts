import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { LayoutComponent } from './shared/layout/layout.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login',
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then((m) => m.LoginModule),
  },
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'dashboard',
        canActivateChild: [AuthGuard],
        loadChildren: () => import('./pages/dashboard/dashboard.module').then((m) => m.DashboardModule),
      },
      {
        path: 'cadastro-corte',
        canActivateChild: [AuthGuard],
        loadChildren: () => import('./pages/cadastro-corte/cadastro-corte.module').then((m) => m.CadastroCorteModule),
      },
      {
        path: 'cadastro-fornecedor',
        canActivateChild: [AuthGuard],
        loadChildren: () =>
          import('./pages/cadastro-fornecedor/cadastro-fornecedor.module').then((m) => m.CadastroFornecedorModule),
      },
      {
        path: 'cadastro-lote',
        canActivateChild: [AuthGuard],
        loadChildren: () => import('./pages/cadastro-lote/cadastro-lote.module').then((m) => m.CadastroLoteModule),
      },
      {
        path: 'cadastro-cliente',
        canActivateChild: [AuthGuard],
        loadChildren: () =>
          import('./pages/cadastro-cliente/cadastro-cliente.module').then((m) => m.CadastroClienteModule),
      },
      {
        path: 'especies',
        canActivateChild: [AuthGuard],
        loadChildren: () => import('./pages/especies/especies.module').then((m) => m.EspeciesModule),
      },
      {
        path: 'cortes',
        canActivateChild: [AuthGuard],
        loadChildren: () => import('./pages/cortes/cortes.module').then((m) => m.CortesModule),
      },
      {
        path: 'lotes',
        canActivateChild: [AuthGuard],
        loadChildren: () => import('./pages/lotes/lotes.module').then((m) => m.LotesModule),
      },
      {
        path: 'fornecedores',
        canActivateChild: [AuthGuard],
        loadChildren: () => import('./pages/fornecedores/fornecedores.module').then((m) => m.FornecedoresModule),
      },
      {
        path: 'clientes',
        canActivateChild: [AuthGuard],
        loadChildren: () => import('./pages/clientes/clientes.module').then((m) => m.ClientesModule),
      },
      {
        path: 'pedidos',
        canActivateChild: [AuthGuard],
        loadChildren: () => import('./pages/pedidos/pedidos.module').then((m) => m.PedidosModule),
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'login',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
