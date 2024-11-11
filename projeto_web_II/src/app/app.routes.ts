import { Routes } from '@angular/router';
import { LoginComponent } from './modules/login/pages/login/login.component';
import { CadastroComponent } from './modules/cadastro/pages/cadastro/cadastro.component';
import { HomeComponent } from './modules/home/home.component';
import { HomeAdminComponent } from './modules/home-admin/home-admin.component';
import { SolicitarOrcamentoComponent } from './modules/solicitar-orcamento/solicitar-orcamento.component';
import { MostrarOrcamentosComponent } from './modules/mostrar-orcamentos/mostrar-orcamentos.component';
import { OrcamentosSolicitadosComponent } from './modules/orcamentos-solicitados/orcamentos-solicitados.component';
import { CadastrarFuncionarioComponent } from './modules/cadastrar-funcionario/cadastrar-funcionario.component';
import { CadastrarCategoriaComponent } from './modules/cadastrar-categoria/cadastrar-categoria.component';
import { ReceitasComponent } from './modules/receitas/receitas.component';
import { authGuard } from './auth/auth.guard';

export const routes: Routes = [

  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
    },

  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'cadastro',
    component: CadastroComponent,
  },
  // Rota referente a página de usuário
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [authGuard],
    data: { role: 'CLIENTE' }
  },
  {
    path: 'solicitar-orcamento',
    component: SolicitarOrcamentoComponent,
    canActivate: [authGuard],
    data: { role: 'CLIENTE' }
  },
  {
    path: 'mostrar-orcamentos',
    component: MostrarOrcamentosComponent,
    canActivate: [authGuard],
    data: { role: 'CLIENTE' }
  },
  // Rota referente a página de admin
  {
    path: 'admin/home',
    component: HomeAdminComponent,
    canActivate: [authGuard],
    data: { role: 'ADMIN' }
  },
  {
    path: 'admin/orcamentos-solicitados',
    component: OrcamentosSolicitadosComponent,
    canActivate: [authGuard],
    data: { role: 'ADMIN' }
  },
  {
    path: 'admin/orcamentos-solicitados/:id',
    component: OrcamentosSolicitadosComponent,
    canActivate: [authGuard],
    data: { role: 'ADMIN' }
  },
  {
    path: 'admin/cadastrar-funcionario',
    component: CadastrarFuncionarioComponent,
    canActivate: [authGuard],
    data: { role: 'ADMIN' }
  },
  {
    path: 'admin/cadastrar-categoria',
    component: CadastrarCategoriaComponent,
    canActivate: [authGuard],
    data: { role: 'ADMIN' }
  },
  {
    path: 'admin/receitas',
    component: ReceitasComponent,
    canActivate: [authGuard],
    data: { role: 'ADMIN' }
  },
];
